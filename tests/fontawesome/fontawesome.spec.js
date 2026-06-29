'use strict';

// Vendored Font Awesome Free (deck-kit shared infra) — committed static CSS +
// webfonts, NOT part of the frozen deck-kit JS contract, so this lives under
// tests/fontawesome/ rather than tests/deck-kit/. FA is purely declarative
// (CSS @font-face + woff2/ttf), so unlike the highlight suite this needs no
// browser: it guards the vendored artifact's integrity and self-consistency.
//
// What it proves:
//  1. Every pinned file is present and matches its sha256 (delegates to the
//     vendor script's own `--verify`, the single source of truth).
//  2. all.min.css references no absolute http(s) URL — nothing leaks back to a
//     CDN at runtime.
//  3. Every `url(../webfonts/X)` the CSS points at exists on disk — the
//     guarantee behind the "vendor exactly what the CSS references" decision,
//     so no glyph 404s.
//  4. No static deck re-introduces the jsDelivr FA CDN <link> — the three
//     migrated decks (and any future deck) load the vendored copy.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const REPO = path.resolve(__dirname, '..', '..');
const FA = path.join(REPO, 'static', 'deck-kit', 'vendor', 'fontawesome');
const CSS = path.join(FA, 'css', 'all.min.css');

// Every .css file under a deck directory (recursive), so the CDN scan covers
// deck stylesheets, not just index.html.
function cssFilesUnder(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...cssFilesUnder(p));
    else if (e.name.endsWith('.css')) out.push(p);
  }
  return out;
}

describe('vendored Font Awesome Free', () => {
  test('all pinned files match their sha256 (vendor script --verify)', () => {
    // Reuse the vendor script's integrity check rather than duplicating the
    // file list + hashes here. --verify reads committed files only (no network).
    try {
      execFileSync('node', ['scripts/vendor-fontawesome.js', '--verify'], {
        cwd: REPO,
        stdio: 'pipe',
      });
    } catch (e) {
      // Surface the script's own "expected X got Y" lines instead of an opaque
      // "Command failed" so a corrupted/unpinned file is diagnosable.
      assert.fail(`vendor-fontawesome.js --verify failed:\n${e.stdout || ''}${e.stderr || ''}`);
    }
  });

  test('all.min.css references no absolute http(s) URL (no CDN leak)', () => {
    const css = fs.readFileSync(CSS, 'utf8');
    const absolute = css.match(/url\(\s*['"]?https?:\/\/[^)]+\)/gi) || [];
    assert.deepEqual(absolute, [], `unexpected absolute url() in vendored CSS: ${absolute.join(', ')}`);
  });

  test('every webfont the CSS references exists on disk (no glyph 404)', () => {
    const css = fs.readFileSync(CSS, 'utf8');
    const refs = [...css.matchAll(/url\(\s*['"]?\.\.\/webfonts\/([^)'"?#]+)/gi)].map((m) => m[1]);
    assert.ok(refs.length > 0, 'CSS references at least one ../webfonts/ file');
    const missing = [...new Set(refs)].filter((f) => !fs.existsSync(path.join(FA, 'webfonts', f)));
    assert.deepEqual(missing, [], `CSS references webfonts absent from the vendored set: ${missing.join(', ')}`);
  });

  test('LICENSE travels with the vendored copy', () => {
    assert.ok(fs.existsSync(path.join(FA, 'LICENSE.txt')), 'vendored fontawesome carries LICENSE.txt');
  });

  test('no static deck loads Font Awesome from a CDN', () => {
    // The three migrated decks (and any future deck) must load the vendored
    // copy; a re-introduced FA reference over a remote URL would silently re-add
    // a runtime CDN dependency. Match any http(s) URL whose path mentions Font
    // Awesome under either spelling — `fontawesome` (jsDelivr's
    // @fortawesome/fontawesome-free) OR `font-awesome` (cdnjs's
    // .../libs/font-awesome/...) — so the guard is host-agnostic, not a
    // blocklist of specific CDNs. Scan each deck's index.html AND any CSS it
    // ships (an `@import url(https://…)` in a deck stylesheet would otherwise
    // evade an index.html-only scan).
    const FA_REMOTE = /https?:\/\/[^"'()\s]*font-?awesome/i;
    const decksDir = path.join(REPO, 'static', 'presentations');
    const offenders = [];
    for (const slug of fs.readdirSync(decksDir)) {
      const deckDir = path.join(decksDir, slug);
      if (!fs.statSync(deckDir).isDirectory()) continue;
      const files = [path.join(deckDir, 'index.html'), ...cssFilesUnder(deckDir)];
      for (const f of files) {
        if (fs.existsSync(f) && FA_REMOTE.test(fs.readFileSync(f, 'utf8'))) {
          offenders.push(path.relative(decksDir, f));
        }
      }
    }
    assert.deepEqual(offenders, [], `decks loading FA from a CDN: ${offenders.join(', ')}`);
  });
});
