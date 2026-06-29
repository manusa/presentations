'use strict';

/**
 * Source-agnostic vendoring engine (issue #68).
 *
 * Both the Font Awesome and highlight.js vendoring scripts shared one loop:
 * for each pinned file, fetch-or-read the bytes, verify a sha256, and write it
 * (or in --verify mode read the committed file and check only, no network).
 * This module lifts that loop out once and makes the *acquisition mode*
 * pluggable, so a new vendored library is a manifest entry rather than a new
 * script:
 *
 *   - `github-raw(repo, tag)` — GET raw.githubusercontent.com/<repo>/<tag>/<path>
 *     (what FA + highlight use).
 *   - `npm-tarball(pkg, version)` — download the package .tgz once from
 *     registry.npmjs.org, gunzip it, and serve members out of it (how the
 *     @fontsource prebuilt woff2 are acquired — they ship only inside the npm
 *     tarball, and fonts.gstatic.com is not allow-listed).
 *
 * Integrity is unchanged from the per-file scripts: a pinned sha256 is the
 * anchor regardless of source, an unpinned entry prints its computed hash on
 * the first run and FAILS --verify (so the gate can't be vacuous), the socket
 * times out after 15s, and redirects are followed.
 *
 * Build-less posture (AGENTS.md → "No build step for static decks"): this only
 * downloads + verifies prebuilt files that are then committed. Nothing here is
 * transpiled, bundled, or minified at deploy time.
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const crypto = require('node:crypto');
const zlib = require('node:zlib');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

// Shared HTTPS GET → Buffer, with redirect following and a 15s socket timeout.
// A deliberate version bump should fail fast and loud rather than hang on a
// stalled socket. (--verify never reaches the network.)
function httpGet(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https
      .get(url, (res) => {
        const { statusCode, headers } = res;
        if ([301, 302, 303, 307, 308].includes(statusCode) && headers.location && redirects < 5) {
          res.resume();
          resolve(httpGet(new URL(headers.location, url).href, redirects + 1));
          return;
        }
        if (statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
    req.setTimeout(15_000, () => req.destroy(new Error(`timed out after 15s: ${url}`)));
  });
}

// Read a NUL-terminated (or field-length-bounded) string out of a tar header.
function tarField(header, start, len) {
  const slice = header.subarray(start, start + len);
  const nul = slice.indexOf(0);
  return slice.toString('utf8', 0, nul === -1 ? len : nul);
}

/**
 * Gunzip a .tgz and index its regular-file members by full path → Buffer.
 *
 * tar is a flat sequence of 512-byte headers, each followed by the member's
 * bytes padded up to the next 512-byte boundary. We only need regular files
 * (typeflag '0' or, for legacy GNU writers, '\0'); directories, symlinks, and
 * PAX/GNU extension records are skipped by advancing past their data. npm
 * tarball member names (`package/files/<font>.woff2`) are short, so the plain
 * ustar `name` field (+ optional `prefix`) is sufficient — no long-name
 * handling is required.
 */
function extractTarballMembers(tgz) {
  const buf = zlib.gunzipSync(tgz);
  const members = new Map();
  let off = 0;
  while (off + 512 <= buf.length) {
    const header = buf.subarray(off, off + 512);
    // End-of-archive is two all-zero blocks. A real member always has a
    // non-empty name, so a zero first byte already implies the terminator;
    // confirm the whole block is zero to be spec-exact (and reject a freak
    // NUL-leading name rather than truncate the archive).
    if (header[0] === 0 && header.every((b) => b === 0)) break;
    const name = tarField(header, 0, 100);
    const prefix = tarField(header, 345, 155);
    const size = parseInt(tarField(header, 124, 12).trim() || '0', 8);
    const typeflag = String.fromCharCode(header[156]);
    const full = prefix ? `${prefix}/${name}` : name;
    const dataStart = off + 512;
    if (typeflag === '0' || typeflag === '\0') {
      members.set(full, Buffer.from(buf.subarray(dataStart, dataStart + size)));
    }
    off = dataStart + Math.ceil(size / 512) * 512;
  }
  return members;
}

// A source exposes `bytes(logicalPath) -> Promise<Buffer>`. The npm-tarball
// source downloads + indexes the archive lazily on first use and memoizes it,
// so --verify (which never calls bytes) does no network at all.
function makeSource(spec) {
  if (spec.type === 'github-raw') {
    const root = `https://raw.githubusercontent.com/${spec.repo}/${spec.tag}`;
    return { bytes: (p) => httpGet(`${root}/${p}`) };
  }
  if (spec.type === 'npm-tarball') {
    const unscoped = spec.pkg.replace(/^@[^/]+\//, '');
    const url = `https://registry.npmjs.org/${spec.pkg}/-/${unscoped}-${spec.version}.tgz`;
    let membersPromise = null;
    const load = () => (membersPromise ||= httpGet(url).then(extractTarballMembers));
    return {
      async bytes(p) {
        const members = await load();
        const key = `package/${p}`;
        const m = members.get(key);
        if (!m) throw new Error(`member not found in ${spec.pkg}@${spec.version}: ${key}`);
        return m;
      },
    };
  }
  throw new Error(`unknown source type: ${spec.type}`);
}

/**
 * Vendor (or verify) one manifest entry. Returns a per-file result list
 * (`{ rel, bytes, hash, pinned }` on success, `{ rel, error }` on failure) so
 * the CLI owns all console formatting and exit codes.
 *
 * Each file's bytes come from either its own `bytes(source)` generator (used by
 * the emitted/normalized font CSS, which is assembled from other tarball
 * members rather than downloaded verbatim) or, by default, `source.bytes(path)`.
 * A generated file is verified and written exactly like a downloaded one — its
 * committed bytes are sha256-pinned all the same.
 */
async function vendorEntry(entry, { verifyOnly }) {
  const dest = path.resolve(REPO_ROOT, entry.dest);
  const source = verifyOnly ? null : makeSource(entry.source);
  const results = [];
  for (const f of entry.files) {
    const rel = f.dest || f.path;
    const out = path.join(dest, rel);
    let buf;
    try {
      if (verifyOnly) {
        buf = fs.readFileSync(out);
      } else {
        const raw = f.bytes ? await f.bytes(source) : await source.bytes(f.path);
        buf = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
      }
    } catch (e) {
      results.push({ rel, error: e.message });
      continue;
    }
    const hash = sha256(buf);
    if (!f.sha256 && verifyOnly) {
      // An unpinned entry must never pass --verify silently (the CI integrity
      // gate would be vacuous). Only the initial download run may go unpinned.
      results.push({ rel, error: 'no pinned sha256 — cannot verify (add the hash to the manifest)' });
      continue;
    }
    if (f.sha256 && f.sha256 !== hash) {
      results.push({ rel, error: `sha256 mismatch\n    expected ${f.sha256}\n    got      ${hash}` });
      continue;
    }
    if (!verifyOnly) {
      try {
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, buf);
      } catch (e) {
        // Report a write failure (disk full, permissions) per-file, the same
        // way an acquisition failure is reported, rather than aborting the run.
        results.push({ rel, error: `write failed: ${e.message}` });
        continue;
      }
    }
    results.push({ rel, bytes: buf.length, hash, pinned: !!f.sha256 });
  }
  return results;
}

module.exports = {
  REPO_ROOT,
  sha256,
  httpGet,
  extractTarballMembers,
  makeSource,
  vendorEntry,
};
