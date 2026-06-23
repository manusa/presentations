#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {pageContentScales, findFramedPages, PX_TO_PT} = require('./lib/pdf-frame');

const USAGE = `Usage: npm run test:pdf-frame -- <pdf>

  <pdf>   Path to an exported PDF (produced by \`npm run export:pdf\`).

Asserts every page is full-bleed, i.e. page.pdf() did NOT shrink-to-fit the
deck into a white right/bottom frame (issue #1908). A full-bleed page maps CSS
px → PDF points at exactly ${PX_TO_PT} (= 72/96 dpi); a framed page carries an
extra ~0.943 factor. Detection is structural (no rasteriser).

Exit 0 if all pages full-bleed; exit 1 (with the offending pages) otherwise.

Example:
  npm run export:pdf -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ /tmp/deck.pdf
  npm run test:pdf-frame -- /tmp/deck.pdf
`;

const args = process.argv.slice(2);
if (args.length !== 1 || args[0] === '-h' || args[0] === '--help') {
  console.log(USAGE);
  process.exit(args.length === 0 ? 1 : 0);
}

const pdfPath = path.resolve(args[0]);
if (!fs.existsSync(pdfPath)) {
  console.error(`No such file: ${pdfPath}`);
  process.exit(1);
}

(async () => {
  const bytes = fs.readFileSync(pdfPath);
  const scales = await pageContentScales(bytes);
  const framed = await findFramedPages(bytes);
  if (framed.length === 0) {
    console.log(`✓ All ${scales.length} pages full-bleed (content scale ${PX_TO_PT}). No frame.`);
    return;
  }
  console.error(
    `✗ ${framed.length}/${scales.length} page${framed.length === 1 ? '' : 's'} shrink-to-fit scaled (white right/bottom frame):`
  );
  for (const f of framed) {
    console.error(
      `    page ${f.page}: content scale ${f.scaleX.toFixed(4)} ` +
        `(${((f.scaleX / PX_TO_PT) * 100).toFixed(1)}% of full-bleed)`
    );
  }
  process.exitCode = 1;
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
