#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * gen-qr.js — render the QR code(s) embedded in static decks as SVG assets.
 *
 * Why this exists:
 *   Static decks ship plain HTML/CSS/JS with no build step, so a QR has to
 *   be a committed static asset rather than something generated in the
 *   browser at runtime. A pre-rendered SVG is crisp at any projection size,
 *   prints correctly through `export:pdf`, and needs no network or JS at the
 *   venue. The `qrcode` package is a devDependency only — like `sharp`
 *   behind `optimize:images` — so it never ships in the published package.
 *
 * Usage:
 *   npm run gen:qr            # regenerate every target below
 *
 * To change what a QR points at, edit the matching TARGETS entry and re-run.
 * The output SVG is committed; regeneration is only needed when the URL
 * changes (for example, if a short vanity URL is introduced later).
 */
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

const REPO_ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    // DevTalks Romania 2026 — Thank-you/Q&A slide → companion links page.
    url: 'https://presentations.marcnuri.com/presentations/2026-devtalks-romania/links/',
    out: 'static/presentations/2026-devtalks-romania/assets/qr-links.svg',
  },
];

// Dark-blue modules on a white field: matches the deck's --bg (#0A1554)
// while keeping the high contrast a scanner needs. The white field is the
// QR's quiet zone; the slide adds more padding around it on top of this.
const OPTS = {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 2,
  color: { dark: '#0A1554', light: '#FFFFFF' },
};

(async () => {
  for (const { url, out } of TARGETS) {
    const svg = await QRCode.toString(url, OPTS);
    const outPath = path.join(REPO_ROOT, out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, svg);
    console.log(`✓ ${out}\n    ${url}`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
