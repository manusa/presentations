'use strict';

// Unit tests for scripts/lib/pdf-frame.js — the frame-survival guard.
//
// Background: Chromium's page.pdf() shrink-to-fits a multi-page deck when some
// slide stages content off-screen, scaling every page to ~0.943 and leaving a
// white right/bottom frame (issue #1908). The guard detects this purely from
// the PDF's content streams: a full-bleed page maps CSS px → PDF points at
// exactly 0.75 (= 72/96), so the cumulative leading CTM scale must be 0.75. A
// framed page is scaled down (≈0.707 = 0.75 × 0.943) and is flagged.
//
// Fixtures are crafted by hand so a known leading CTM can be asserted without a
// browser or a multi-megabyte committed PDF.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { PDFDocument, PDFName } = require('pdf-lib');

const { pageContentScales, findFramedPages, PX_TO_PT, FRAME_TOLERANCE } = require('../../scripts/lib/pdf-frame');

// Build a 1-page PDF whose page content stream is exactly `content`.
// Mimics Chromium's structure: a device matrix, a clip, a content matrix, then
// a fill — so the q/Q/clip handling is exercised, not just a single `cm`.
// `compress: true` emits a FlateDecode stream (real Chromium exports are
// compressed), exercising the zlib.inflateSync path that the uncompressed
// fixtures otherwise skip.
async function makePdf(content, { mediaBox = [0, 0, 1440, 810], compress = false } = {}) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([mediaBox[2], mediaBox[3]]);
  const stream = compress ? doc.context.flateStream(content) : doc.context.stream(content);
  const ref = doc.context.register(stream);
  page.node.set(PDFName.of('Contents'), ref);
  return doc.save({ useObjectStreams: false });
}

// Build a multi-page PDF, one content stream per page — the bug scales the
// WHOLE document, so per-page detection and 1-based page indexing must be right.
async function makeMultiPdf(contents, { mediaBox = [0, 0, 1440, 810] } = {}) {
  const doc = await PDFDocument.create();
  for (const content of contents) {
    const page = doc.addPage([mediaBox[2], mediaBox[3]]);
    const ref = doc.context.register(doc.context.stream(content));
    page.node.set(PDFName.of('Contents'), ref);
  }
  return doc.save({ useObjectStreams: false });
}

// A clean page: device 0.24 × content 3.125 = 0.75.
const CLEAN = [
  '.24 0 0 -.24 0 810 cm',
  'q',
  '0 0 6000 3375 re W* n',
  'q',
  '3.125 0 0 3.125 0 0 cm',
  '1 1 1 rg',
  '0 0 1920 1080 re f',
  'Q Q',
].join('\n');

// A framed page: device 0.24 × content 2.9466834 = 0.7072 (= 0.75 × 0.943).
const FRAMED = [
  '.24 0 0 -.24 0 810 cm',
  'q',
  '0 0 6000 3375 re W* n',
  'q',
  '2.9466834 0 0 2.9466834 0 0 cm',
  '1 1 1 rg',
  '0 0 2037 1146 re f',
  'Q Q',
].join('\n');

// A framed page whose FIRST painting op is text (BT), not a background fill —
// the page scale must still be read from the leading CTM.
const FRAMED_BT = [
  '.24 0 0 -.24 0 810 cm',
  'q',
  '2.9466834 0 0 2.9466834 0 0 cm',
  'BT /F1 12 Tf 0 0 Td (hi) Tj ET',
  'Q',
].join('\n');

// A page whose only painting is a placed image (`Do`) under its own matrix and
// no background fill — unmeasurable, must read as null (not a frame).
const IMAGE_ONLY = [
  '.24 0 0 -.24 0 810 cm',
  'q 3.125 0 0 3.125 0 0 cm',
  'q 1920 0 0 1080 0 0 cm /Im0 Do Q',
  'Q',
].join('\n');

describe('PX_TO_PT', () => {
  test('is the 96→72 dpi ratio', () => {
    assert.equal(PX_TO_PT, 0.75);
  });
});

