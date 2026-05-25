#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {settleAnimations} = require('./lib/deck');

const USAGE = `Usage: npm run screenshot -- <url> [name] [--delay <ms>]

  <url>           URL to capture (e.g. http://localhost:8000/presentations/2026-devtalks-romania)
  [name]          Output basename (default: screenshot-<timestamp>). The .png suffix is added automatically.
  [--delay <ms>]  Fixed wait after networkidle, instead of waiting for animations to settle.
                  Use this to capture a slide mid-animation (e.g. --delay 200 for an early frame).

Examples:
  npm run screenshot -- http://localhost:8000/ landing
  npm run screenshot -- http://localhost:8000/.../slide-010-about mcp-about
  npm run screenshot -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ early --delay 200

Output:
  ./screenshots/<name>.png at 1920x1080.

First-time setup (downloads ~150MB):
  npm run screenshot:setup
`;

function parseArgs(rawArgs) {
  const positional = [];
  let delay = null;
  for (let i = 0; i < rawArgs.length; i++) {
    const a = rawArgs[i];
    if (a === '--delay') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 0) {
        console.error('--delay requires a non-negative integer (milliseconds).');
        process.exit(1);
      }
      delay = v;
    } else if (a === '-h' || a === '--help') {
      console.log(USAGE);
      process.exit(0);
    } else {
      positional.push(a);
    }
  }
  return {positional, delay};
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length < 1) {
  console.log(USAGE);
  process.exit(1);
}
const {positional, delay} = parseArgs(rawArgs);
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

  if (delay !== null) {
    await page.waitForTimeout(delay);
  } else {
    await settleAnimations(page);
  }

  await page.screenshot({path: outPath, fullPage: false});
  await browser.close();
  console.log(`✓ ${outPath}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
