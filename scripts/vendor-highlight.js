'use strict';

/**
 * Re-vendor highlight.js at the pinned version into the highlight fixture's
 * vendor directory. Run via `npm run vendor:highlight`.
 *
 * Build-less posture (AGENTS.md → "No build step for static decks"): this only
 * DOWNLOADS prebuilt files from the official `highlightjs/cdn-release` repo at an
 * exact tag — no transpile, bundle, or minify of anything we ship. The files it
 * writes are committed; this script exists so a future version bump is a single
 * deliberate, reproducible step (bump VERSION, re-run, commit) rather than an
 * ad-hoc curl. It also verifies each download against a pinned sha256, so a
 * silently changed upstream fails loudly instead of slipping in.
 *
 *   npm run vendor:highlight                # download + write + integrity check
 *   npm run vendor:highlight -- --verify    # check the committed files only, no writes
 *
 * Languages: the prebuilt `highlight.js` is the engine + the ~37 "common"
 * languages (non-minified, for readability), which already covers java, bash,
 * yaml, json, xml, kotlin, go, javascript, typescript, sql, plaintext. The four
 * curated extras NOT in the common set — dockerfile, groovy, http, properties —
 * ship upstream only as self-registering prebuilt `.min.js`, so they are
 * vendored in that form (tiny grammar tables, loaded after the engine).
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const crypto = require('node:crypto');

const VERSION = '11.11.1';
const THEME = 'github-dark';
const ROOT = `https://raw.githubusercontent.com/highlightjs/cdn-release/${VERSION}`;
const BASE = `${ROOT}/build`;
const DEST = path.resolve(__dirname, '..', 'static', 'deck-kit', 'vendor', 'highlight');

// Pinned files + their expected sha256. The hashes are recorded on the first
// vendoring run (when `sha256` is empty the check is skipped and the computed
// digest is printed); paste them back here so subsequent runs verify integrity.
const FILES = [
  { url: `${BASE}/highlight.js`, dest: 'highlight.js', sha256: '2d7d6b7330aad8ced0575badbe69f967e8f87d0cab1edba994e9e4669b5b4f42' },
  { url: `${BASE}/languages/dockerfile.min.js`, dest: 'languages/dockerfile.min.js', sha256: '7b11edef6889d2bf9dd30799ce2212bae9b469cbb1793d4d216b65c274c96079' },
  { url: `${BASE}/languages/groovy.min.js`, dest: 'languages/groovy.min.js', sha256: '24b7c19c049d99d2cfbdb62fbf1fb5d000e9fe23792b3d807671381897580ecb' },
  { url: `${BASE}/languages/http.min.js`, dest: 'languages/http.min.js', sha256: '4696d95ea122429bc8021adaa2d81431d1f93e7ec96ef79d76ccc3c9e48739c0' },
  { url: `${BASE}/languages/properties.min.js`, dest: 'languages/properties.min.js', sha256: 'f8cc1a440176673748f145c4346d5e067a2d884fc2e64444229fe8523605507e' },
  { url: `${BASE}/styles/${THEME}.css`, dest: `styles/${THEME}.css`, sha256: '603240e9a7c78cbb006986228155c433b14ac61236805eaa79bfeb96d3c73f75' },
  { url: `${ROOT}/LICENSE`, dest: 'LICENSE', sha256: '5f289f36595e0ef6c53d9f4b4e51d7cc1efc5e2b3ba6130a875d177c54789eaf' },
];

function fetch(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https
      .get(url, (res) => {
        const { statusCode, headers } = res;
        if ([301, 302, 303, 307, 308].includes(statusCode) && headers.location && redirects < 5) {
          res.resume();
          resolve(fetch(new URL(headers.location, url).href, redirects + 1));
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
    // Don't hang forever on a stalled socket — a deliberate version bump should
    // fail fast and loud rather than block. (--verify never reaches here.)
    req.setTimeout(15_000, () => req.destroy(new Error(`timed out after 15s: ${url}`)));
  });
}

(async () => {
  const verifyOnly = process.argv.includes('--verify') || process.argv.includes('--verify-only');
  let failures = 0;

  for (const f of FILES) {
    let buf;
    try {
      buf = verifyOnly ? fs.readFileSync(path.join(DEST, f.dest)) : await fetch(f.url);
    } catch (e) {
      console.error(`✗ ${f.dest}: ${e.message}`);
      failures++;
      continue;
    }
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    if (!f.sha256 && verifyOnly) {
      // An unpinned entry must never pass --verify silently (the CI integrity
      // gate would be vacuous). Only the initial download run may go unpinned.
      console.error(`✗ ${f.dest}: no pinned sha256 — cannot verify (add the hash to FILES)`);
      failures++;
      continue;
    }
    if (f.sha256 && f.sha256 !== hash) {
      console.error(`✗ ${f.dest}: sha256 mismatch\n    expected ${f.sha256}\n    got      ${hash}`);
      failures++;
      continue;
    }
    if (!verifyOnly) {
      const out = path.join(DEST, f.dest);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buf);
    }
    const note = f.sha256 ? '' : '  (no pinned hash — paste this back into FILES)';
    console.log(`${verifyOnly ? 'checked' : 'wrote  '} ${f.dest.padEnd(34)} ${buf.length} bytes  sha256:${hash}${note}`);
  }

  if (failures) {
    console.error(`\n${failures} file(s) failed`);
    process.exit(1);
  }
  console.log(`\nhighlight.js ${VERSION} (theme: ${THEME}) ${verifyOnly ? 'verified in' : 'vendored to'} ${path.relative(process.cwd(), DEST)}`);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
