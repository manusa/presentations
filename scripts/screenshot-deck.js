#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {gotoDeck, walkDeck, slideFilename} = require('./lib/deck');

const USAGE = `Usage: npm run screenshot:deck -- <deck-url> <name>

  <deck-url>  URL of a deck (single page containing <deck-stage> with <section> children)
  <name>      Output subdirectory name under screenshots/

Captures one PNG per (section, step) at 1920x1080:
  ./screenshots/<name>/slide-NN.png            for non-stepped sections
  ./screenshots/<name>/slide-NN-step-K.png     for sections with data-step-max="N" (one PNG per step state)

How it works:
  - Loads the deck, discovers (section, step) pairs from <deck-stage> > <section>[data-step-max]
  - Navigates via ArrowRight keypress (agnostic of any deck-stage internals)
  - Waits for non-looping CSS animations to finish before each capture

Example:
  npm run screenshot:deck -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ devtalks-current
`;

const args = process.argv.slice(2);
if (args.length < 1 || args[0] === '-h' || args[0] === '--help') {
  console.log(USAGE);
  process.exit(args.length === 0 ? 1 : 0);
}
if (args.length !== 2) {
  console.error('Expected exactly two arguments: <deck-url> <name>');
  process.exit(1);
}

const [url, name] = args;
const outDir = path.resolve(__dirname, '..', 'screenshots', name);
fs.mkdirSync(outDir, {recursive: true});

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
    await gotoDeck(page, url);

    console.log(`Capturing from ${url}`);
    const total = await walkDeck(page, async (slide, totalPairs, captureIndex) => {
      const outPath = path.join(outDir, slideFilename(slide));
      await page.screenshot({path: outPath, fullPage: false});
      console.log(`  [${captureIndex}/${totalPairs}] ${outPath}`);
    });

    console.log(`✓ ${total} captures → ${outDir}`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
