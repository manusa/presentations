#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {settleAnimations, goToStep} = require('./lib/deck');

const USAGE = `Usage: npm run screenshot -- <url> [name] [--delay <ms>] [--slide N [--step K]]

  <url>           URL to capture (e.g. http://localhost:8000/presentations/2026-devtalks-romania)
  [name]          Output basename (default: screenshot-<timestamp>). The .png suffix is added automatically.
  [--delay <ms>]  Fixed wait after networkidle, instead of waiting for animations to settle.
                  Use this to capture a slide mid-animation (e.g. --delay 200 for an early frame).
  [--slide N]     1-indexed section to jump to inside the deck before capturing. Uses the
                  deck-stage public API; equivalent to loading the deck with hash #N.
  [--step K]      0-indexed step within the section (requires --slide). Section must publish
                  data-step-max >= K. Default 0.

The deck-stage component also accepts a #<N> hash on initial load to deep-link to section N
(1-indexed). The --slide/--step flags are a scripted equivalent for capture workflows.

Examples:
  npm run screenshot -- http://localhost:8000/ landing
  npm run screenshot -- http://localhost:8000/.../slide-010-about mcp-about
  npm run screenshot -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ early --delay 200
  npm run screenshot -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ s19-step1 --slide 19 --step 1

Output:
  ./screenshots/<name>.png at 1920x1080.

First-time setup (downloads ~150MB):
  npm run screenshot:setup
`;

function parseArgs(rawArgs) {
  const positional = [];
  let delay = null;
  let slide = null;
  let step = null;
  for (let i = 0; i < rawArgs.length; i++) {
    const a = rawArgs[i];
    if (a === '--delay') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 0) {
        console.error('--delay requires a non-negative integer (milliseconds).');
        process.exit(1);
      }
      delay = v;
    } else if (a === '--slide') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 1) {
        console.error('--slide requires a positive integer (1-indexed section number).');
        process.exit(1);
      }
      slide = v;
    } else if (a === '--step') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 0) {
        console.error('--step requires a non-negative integer (0-indexed step within the section).');
        process.exit(1);
      }
      step = v;
    } else if (a === '-h' || a === '--help') {
      console.log(USAGE);
      process.exit(0);
    } else {
      positional.push(a);
    }
  }
  if (step !== null && slide === null) {
    console.error('--step requires --slide.');
    process.exit(1);
  }
  return {positional, delay, slide, step};
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length < 1) {
  console.log(USAGE);
  process.exit(1);
}
const {positional, delay, slide, step} = parseArgs(rawArgs);
const [url, rawName] = positional;
if (!url) {
  console.error('Missing <url>.');
  process.exit(1);
}

const name = (rawName || `screenshot-${Date.now()}`).replace(/\.png$/i, '');
const outDir = path.resolve(__dirname, '..', 'screenshots');
fs.mkdirSync(outDir, {recursive: true});
const outPath = path.join(outDir, `${name}.png`);

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
  const context = await browser.newContext({viewport: {width: 1920, height: 1080}});
  const page = await context.newPage();
  await page.goto(url, {waitUntil: 'networkidle', timeout: 30_000});

  if (slide !== null) {
    try {
      await goToStep(page, slide, step == null ? 0 : step);
    } catch (err) {
      console.error(err.message || err);
      await browser.close();
      process.exit(1);
    }
  }

  if (delay !== null) {
    await page.waitForTimeout(delay);
  } else if (slide === null) {
    // goToStep already settled; only settle here for the no-jump path.
    await settleAnimations(page);
  }

  await page.screenshot({path: outPath, fullPage: false});
  await browser.close();
  console.log(`✓ ${outPath}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
