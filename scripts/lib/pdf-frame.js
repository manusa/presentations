'use strict';

/*
 * pdf-frame.js — frame-survival guard for the PDF export.
 *
 * Chromium's page.pdf() shrink-to-fits a multi-page deck when a slide stages
 * content off-screen for an animation (its un-clipped box escapes the slide):
 * every page is scaled to ~0.943 and anchored top-left, leaving a white frame
 * on the right + bottom (issue #1908). `contain: size` in the export pagination
 * CSS defeats it, but this guard is the belt-and-suspenders that fails the
 * export loudly if a future change lets the frame back in — the same role the
 * link-survival check plays for clickable references.
 *
 * Detection is purely structural (no rasteriser, no extra dependency): a
 * full-bleed page maps its CSS-pixel content space onto the PDF page at exactly
 * 0.75 pt per px (= 72/96 dpi). That ratio shows up as the cumulative scale of
 * the leading CTM (`cm`) operators of the page's content stream. A framed page
 * carries the extra 0.943 factor (0.75 × 0.943 ≈ 0.707) and is flagged.
 *
 * Used by two consumers (mirrors pdf-links.js):
 *   - scripts/test-pdf-frame.js  (standalone `npm run test:pdf-frame`)
 *   - scripts/export-pdf.js      (runs the check as the last step of an export)
 */

const zlib = require('zlib');
const {PDFDocument, PDFName} = require('pdf-lib');

// CSS pixels → PDF points: Chromium lays out at 96 px/in, PDF uses 72 pt/in.
// A full-bleed page's content (authored in CSS px) therefore maps onto its
// MediaBox at this exact cumulative scale; anything below it is a shrink-to-fit.
// This ratio is the dpi mapping alone — it is independent of the deck's design
// dimensions (a 1280×720 and a 2560×1440 full-bleed page both read 0.75).
const PX_TO_PT = 0.75;

// Absolute tolerance around PX_TO_PT. The real frame scales to ≈0.707 (0.75 ×
// 0.943), i.e. 0.043 off — ~4× this tolerance — so the catch has wide headroom
// while staying immune to sub-pixel float noise.
const FRAME_TOLERANCE = 0.01;

// Path/text painting operators. The FIRST of these on a page is the slide's
// background fill (printBackground draws it before anything else), painted
// directly under the leading device×content CTM — so the cumulative scale read
// at that point is the page's true content scale. Image/shading operators
// (`Do`/`sh`/`BI`) are intentionally excluded: they carry their own placement
// matrix inside a q/Q pair, so the leading CTM is restored before the first
// fill regardless.
//
// Load-bearing assumption: that first paint is the background fill, emitted by
// Chromium BEFORE any text-showing (`Tj`/`TJ`) or string/array operand. The
// whitespace tokenizer below does not model PDF string `(...)`/`<...>` literals,
// so a numeric token leaking out of a string before the first `cm`+paint could
// skew the reading — which cannot happen while the bg fill leads. A page with no
// background fill (e.g. a full-bleed image over a transparent section) yields
// `null` instead, and the export surfaces those as "unverifiable" rather than
// silently passing them (see findFramedPages / export-pdf.js).
const PAINT_OPS = new Set(['f', 'F', 'f*', 'B', 'B*', 'b', 'b*', 'S', 's', 'BT']);
const NUMBER = /^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/;

/**
 * Cumulative x/y scale of the leading CTM at the first painting operator of a
 * content stream, tracking q/Q save/restore so a per-object matrix inside a
 * q/Q pair cannot leak into the page-level scale. Returns null if the page
 * paints nothing (an empty page is unverifiable, not a frame).
 *
 * Assumes axis-aligned matrices (b == c == 0), which is what page.pdf() emits;
 * only the a/d (x/y scale) factors are accumulated. Scales are returned as
 * magnitudes — the device matrix flips Y (PDF is bottom-up), so the raw d is
 * negative, but only the |scale| matters for frame detection.
 *
 * @param {string} content decoded content-stream text
 * @returns {{x: number, y: number}|null}
 */
function leadingScale(content) {
  const tokens = content.split(/\s+/);
  let ctm = {x: 1, y: 1};
  const stack = [];
  const operands = [];
  for (const tok of tokens) {
    if (tok === '') continue;
    if (NUMBER.test(tok)) {
      operands.push(parseFloat(tok));
      continue;
    }
    if (tok[0] === '/') continue; // name operand (e.g. /Gs for `gs`) — not numeric
    // operator
    if (tok === 'q') {
      stack.push({x: ctm.x, y: ctm.y});
    } else if (tok === 'Q') {
      if (stack.length) ctm = stack.pop();
    } else if (tok === 'cm') {
      const n = operands.length;
      if (n >= 6) {
        ctm = {x: ctm.x * operands[n - 6], y: ctm.y * operands[n - 3]};
      }
    } else if (PAINT_OPS.has(tok)) {
      return {x: Math.abs(ctm.x), y: Math.abs(ctm.y)};
    }
    operands.length = 0;
  }
  return null;
}

function decodeStream(stream) {
  let buf = Buffer.from(stream.getContents());
  const filter = stream.dict && stream.dict.get(PDFName.of('Filter'));
  if (filter && /FlateDecode/.test(filter.toString())) {
    try {
      buf = zlib.inflateSync(buf);
    } catch (err) {
      return '';
    }
  }
  return buf.toString('latin1');
}

function pageContent(doc, pageNode) {
  const contents = pageNode.Contents();
  if (!contents) return null;
  const streams = typeof contents.asArray === 'function'
    ? contents.asArray().map((ref) => doc.context.lookup(ref))
    : [contents];
  let out = '';
  for (const s of streams) {
    if (s && typeof s.getContents === 'function') out += decodeStream(s) + '\n';
  }
  return out;
}

/**
 * Per-page cumulative leading CTM scale of a PDF.
 *
 * @param {Uint8Array|Buffer} bytes raw PDF bytes
 * @returns {Promise<Array<{page: number, scaleX: number|null, scaleY: number|null}>>}
 */
async function pageContentScales(bytes) {
  const doc = await PDFDocument.load(bytes, {updateMetadata: false});
  const pages = doc.getPages();
  const out = [];
  for (let i = 0; i < pages.length; i += 1) {
    const content = pageContent(doc, pages[i].node);
    const s = content == null ? null : leadingScale(content);
    out.push({page: i + 1, scaleX: s ? s.x : null, scaleY: s ? s.y : null});
  }
  return out;
}

/**
 * Pages whose content scale deviates from the full-bleed PX_TO_PT ratio beyond
 * `tolerance` — i.e. the page.pdf() shrink-to-fit frame is present. Pages that
 * paint nothing (scaleX null) are not flagged.
 *
 * @param {Uint8Array|Buffer} bytes raw PDF bytes
 * @param {{tolerance?: number}} [opts] absolute scale tolerance (default FRAME_TOLERANCE)
 * @returns {Promise<Array<{page: number, scaleX: number, scaleY: number|null, expected: number}>>}
 */
async function findFramedPages(bytes, {tolerance = FRAME_TOLERANCE} = {}) {
  const scales = await pageContentScales(bytes);
  return scales
    .filter((s) => s.scaleX != null && Math.abs(s.scaleX - PX_TO_PT) > tolerance)
    .map((s) => ({...s, expected: PX_TO_PT}));
}

module.exports = {PX_TO_PT, FRAME_TOLERANCE, pageContentScales, findFramedPages, leadingScale};
