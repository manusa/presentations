#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const os = require('os');
const {walkDeck} = require('./lib/deck');

const USAGE = `Usage: npm run export:pdf -- <deck-url> <output.pdf>

  <deck-url>     URL of a deck (single page containing <deck-stage> with <section> children)
  <output.pdf>   Destination PDF path

Renders one PDF page per slide at 1920x1080 (16:9, matches the deck — no letterboxing).

How it works:
  - Captures each slide individually as PNG (so per-slide animations settle properly)
  - Writes intermediate PNGs to a temp directory
  - Assembles them into a multi-page PDF via Playwright's page.pdf()
  - Cleans up the temp directory on exit

Example:
  npm run export:pdf -- http://localhost:8080/presentations/2026-devtalks-romania/ /tmp/devtalks-2026.pdf
`;

const args = process.argv.slice(2);
if (args.length < 1 || args[0] === '-h' || args[0] === '--help') {
  console.log(USAGE);
  process.exit(args.length === 0 ? 1 : 0);
}
if (args.length !== 2) {
  console.error('Expected exactly two arguments: <deck-url> <output.pdf>');
  process.exit(1);
}

const [url, outputPath] = args;
if (!outputPath.toLowerCase().endsWith('.pdf')) {
  console.error('Output path must end in .pdf');
  process.exit(1);
}

let chromium;
try {
  ({chromium} = require('playwright'));
} catch (err) {
  console.error('playwright is not installed. Run: npm install');
  process.exit(1);
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch({headless: true});
  } catch (err) {
    if (/Executable doesn't exist|browserType\.launch/.test(String(err))) {
      console.error('Chromium binary is missing. Run: npm run screenshot:setup');
      process.exit(1);
    }
    throw err;
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-pdf-'));

  try {
    // Step 1: capture every slide as PNG into the temp dir.
    const deckContext = await browser.newContext({viewport: {width: 1920, height: 1080}});
    const deckPage = await deckContext.newPage();
    await deckPage.goto(url, {waitUntil: 'networkidle', timeout: 30_000});

    const total = await deckPage.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      return stage ? stage.querySelectorAll(':scope > section').length : 0;
    });
    if (total === 0) {
      console.error('No <deck-stage> > <section> elements found at this URL.');
      process.exit(1);
    }
    const padLen = Math.max(2, String(total).length);

    console.log(`Capturing ${total} slides from ${url}`);
    const slidePaths = [];
    await walkDeck(deckPage, async (i, n) => {
      const p = path.join(tmpDir, `slide-${String(i).padStart(padLen, '0')}.png`);
      await deckPage.screenshot({path: p, fullPage: false});
      slidePaths.push(p);
      console.log(`  [${i}/${n}] captured`);
    });
    await deckPage.close();
    await deckContext.close();

    // Step 2: assemble PNGs into a single multi-page PDF.
    console.log('Assembling PDF…');
    const wrapperHtml = `<!doctype html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#000}
img{display:block;width:1920px;height:1080px;page-break-after:always}
img:last-child{page-break-after:auto}
</style></head><body>${slidePaths.map((p) => `<img src="file://${p}">`).join('\n')}</body></html>`;
    const wrapperPath = path.join(tmpDir, '_wrapper.html');
    fs.writeFileSync(wrapperPath, wrapperHtml);

    const pdfContext = await browser.newContext();
    const pdfPage = await pdfContext.newPage();
    await pdfPage.goto(`file://${wrapperPath}`, {waitUntil: 'networkidle'});

    const absOut = path.resolve(outputPath);
    fs.mkdirSync(path.dirname(absOut), {recursive: true});
    await pdfPage.pdf({
      path: absOut,
      width: '1920px',
      height: '1080px',
      printBackground: true,
      margin: {top: 0, right: 0, bottom: 0, left: 0},
    });
    await pdfPage.close();
    await pdfContext.close();

    const stat = fs.statSync(absOut);
    console.log(`✓ ${absOut} — ${total} pages, ${(stat.size / 1024).toFixed(1)}KB`);
  } finally {
    await browser.close();
    fs.rmSync(tmpDir, {recursive: true, force: true});
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
