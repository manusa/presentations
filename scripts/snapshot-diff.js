#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {walkDeck} = require('./lib/deck');

const USAGE = `Usage: npm run snapshot:diff -- <deck-url> <deck-name>

  <deck-url>   URL of a deck (single page containing <deck-stage> with <section> children)
  <deck-name>  Short slug matching a previously-captured baseline

Captures the deck's current state, then pixel-diffs each slide against the committed
baseline at snapshots/<deck-name>/baseline/. Anti-aliasing differences are tolerated;
real visual changes are surfaced.

Outputs:
  snapshots/<deck-name>/current/slide-NN.png   (gitignored — last capture)
  snapshots/<deck-name>/diff/slide-NN.png      (gitignored — only when that slide differs)

Console report: per-slide pixel diff count + %.
Exit code: 0 if all slides identical, 1 if any differ (or slide count changed).

Example:
  npm run snapshot:diff -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ devtalks-2026
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
const root = path.resolve(__dirname, '..', 'snapshots', deckName);
const baselineDir = path.join(root, 'baseline');
const currentDir = path.join(root, 'current');
const diffDir = path.join(root, 'diff');

if (!fs.existsSync(baselineDir) || fs.readdirSync(baselineDir).length === 0) {
  console.error(`No baseline found at ${baselineDir}`);
  console.error(`Run: npm run snapshot:baseline -- ${url} ${deckName}`);
  process.exit(1);
}

let chromium, PNG;
try {
  ({chromium} = require('playwright'));
  ({PNG} = require('pngjs'));
} catch (err) {
  console.error(`Missing dependency: ${err.message}. Run: npm install`);
  process.exit(1);
}

(async () => {
  // pixelmatch v7 is ESM-only; dynamic import works inside this async block.
  let pixelmatch;
  try {
    pixelmatch = (await import('pixelmatch')).default;
  } catch (err) {
    console.error(`Failed to load pixelmatch: ${err.message}. Run: npm install`);
    process.exit(1);
  }

  fs.rmSync(currentDir, {recursive: true, force: true});
  fs.rmSync(diffDir, {recursive: true, force: true});
  fs.mkdirSync(currentDir, {recursive: true});
  fs.mkdirSync(diffDir, {recursive: true});

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

    console.log(`Capturing current state of "${deckName}" — ${total} slides`);
    const currentPaths = [];
    await walkDeck(page, async (i, n) => {
      const p = path.join(currentDir, `slide-${String(i).padStart(padLen, '0')}.png`);
      await page.screenshot({path: p, fullPage: false});
      currentPaths.push(p);
    });

    // Diff each current slide against its baseline counterpart.
    const baselineFiles = new Set(fs.readdirSync(baselineDir).filter((f) => f.endsWith('.png')));
    let regressions = 0;
    let totalPixelsDiff = 0;
    const extras = [];
    const missing = [];

    console.log(`\nDiffing against ${baselineDir}\n`);

    for (const cur of currentPaths) {
      const name = path.basename(cur);
      const base = path.join(baselineDir, name);
      if (!fs.existsSync(base)) {
        extras.push(name);
        console.log(`  ${name}: NEW — no baseline for this slide`);
        regressions++;
        continue;
      }
      baselineFiles.delete(name);
      const baseImg = PNG.sync.read(fs.readFileSync(base));
      const curImg = PNG.sync.read(fs.readFileSync(cur));
      if (baseImg.width !== curImg.width || baseImg.height !== curImg.height) {
        console.log(`  ${name}: DIMENSIONS CHANGED — baseline ${baseImg.width}×${baseImg.height}, current ${curImg.width}×${curImg.height}`);
        regressions++;
        continue;
      }
      const diff = new PNG({width: baseImg.width, height: baseImg.height});
      const numDiff = pixelmatch(baseImg.data, curImg.data, diff.data, baseImg.width, baseImg.height, {
        threshold: 0.1,
        includeAA: false,
      });
      if (numDiff > 0) {
        const pct = ((numDiff / (baseImg.width * baseImg.height)) * 100).toFixed(3);
        const diffPath = path.join(diffDir, name);
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
        console.log(`  ${name}: ${numDiff} pixels differ (${pct}%) → ${path.relative(process.cwd(), diffPath)}`);
        regressions++;
        totalPixelsDiff += numDiff;
      } else {
        console.log(`  ${name}: identical`);
      }
    }

    for (const name of baselineFiles) {
      missing.push(name);
      console.log(`  ${name}: REMOVED — was in baseline, not in current`);
      regressions++;
    }

    console.log('');
    if (regressions === 0) {
      console.log(`✓ all ${total} slides identical to baseline`);
      process.exit(0);
    } else {
      console.log(`✗ ${regressions} slide(s) differ from baseline`);
      if (extras.length) console.log(`  new slides:     ${extras.join(', ')}`);
      if (missing.length) console.log(`  removed slides: ${missing.join(', ')}`);
      console.log(`  diff overlays:  ${path.relative(process.cwd(), diffDir)}/`);
      process.exit(1);
    }
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
