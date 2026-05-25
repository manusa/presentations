#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {settleAnimations, applyExportHidden, expandStepClones} = require('./lib/deck');

const USAGE = `Usage: npm run export:pdf -- <deck-url> <output.pdf>

  <deck-url>     URL of a deck (single page containing <deck-stage> with <section> children)
  <output.pdf>   Destination PDF path

Renders one PDF page per slide state at 1920x1080 (16:9, matches the deck — no letterboxing).
Vector output: text remains selectable, no rasterised slides, dramatically smaller files.

State model:
  - Each <section> defaults to a single page (its initial render).
  - A section with attribute data-step-max="N" produces N+1 pages, captured at
    data-step="0", data-step="1", … data-step="N". This is the contract used by
    the .s-amplifier slides; any future stepping slide should follow it.

How it works:
  - Loads the deck once at 1920x1080
  - Injects a hide rule into deck-stage.shadowRoot for .export-hidden chrome
  - Clones each stepped section into one copy per step state, in-place
  - Switches to print media — the deck's @media print rule paginates every
    slotted section as its own PDF page at the design dimensions
  - Calls page.pdf() once; Chromium natively de-duplicates fonts and images
    across pages, producing a far smaller file than per-state pdf() + merge

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

  try {
    const context = await browser.newContext({viewport: {width: 1920, height: 1080}});
    const page = await context.newPage();
    await page.goto(url, {waitUntil: 'networkidle', timeout: 30_000});

    const originalCount = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      return stage ? stage.querySelectorAll(':scope > section').length : 0;
    });
    if (originalCount === 0) {
      console.error('No <deck-stage> > <section> elements found at this URL.');
      process.exit(1);
    }

    await applyExportHidden(page);
    const totalAfterExpand = await expandStepClones(page);
    const extraStates = totalAfterExpand - originalCount;
    console.log(
      `Capturing ${totalAfterExpand} pages from ${url} (${originalCount} slides${
        extraStates ? `, +${extraStates} extra step state${extraStates === 1 ? '' : 's'}` : ''
      })`
    );

    await settleAnimations(page, {timeout: 8000, extraDelayMs: 250});
    await page.emulateMedia({media: 'print'});

    const absOut = path.resolve(outputPath);
    fs.mkdirSync(path.dirname(absOut), {recursive: true});
    await page.pdf({
      path: absOut,
      width: '1920px',
      height: '1080px',
      printBackground: true,
      margin: {top: 0, right: 0, bottom: 0, left: 0},
    });

    const stat = fs.statSync(absOut);
    console.log(`✓ ${absOut} — ${totalAfterExpand} pages, ${(stat.size / 1024).toFixed(1)}KB`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
