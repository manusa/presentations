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
    // Dark-blue modules matching the deck's --bg (#0A1554).
    color: { dark: '#0A1554', light: '#FFFFFF' },
  },
  {
    // Valencia JUG 2026 — Thank-you/Q&A slide → companion links page.
    url: 'https://presentations.marcnuri.com/presentations/2026-valenciajug/links/',
    out: 'static/presentations/2026-valenciajug/assets/qr-links.svg',
    // Near-black modules matching the deck's --bg (#0E0D13).
    color: { dark: '#0E0D13', light: '#FFFFFF' },
  },
  {
    // Valencia JUG 2026 — community CTA slide (step 0) → VLCTechHub #valenciajug Slack invite.
    url: 'https://join.slack.com/t/vlctechhub/shared_invite/zt-4172f7kg6-1UGh48d9AGUam69ukd_dvw',
    out: 'static/presentations/2026-valenciajug/assets/qr-slack.svg',
    color: { dark: '#0E0D13', light: '#FFFFFF' },
  },
  {
    // Valencia JUG 2026 — community CTA slide (step 1) → live Kahoot.
    // PLACEHOLDER: points at the kahoot.it join page. Swap `url` for the real
    // game / challenge / self-paced link once the Kahoot is ready, then re-run
    // `npm run gen:qr` to regenerate this asset in place.
    url: 'https://kahoot.it/',
    out: 'static/presentations/2026-valenciajug/assets/qr-kahoot.svg',
    color: { dark: '#0E0D13', light: '#FFFFFF' },
  },
];

// Each target sets its own `color` (the deck's --bg on a white field) so the
// modules sit in-theme; the white field is the QR's quiet zone and keeps the
// high contrast a scanner needs (the slide adds more padding on top).
const OPTS = {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 2,
};

(async () => {
  for (const { url, out, color } of TARGETS) {
    const svg = await QRCode.toString(url, { ...OPTS, color });
    const outPath = path.join(REPO_ROOT, out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, svg);
    console.log(`✓ ${out}\n    ${url}`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
