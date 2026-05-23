#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const USAGE = `Usage: npm run screenshot -- <url> [name]

  <url>   URL to capture (e.g. http://localhost:8000/presentations/2026-devtalks-romania)
  [name]  Output basename (default: screenshot-<timestamp>). The .png suffix is added automatically.

Examples:
  npm run screenshot -- http://localhost:8000/ landing
  npm run screenshot -- http://localhost:8000/presentations/2025-devbcn-model-context-protocol-servers/slide-010-about mcp-about

Output:
  ./screenshots/<name>.png at 1920x1080.

First-time setup (downloads ~150MB):
  npm run screenshot:setup
`;

const args = process.argv.slice(2);
if (args.length < 1 || args[0] === '-h' || args[0] === '--help') {
  console.log(USAGE);
  process.exit(args.length < 1 ? 1 : 0);
}

const [url, rawName] = args;
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
  // Small settle delay so CSS animations don't get caught mid-frame.
  await page.waitForTimeout(500);
  await page.screenshot({path: outPath, fullPage: false});
  await browser.close();
  console.log(`✓ ${outPath}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
