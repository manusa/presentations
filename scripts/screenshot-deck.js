#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {gotoDeck, walkDeck, slideFilename, goToStep, disableRail, applyExportHidden, settleAnimations} = require('./lib/deck');

const USAGE = `Usage: npm run screenshot:deck -- <deck-url> <name> [--slide N [--step K]]

  <deck-url>    URL of a deck (single page containing <deck-stage> with <section> children)
  <name>        Output subdirectory name under screenshots/
  [--slide N]   1-indexed section to capture (all its steps). Default: walk the whole deck.
  [--step K]    0-indexed step within --slide (requires --slide). Default: every step.

Captures one PNG per (section, step) at 1920x1080:
  ./screenshots/<name>/slide-NN.png            for non-stepped sections
  ./screenshots/<name>/slide-NN-step-K.png     for sections with data-step-max="N" (one PNG per step state)

How it works:
  - Loads the deck, discovers (section, step) pairs from <deck-stage> > <section>[data-step-max]
  - Navigates via ArrowRight keypress (agnostic of any deck-stage internals)
  - Waits for non-looping CSS animations to finish before each capture
  - With --slide, jumps straight to that section (deck-stage goTo API) and captures its steps only

Examples:
  npm run screenshot:deck -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ devtalks-current
  npm run screenshot:deck -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ s04 --slide 4
  npm run screenshot:deck -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ s19-step1 --slide 19 --step 1
`;

function parseArgs(rawArgs) {
  const positional = [];
  let slide = null;
  let step = null;
  for (let i = 0; i < rawArgs.length; i++) {
    const a = rawArgs[i];
    if (a === '--slide') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 1) { console.error('--slide requires a positive integer (1-indexed section).'); process.exit(1); }
      slide = v;
    } else if (a === '--step') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 0) { console.error('--step requires a non-negative integer (0-indexed step).'); process.exit(1); }
      step = v;
    } else if (a === '-h' || a === '--help') {
      console.log(USAGE); process.exit(0);
    } else {
      positional.push(a);
    }
  }
  if (step !== null && slide === null) { console.error('--step requires --slide.'); process.exit(1); }
  return {positional, slide, step};
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
  console.log(USAGE);
  process.exit(1);
}
const {positional, slide, step} = parseArgs(rawArgs);
if (positional.length !== 2) {
  console.error('Expected exactly two positional arguments: <deck-url> <name>');
  process.exit(1);
}

const [url, name] = positional;
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
    let total;
    if (slide !== null) {
      // Single-section capture: jump straight to the section and shoot the one
      // requested step, or all its steps (0..max). Mirrors audit-fit.js's
      // --slide path so the two tools target slides the same way.
      await disableRail(page);
      await applyExportHidden(page);
      const meta = await page.evaluate((n) => {
        const stage = document.querySelector('deck-stage');
        if (!stage) return {error: 'no-stage'};
        const secs = Array.from(stage.querySelectorAll(':scope > section'));
        if (n < 1 || n > secs.length) return {error: 'range', total: secs.length};
        const max = parseInt(secs[n - 1].getAttribute('data-step-max') || '0', 10);
        return {maxStep: Number.isFinite(max) && max > 0 ? max : 0, total: secs.length};
      }, slide);
      if (meta.error === 'no-stage') throw new Error('No <deck-stage> > <section> elements found at this URL.');
      if (meta.error === 'range') throw new Error(`--slide ${slide} is out of range (deck has ${meta.total} sections).`);
      if (step !== null && step > meta.maxStep) {
        throw new Error(`--step ${step} is out of range for section ${slide} (data-step-max=${meta.maxStep}).`);
      }
      const steps = step !== null ? [step] : Array.from({length: meta.maxStep + 1}, (_, k) => k);
      for (let i = 0; i < steps.length; i++) {
        const k = steps[i];
        await goToStep(page, slide, k);
        await settleAnimations(page);
        const descriptor = {sectionIdx: slide, step: k, maxStep: meta.maxStep, totalSections: meta.total};
        const outPath = path.join(outDir, slideFilename(descriptor));
        await page.screenshot({path: outPath, fullPage: false});
        console.log(`  [${i + 1}/${steps.length}] ${outPath}`);
      }
      total = steps.length;
    } else {
      total = await walkDeck(page, async (descriptor, totalPairs, captureIndex) => {
        const outPath = path.join(outDir, slideFilename(descriptor));
        await page.screenshot({path: outPath, fullPage: false});
        console.log(`  [${captureIndex}/${totalPairs}] ${outPath}`);
      });
    }

    console.log(`✓ ${total} captures → ${outDir}`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
