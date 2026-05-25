#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {walkDeck} = require('./lib/deck');

const USAGE = `Usage: npm run snapshot:baseline -- <deck-url> <deck-name>

  <deck-url>   URL of a deck (single page containing <deck-stage> with <section> children)
  <deck-name>  Short slug used to namespace this deck's snapshots

Writes one PNG per slide to snapshots/<deck-name>/baseline/slide-NN.png and OVERWRITES
any existing baseline. The snapshots/ directory is gitignored — baselines are
session-scoped reference points, not committed artifacts.

When to run:
  - Right before starting a change, to capture the "before" state for snapshot:diff
  - Re-capture at any point if you want to reset the comparison reference mid-session

Example:
  npm run snapshot:baseline -- http://localhost:8080/presentations/2026-devtalks-romania/ devtalks-2026
`;

const args = process.argv.slice(2);
if (args.length < 1 || args[0] === '-h' || args[0] === '--help') {
  console.log(USAGE);
  process.exit(args.length === 0 ? 1 : 0);
}
if (args.length !== 2) {
  console.error('Expected exactly two arguments: <deck-url> <deck-name>');
  process.exit(1);
}

const [url, deckName] = args;
const baselineDir = path.resolve(__dirname, '..', 'snapshots', deckName, 'baseline');

let chromium;
try {
  ({chromium} = require('playwright'));
} catch (err) {
  console.error('playwright is not installed. Run: npm install');
  process.exit(1);
}

(async () => {
  // Wipe and recreate so removed slides disappear from the baseline.
  fs.rmSync(baselineDir, {recursive: true, force: true});
  fs.mkdirSync(baselineDir, {recursive: true});

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

    const total = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      return stage ? stage.querySelectorAll(':scope > section').length : 0;
    });
    if (total === 0) {
      console.error('No <deck-stage> > <section> elements found at this URL.');
      process.exit(1);
    }
    const padLen = Math.max(2, String(total).length);

    console.log(`Capturing baseline for "${deckName}" — ${total} slides`);
    await walkDeck(page, async (i, n) => {
      const out = path.join(baselineDir, `slide-${String(i).padStart(padLen, '0')}.png`);
      await page.screenshot({path: out, fullPage: false});
      console.log(`  [${i}/${n}] ${out}`);
    });

    console.log(`✓ baseline written to ${baselineDir}`);
    console.log(`  now make your changes, then: npm run snapshot:diff -- ${url} ${deckName}`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
