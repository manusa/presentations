'use strict';

/*
 * pdf-links.js — shared helpers for asserting that the PDF export preserves the
 * deck's clickable references.
 *
 * Used by two consumers:
 *   - scripts/test-pdf-links.js  (standalone `npm run test:pdf-links`)
 *   - scripts/export-pdf.js      (runs the check as the last step of an export)
 *
 * The three functions are pure (no I/O), so the work lives here and the callers
 * only handle argv / page / file plumbing.
 */

const {PDFDocument, PDFName} = require('pdf-lib');

/**
 * Extract every external URI embedded as a Link annotation in a PDF.
 *
 * Chromium emits one `/Subtype /Link` annotation per `<a href>` anchor, with a
 * URI action: `… /Annots [ << /A << /S /URI /URI (https://…) >> >> … ] …`. We
 * walk each page's /Annots array, resolve indirect refs, and pull /A → /URI.
 * Internal links (named destinations / GoTo actions) carry no /URI and are
 * skipped — this only reports external anchor targets.
 *
 * @param {Uint8Array|Buffer} bytes raw PDF bytes
 * @returns {Promise<string[]>} sorted, de-duplicated URI strings
 */
async function extractPdfUris(bytes) {
  const doc = await PDFDocument.load(bytes, {updateMetadata: false});
  const found = new Set();
  for (const page of doc.getPages()) {
    const annots = page.node.Annots();
    if (!annots) continue;
    for (let i = 0; i < annots.size(); i += 1) {
      const annot = annots.lookup(i);
      if (!annot || typeof annot.lookup !== 'function') continue;
      const action = annot.lookup(PDFName.of('A'));
      if (!action || typeof action.lookup !== 'function') continue;
      const uri = action.lookup(PDFName.of('URI'));
      if (uri && typeof uri.decodeText === 'function') {
        found.add(uri.decodeText());
      }
    }
  }
  return [...found].sort();
}

/**
 * Extract the external URLs of `<a href>` anchors from an HTML string.
 *
 * Deliberately matches `<a …>` only — `<link rel=stylesheet>`, font preconnect
 * hints and `<meta>`/og URLs are not clickable anchors and never become PDF
 * Link annotations, so they must not enter the expected set. Only http(s)
 * targets are returned (mailto:, #hash and relative hrefs are ignored).
 *
 * The `href` token is required to be preceded by whitespace so it is matched as
 * a standalone attribute, never as the tail of `data-href`. Double-, single- and
 * unquoted attribute values are all accepted, so it stays aligned with the DOM
 * collection in `export-pdf.js` (`getAttribute('href')`) regardless of quoting.
 *
 * Known limitation: as a regex over raw markup it cannot model rendered state —
 * a literal `>` inside an attribute value before `href`, anchors hidden via
 * `.export-hidden`, or anchors injected at runtime are out of its reach. For the
 * authoritative, render-accurate check, `export-pdf.js` reads the live DOM; this
 * function is the lightweight source-of-truth for static deck markup.
 *
 * @param {string} html
 * @returns {string[]} sorted, de-duplicated anchor URLs
 */
function extractAnchorUrls(html) {
  const urls = new Set();
  const re = /<a\b[^>]*?\shref\s*=\s*(?:"(https?:\/\/[^"]+)"|'(https?:\/\/[^']+)'|(https?:\/\/[^\s"'>]+))/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    urls.add(m[1] || m[2] || m[3]);
  }
  return [...urls].sort();
}

/**
 * Normalize a URL for comparison so trivially-equivalent forms match — most
 * importantly a bare origin (`https://blog.marcnuri.com`) and the trailing-slash
 * form Chromium stores in the PDF (`https://blog.marcnuri.com/`). Paths, query
 * strings and fragments are preserved. Unparseable strings compare verbatim.
 *
 * @param {string} u
 * @returns {string}
 */
function normalizeUrl(u) {
  try {
    return new URL(u).href;
  } catch {
    return u;
  }
}

/**
 * Diff the URIs found in a PDF against the expected anchor set.
 *
 * @param {string[]} found    URIs extracted from the PDF
 * @param {string[]} expected anchor URLs that should be present
 * @returns {{missing: string[], extra: string[]}} `missing` = expected but not
 *   in the PDF (the regression we guard against); `extra` = in the PDF but not
 *   expected. Both list the original (un-normalized) strings, sorted.
 */
function diffLinks(found, expected) {
  const foundNorm = new Map(found.map((u) => [normalizeUrl(u), u]));
  const expectedNorm = new Map(expected.map((u) => [normalizeUrl(u), u]));
  const missing = [...expectedNorm]
    .filter(([key]) => !foundNorm.has(key))
    .map(([, original]) => original)
    .sort();
  const extra = [...foundNorm]
    .filter(([key]) => !expectedNorm.has(key))
    .map(([, original]) => original)
    .sort();
  return {missing, extra};
}

module.exports = {extractPdfUris, extractAnchorUrls, normalizeUrl, diffLinks};