describe('pageContentScales', () => {
  test('computes the cumulative leading CTM scale of a clean page', async () => {
    const [s] = await pageContentScales(await makePdf(CLEAN));
    assert.equal(s.page, 1);
    assert.ok(Math.abs(s.scaleX - 0.75) < 1e-4, `scaleX ${s.scaleX} ≈ 0.75`);
    assert.ok(Math.abs(s.scaleY - 0.75) < 1e-4, `scaleY ${s.scaleY} ≈ 0.75`);
  });

  test('computes the down-scaled CTM of a framed page', async () => {
    const [s] = await pageContentScales(await makePdf(FRAMED));
    assert.ok(Math.abs(s.scaleX - 0.7072) < 1e-3, `scaleX ${s.scaleX} ≈ 0.707`);
  });

  test('multiplies multiple cm operators and respects q/Q nesting', async () => {
    // device 0.5, then a saved+restored 0.1 that must NOT leak past its Q,
    // then content 1.5 → cumulative for the fill = 0.5 × 1.5 = 0.75.
    const content = [
      '.5 0 0 .5 0 0 cm',
      'q .1 0 0 .1 0 0 cm Q',
      '1.5 0 0 1.5 0 0 cm',
      '0 0 10 10 re f',
    ].join('\n');
    const [s] = await pageContentScales(await makePdf(content));
    assert.ok(Math.abs(s.scaleX - 0.75) < 1e-4, `scaleX ${s.scaleX} ≈ 0.75`);
  });

  test('reports scaleX null for a page that paints nothing', async () => {
    const [s] = await pageContentScales(await makePdf('q Q'));
    assert.equal(s.scaleX, null);
  });

  test('decodes a FlateDecode-compressed content stream (real exports are compressed)', async () => {
    const [s] = await pageContentScales(await makePdf(CLEAN, { compress: true }));
    assert.ok(Math.abs(s.scaleX - 0.75) < 1e-4, `scaleX ${s.scaleX} ≈ 0.75`);
  });

  test('reads the page scale when the first paint is text (BT), not a fill', async () => {
    const [s] = await pageContentScales(await makePdf(FRAMED_BT));
    assert.ok(Math.abs(s.scaleX - 0.7072) < 1e-3, `scaleX ${s.scaleX} ≈ 0.707`);
  });

  test('parses scientific-notation cm operands', async () => {
    const content = '7.5e-1 0 0 7.5e-1 0 0 cm 0 0 10 10 re f';
    const [s] = await pageContentScales(await makePdf(content));
    assert.ok(Math.abs(s.scaleX - 0.75) < 1e-4, `scaleX ${s.scaleX} ≈ 0.75`);
  });

  test('reads null for an image-only page (no background fill to measure)', async () => {
    const [s] = await pageContentScales(await makePdf(IMAGE_ONLY));
    assert.equal(s.scaleX, null);
  });
});

describe('findFramedPages', () => {
  test('flags a framed page', async () => {
    const framed = await findFramedPages(await makePdf(FRAMED));
    assert.equal(framed.length, 1);
    assert.equal(framed[0].page, 1);
    assert.ok(framed[0].scaleX < PX_TO_PT);
  });

  test('passes a clean page', async () => {
    const framed = await findFramedPages(await makePdf(CLEAN));
    assert.deepEqual(framed, []);
  });

  test('does not flag a page with no painted content (unverifiable, not a frame)', async () => {
    const framed = await findFramedPages(await makePdf('q Q'));
    assert.deepEqual(framed, []);
  });

  test('flags only the framed page in a mixed multi-page PDF, with its 1-based index', async () => {
    const framed = await findFramedPages(await makeMultiPdf([CLEAN, FRAMED, CLEAN]));
    assert.equal(framed.length, 1);
    assert.equal(framed[0].page, 2);
  });

  test('flags a framed page in a FlateDecode-compressed PDF', async () => {
    const framed = await findFramedPages(await makePdf(FRAMED, { compress: true }));
    assert.equal(framed.length, 1);
  });

  test('honours the FRAME_TOLERANCE default export', () => {
    assert.equal(FRAME_TOLERANCE, 0.01);
  });
});
