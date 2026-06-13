#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const {gotoDeck, settleAnimations, applyExportHidden, expandStepClones} = require('./lib/deck');
const {extractPdfUris, diffLinks} = require('./lib/pdf-links');

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
  npm run export:pdf -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ /tmp/devtalks-2026.pdf
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

let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('sharp is not installed. Run: npm install');
  process.exit(1);
}

/**
 * Photographic raster images (WebP/PNG without an alpha channel) embed in the
 * PDF as large FlateDecode bitmaps because PDF doesn't natively support WebP
 * and Chromium falls back to PNG-style storage. JPEG (DCTDecode) is supported
 * natively and stores at source size. We fetch each candidate via the page's
 * request context, transcode to JPEG q=85 via sharp, and rewrite the src to a
 * data URL. Images with transparency are left untouched.
 *
 * Runs BEFORE expandStepClones so the rewritten srcs propagate naturally to
 * cloned step-states without re-transcoding the same bytes per clone.
 */
async function transcodePhotosToJpeg(page, {quality = 85} = {}) {
  // Track the WebP→JPEG case separately — those are the wins that matter
  // because WebP forces Chromium to inflate to FlateDecode bitmaps (~10x).
  let webpCount = 0;
  const srcs = await page.evaluate(() => {
    const urls = new Set();
    const visit = (el) => {
      const src = el.getAttribute('src');
      if (!src || src.startsWith('data:')) return;
      const stem = src.split('?')[0].toLowerCase();
      if (stem.endsWith('.svg')) return;
      urls.add(src);
    };
    document.querySelectorAll('img[src]').forEach(visit);
    document.querySelectorAll('image-slot[src]').forEach(visit);
    return Array.from(urls);
  });
  if (srcs.length === 0) return {transcoded: 0, webpCount: 0};

  const pageUrl = page.url();
  const replacements = {};

  for (const src of srcs) {
    let resolved;
    try {
      resolved = new URL(src, pageUrl).href;
    } catch (err) {
      continue;
    }
    try {
      const resp = await page.context().request.get(resolved);
      if (!resp.ok()) continue;
      const buf = Buffer.from(await resp.body());
      const meta = await sharp(buf).metadata();
      if (meta.hasAlpha) continue;
      const jpegBuf = await sharp(buf).jpeg({quality, mozjpeg: true}).toBuffer();
      // WebP sources MUST be transcoded — PDF doesn't support WebP and Chromium
      // would otherwise inflate them to FlateDecode bitmaps (huge). For other
      // formats, only transcode if the JPEG is meaningfully smaller.
      const isWebP = meta.format === 'webp';
      if (!isWebP && jpegBuf.length >= buf.length * 0.95) continue;
      replacements[src] = `data:image/jpeg;base64,${jpegBuf.toString('base64')}`;
      if (isWebP) webpCount += 1;
    } catch (err) {
      // Unreadable, unsupported, or non-image — skip.
    }
  }
  if (Object.keys(replacements).length === 0) return {transcoded: 0, webpCount: 0};

  await page.evaluate((map) => {
    const apply = (el) => {
      const src = el.getAttribute('src');
      if (map[src]) el.setAttribute('src', map[src]);
    };
    document.querySelectorAll('img[src]').forEach(apply);
    document.querySelectorAll('image-slot[src]').forEach(apply);
  }, replacements);

  return {transcoded: Object.keys(replacements).length, webpCount};
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

    const originalCount = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      return stage ? stage.querySelectorAll(':scope > section').length : 0;
    });
    if (originalCount === 0) {
      console.error('No <deck-stage> > <section> elements found at this URL.');
      process.exit(1);
    }

    await applyExportHidden(page);

    const {transcoded, webpCount} = await transcodePhotosToJpeg(page);
    if (transcoded > 0) {
      const detail = webpCount > 0
        ? ` (${webpCount} WebP→JPEG — large embed savings)`
        : '';
      console.log(
        `Transcoded ${transcoded} photographic image${transcoded === 1 ? '' : 's'} to JPEG${detail}`
      );
    }

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

    // Last step: assert every clickable reference in the deck survived into the
    // PDF as a link annotation. The expected set is the deck's own <a href>
    // anchors (read live from the DOM, excluding hidden export chrome), so this
    // self-validates without a separate source of truth. A regression in the
    // export pipeline, an @media print rule, or an <a> wrapper that drops links
    // fails the export loudly instead of shipping a silently-broken PDF.
    const expectedLinks = await page.evaluate(() => {
      const urls = new Set();
      document.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (href && /^https?:/i.test(href) && !a.closest('.export-hidden')) {
          urls.add(href);
        }
      });
      return [...urls];
    });
    if (expectedLinks.length > 0) {
      const foundLinks = await extractPdfUris(fs.readFileSync(absOut));
      const {missing, extra} = diffLinks(foundLinks, expectedLinks);
      if (extra.length) {
        console.warn(
          `⚠ Link check: ${extra.length} URL${extra.length === 1 ? '' : 's'} in the PDF not present as a deck anchor:`
        );
        extra.forEach((u) => console.warn(`    extra: ${u}`));
      }
      if (missing.length) {
        console.error(
          `✗ Link check: ${missing.length}/${expectedLinks.length} anchor link${
            missing.length === 1 ? '' : 's'
          } missing from the PDF:`
        );
        missing.forEach((u) => console.error(`    missing: ${u}`));
        console.error('The PDF was written but does not preserve every clickable reference.');
        process.exitCode = 1;
      } else {
        console.log(`✓ Link check: all ${expectedLinks.length} anchor links preserved in the PDF.`);
      }
    }
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
