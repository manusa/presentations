#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {walkDeck} = require('./lib/deck');

const USAGE = `Usage: npm run screenshot:deck -- <deck-url> <name>

  <deck-url>  URL of a deck (single page containing <deck-stage> with <section> children)
  <name>      Output subdirectory name under screenshots/

Captures one PNG per slide at 1920x1080:
  ./screenshots/<name>/slide-01.png, slide-02.png, ...

How it works:
  - Loads the deck, counts <deck-stage> > <section> children
  - Navigates via ArrowRight keypress (agnostic of any deck-stage internals)
  - Waits for non-looping CSS animations to finish before each capture

Example:
  npm run screenshot:deck -- http://localhost:8080/presentations/2026-devtalks-romania/ devtalks-current
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
    await page.goto(url, {waitUntil: 'networkidle', timeout: 30_000});

    // We don't know the total until walkDeck queries it, but we want zero-padded
    // filenames. Discover count up-front so pad width is known.
    const total = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      return stage ? stage.querySelectorAll(':scope > section').length : 0;
    });
    if (total === 0) {
      console.error('No <deck-stage> > <section> elements found at this URL.');
      process.exit(1);
    }
    const padLen = Math.max(2, String(total).length);

    console.log(`Capturing ${total} slides from ${url}`);
    await walkDeck(page, async (i, n) => {
      const outPath = path.join(outDir, `slide-${String(i).padStart(padLen, '0')}.png`);
      await page.screenshot({path: outPath, fullPage: false});
      console.log(`  [${i}/${n}] ${outPath}`);
    });

    console.log(`✓ ${total} slides → ${outDir}`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
