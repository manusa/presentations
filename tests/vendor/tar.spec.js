'use strict';

// Unit test for the hand-rolled ustar reader in scripts/lib/vendor.js. The
// npm-tarball source downloads a .tgz, gunzips it, and serves members out of
// it (issue #68) — rather than add a `tar` dependency we parse the trivial
// 512-byte-header format ourselves, so it gets its own deterministic test with
// a synthesized archive (no network, no fixture file).

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const zlib = require('node:zlib');
const { extractTarballMembers } = require('../../scripts/lib/vendor');

// Build a single 512-byte ustar header with a valid checksum (our reader
// ignores the checksum, but a real tar carries one, so the fixture stays
// faithful to what npm actually ships).
function tarHeader(name, size, typeflag = '0') {
  const h = Buffer.alloc(512);
  h.write(name, 0, 'utf8'); // name (0..99)
  h.write('0000644\0', 100); // mode
  h.write('0000000\0', 108); // uid
  h.write('0000000\0', 116); // gid
  h.write(size.toString(8).padStart(11, '0') + '\0', 124); // size (octal)
  h.write('00000000000\0', 136); // mtime
  h.write(typeflag, 156); // typeflag
  h.write('ustar\0', 257); // magic
  h.write('00', 263); // version
  // checksum: sum of all bytes with the checksum field taken as 8 spaces
  h.write('        ', 148);
  let sum = 0;
  for (const b of h) sum += b;
  h.write(sum.toString(8).padStart(6, '0') + '\0 ', 148);
  return h;
}

// Assemble a tar from [{ name, data?, typeflag }] entries + the two trailing
// zero blocks that mark end-of-archive.
function makeTar(entries) {
  const parts = [];
  for (const e of entries) {
    const data = e.data ?? Buffer.alloc(0);
    parts.push(tarHeader(e.name, data.length, e.typeflag));
    if (data.length) {
      const padded = Buffer.alloc(Math.ceil(data.length / 512) * 512);
      data.copy(padded);
      parts.push(padded);
    }
  }
  parts.push(Buffer.alloc(1024)); // end-of-archive
  return Buffer.concat(parts);
}

describe('extractTarballMembers (hand-rolled ustar reader)', () => {
  const textData = Buffer.from('hello\n', 'utf8');
  const binData = Buffer.from(Array.from({ length: 256 }, (_, i) => i)); // 0x00..0xFF

  const tgz = zlib.gzipSync(
    makeTar([
      { name: 'package/', typeflag: '5' }, // directory entry — must be skipped
      { name: 'package/a.txt', data: textData, typeflag: '0' },
      { name: 'package/files/b.bin', data: binData, typeflag: '0' },
    ])
  );

  test('gunzips and indexes regular-file members by full path', () => {
    const members = extractTarballMembers(tgz);
    assert.ok(members.has('package/a.txt'), 'top-level file present');
    assert.ok(members.has('package/files/b.bin'), 'nested file present');
  });

  test('member bytes round-trip exactly (text and binary)', () => {
    const members = extractTarballMembers(tgz);
    assert.deepEqual(members.get('package/a.txt'), textData);
    assert.deepEqual(members.get('package/files/b.bin'), binData);
    assert.equal(members.get('package/files/b.bin').length, 256, 'no padding bleeds into member bytes');
  });

  test('directory entries are not indexed as members', () => {
    const members = extractTarballMembers(tgz);
    assert.ok(!members.has('package/'), 'directory entry excluded');
    assert.equal(members.size, 2, 'exactly the two regular files');
  });

  test('a NUL-typeflag (legacy regular file) is treated as a regular file', () => {
    // GNU tar writes '\0' rather than '0' for regular files; both must index.
    const tar = zlib.gzipSync(makeTar([{ name: 'package/c.txt', data: textData, typeflag: '\0' }]));
    const members = extractTarballMembers(tar);
    assert.deepEqual(members.get('package/c.txt'), textData);
  });
});
