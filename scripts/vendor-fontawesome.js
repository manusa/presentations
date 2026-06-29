'use strict';

/**
 * Re-vendor Font Awesome Free at the pinned version into the deck-kit vendor
 * directory. Run via `npm run vendor:fontawesome`.
 *
 * Build-less posture (AGENTS.md → "No build step for static decks"): this only
 * DOWNLOADS prebuilt files from the official `FortAwesome/Font-Awesome` repo at
 * an exact tag — no transpile, bundle, or minify of anything we ship. The files
 * it writes are committed; this script exists so a future version bump is a
 * single deliberate, reproducible step (bump VERSION, re-run, commit) rather
 * than an ad-hoc curl. It verifies each download against a pinned sha256, so a
 * silently changed upstream fails loudly instead of slipping in.
 *
 *   npm run vendor:fontawesome                # download + write + integrity check
 *   npm run vendor:fontawesome -- --verify    # check the committed files only, no writes
 *
 * Scope: the unedited `css/all.min.css` plus every webfont its @font-face rules
 * reference (brands / solid / regular / v4compat, woff2 + ttf). Keeping the CSS
 * byte-identical to upstream means zero dead/404 references and any deck can use
 * any FA6-free glyph without re-vendoring. Static decks load it with
 *   <link rel="stylesheet" href="../../deck-kit/vendor/fontawesome/css/all.min.css">
 * the relative `url(../webfonts/…)` in the CSS resolves against that path.
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const crypto = require('node:crypto');

const VERSION = '6.5.2';
const ROOT = `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/${VERSION}`;
const DEST = path.resolve(__dirname, '..', 'static', 'deck-kit', 'vendor', 'fontawesome');

// Pinned files + their expected sha256. The hashes are recorded on the first
// vendoring run (when `sha256` is empty the check is skipped and the computed
// digest is printed); paste them back here so subsequent runs verify integrity.
const FILES = [
  { url: `${ROOT}/css/all.min.css`, dest: 'css/all.min.css', sha256: '5ceaaba22d75b58e04150311f596306562a3e595e27ed4b1dfa451b82dda9e50' },
  { url: `${ROOT}/webfonts/fa-brands-400.woff2`, dest: 'webfonts/fa-brands-400.woff2', sha256: '255ce3bdbe420b5f6dbaae6649d7d2480dcd8604f64c1d9e33c5d57db0d9edd1' },
  { url: `${ROOT}/webfonts/fa-brands-400.ttf`, dest: 'webfonts/fa-brands-400.ttf', sha256: 'c4c68e0616fd5eb4369df492af0c55ace43a728744e0e9aa1e50c835dc1ca2d2' },
  { url: `${ROOT}/webfonts/fa-regular-400.woff2`, dest: 'webfonts/fa-regular-400.woff2', sha256: 'a766b0ec6782888c8a7c3927b9cf25e472953f09dd839bb820354b1591f5c88b' },
  { url: `${ROOT}/webfonts/fa-regular-400.ttf`, dest: 'webfonts/fa-regular-400.ttf', sha256: 'c7908ae0c2dc972a2cc0f9404ae4b5fd1dc310d4dc2db6bfc9c5fd5faa8819c6' },
  { url: `${ROOT}/webfonts/fa-solid-900.woff2`, dest: 'webfonts/fa-solid-900.woff2', sha256: '599b18f9b0aa0bd7a76b01e724a7a189422fb20fb233a4586d420c777d3c2c23' },
  { url: `${ROOT}/webfonts/fa-solid-900.ttf`, dest: 'webfonts/fa-solid-900.ttf', sha256: '4312f534f4fc39b771774db6a5a00e22992437d8707a02ce163b4e47e432e65c' },
  { url: `${ROOT}/webfonts/fa-v4compatibility.woff2`, dest: 'webfonts/fa-v4compatibility.woff2', sha256: '0bdc986fd216d3f6b7d7e238bb243edf37631f65cef3fc76a226c15eb4910e71' },
  { url: `${ROOT}/webfonts/fa-v4compatibility.ttf`, dest: 'webfonts/fa-v4compatibility.ttf', sha256: 'a519731d4d33c7fdc6a851453545d5038235d0b1b5848f9e1fd95a9ad5ca7275' },
  { url: `${ROOT}/LICENSE.txt`, dest: 'LICENSE.txt', sha256: '9b914eae88817d63b576eab5aafde7068c7a1abae125d7cdfb034f1da43a9afc' },
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
  console.log(`\nFont Awesome Free ${VERSION} ${verifyOnly ? 'verified in' : 'vendored to'} ${path.relative(process.cwd(), DEST)}`);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
