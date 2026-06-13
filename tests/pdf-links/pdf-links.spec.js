'use strict';

const {test} = require('node:test');
const assert = require('node:assert/strict');
const {PDFDocument, PDFName, PDFString} = require('pdf-lib');

const {extractPdfUris, extractAnchorUrls, normalizeUrl, diffLinks} = require('../../scripts/lib/pdf-links');

/**
 * Build an in-memory PDF whose pages carry URI Link annotations, mirroring the
 * structure Chromium emits for `<a href>` anchors (Annots → /A → /URI). Each
 * entry in `pagesUris` is one page; its array lists the URIs to attach.
 */
async function buildPdf(pagesUris) {
  const doc = await PDFDocument.create();
  const ctx = doc.context;
  for (const uris of pagesUris) {
    const page = doc.addPage([600, 400]);
    const refs = uris.map((uri) =>
      ctx.register(
        ctx.obj({
          Type: PDFName.of('Annot'),
          Subtype: PDFName.of('Link'),
          Rect: [0, 0, 100, 20],
          A: ctx.obj({Type: PDFName.of('Action'), S: PDFName.of('URI'), URI: PDFString.of(uri)}),
        })
      )
    );
    if (refs.length) page.node.set(PDFName.of('Annots'), ctx.obj(refs));
  }
  return doc.save();
}

test('extractPdfUris returns sorted, de-duplicated URIs across all pages', async () => {
  const bytes = await buildPdf([
    ['https://example.com/b', 'https://example.com/a'],
    ['https://example.com/a', 'https://github.com/manusa/yakd/pull/172'],
  ]);
  const uris = await extractPdfUris(bytes);
  assert.deepEqual(uris, [
    'https://example.com/a',
    'https://example.com/b',
    'https://github.com/manusa/yakd/pull/172',
  ]);
});

test('extractPdfUris returns [] for a PDF with no link annotations', async () => {
  const bytes = await buildPdf([[], []]);
  assert.deepEqual(await extractPdfUris(bytes), []);
});

test('extractPdfUris preserves query strings with percent-encoding', async () => {
  const url = 'https://github.com/fabric8io/kubernetes-client/issues?q=is%3Aclosed+label%3Aflaky';
  const bytes = await buildPdf([[url]]);
  assert.deepEqual(await extractPdfUris(bytes), [url]);
});

test('extractAnchorUrls picks only <a> http(s) hrefs, de-duplicated and sorted', () => {
  const html = `
    <link rel="stylesheet" href="https://cdn.example.com/all.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <a href="https://github.com/manusa/yakd">yakd</a>
    <a class="ref-link overlay" href="https://github.com/manusa" aria-label="x"></a>
    <a href="https://github.com/manusa/yakd">yakd again (dupe)</a>
    <a href="mailto:marc@marcnuri.com">mail</a>
    <a href="#5">internal hash</a>
    <a href="/relative/path">relative</a>
  `;
  assert.deepEqual(extractAnchorUrls(html), [
    'https://github.com/manusa',
    'https://github.com/manusa/yakd',
  ]);
});

test('extractAnchorUrls accepts double-, single- and unquoted href values', () => {
  const html = `
    <a href="https://example.com/double">double</a>
    <a href='https://example.com/single'>single</a>
    <a href=https://example.com/unquoted>unquoted</a>
  `;
  assert.deepEqual(extractAnchorUrls(html), [
    'https://example.com/double',
    'https://example.com/single',
    'https://example.com/unquoted',
  ]);
});

test('extractAnchorUrls does not mistake data-href for href', () => {
  // \shref guard: the href token must be a standalone attribute, never the tail
  // of data-href. The real href on the second anchor must still be picked up.
  const html = `
    <a data-href="https://example.com/not-a-real-href">decoy</a>
    <a data-href="https://example.com/decoy" href="https://example.com/real">both</a>
  `;
  assert.deepEqual(extractAnchorUrls(html), ['https://example.com/real']);
});

test('extractAnchorUrls handles href after other attributes and across lines', () => {
  const html = `<a
      class="ref-link overlay"
      target="_blank"
      href="https://example.com/multiline"
      rel="noopener">x</a>`;
  assert.deepEqual(extractAnchorUrls(html), ['https://example.com/multiline']);
});

test('normalizeUrl lowercases scheme/host and equates bare origin with trailing slash', () => {
  assert.equal(normalizeUrl('HTTPS://Example.com'), normalizeUrl('https://example.com/'));
});

test('normalizeUrl leaves an unparseable string verbatim', () => {
  assert.equal(normalizeUrl('not a url'), 'not a url');
});

test('diffLinks reports missing expected URLs', () => {
  const found = ['https://github.com/manusa/yakd'];
  const expected = ['https://github.com/manusa/yakd', 'https://example.com/does-not-exist'];
  const {missing, extra} = diffLinks(found, expected);
  assert.deepEqual(missing, ['https://example.com/does-not-exist']);
  assert.deepEqual(extra, []);
});

test('diffLinks reports extra URLs found beyond the expected set', () => {
  const found = ['https://github.com/manusa/yakd', 'https://github.com/manusa/extra'];
  const expected = ['https://github.com/manusa/yakd'];
  const {missing, extra} = diffLinks(found, expected);
  assert.deepEqual(missing, []);
  assert.deepEqual(extra, ['https://github.com/manusa/extra']);
});

test('diffLinks treats a bare origin and its trailing-slash form as equal', () => {
  // Chromium may store https://blog.marcnuri.com as https://blog.marcnuri.com/
  const found = ['https://blog.marcnuri.com/'];
  const expected = ['https://blog.marcnuri.com'];
  const {missing, extra} = diffLinks(found, expected);
  assert.deepEqual(missing, []);
  assert.deepEqual(extra, []);
});

test('diffLinks returns empty missing/extra when sets match', () => {
  const urls = ['https://a.test', 'https://b.test'];
  const {missing, extra} = diffLinks(urls, urls);
  assert.deepEqual(missing, []);
  assert.deepEqual(extra, []);
});
