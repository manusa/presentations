#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {extractPdfUris, extractAnchorUrls, diffLinks} = require('./lib/pdf-links');

const USAGE = `Usage: npm run test:pdf-links -- <pdf> [<expected>]

  <pdf>        Path to an exported PDF (produced by \`npm run export:pdf\`).
  <expected>   Optional source of truth for the anchor URLs that must survive:
                 • a deck directory or index.html  → expected = its <a href> anchors
                 • a .json file (array of URL strings) → expected = that list

Modes:
  test:pdf-links -- <pdf>
      Print every URL found in the PDF, sorted. Exit 0. (inspection)

  test:pdf-links -- <pdf> static/presentations/2026-devtalks-romania/
      Derive the expected URLs live from the deck's index.html <a> anchors and
      assert every one survived into the PDF. Exit 1 on any "missing:".

  test:pdf-links -- <pdf> expected-pdf-links.json
      Compare against an explicit JSON array of URLs. Exit 1 on any "missing:".

Extra URLs found in the PDF beyond the expected set are reported as a warning
but do not fail the check (matches the export pipeline's own guard).

Examples:
  npm run export:pdf -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ /tmp/devtalks-2026.pdf
  npm run test:pdf-links -- /tmp/devtalks-2026.pdf static/presentations/2026-devtalks-romania/
`;

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
  console.log(USAGE);
  process.exit(args.length === 0 ? 1 : 0);
}
if (args.length > 2) {
  console.error('Expected at most two arguments: <pdf> [<expected>]');
  process.exit(1);
}

const [pdfPath, expectedPath] = args;

if (!fs.existsSync(pdfPath)) {
  console.error(`PDF not found: ${pdfPath}`);
  process.exit(1);
}

/**
 * Resolve the expected anchor URLs from the second argument:
 *   - a .json file → parse the array verbatim
 *   - a directory  → read <dir>/index.html and extract its <a> anchors
 *   - an .html file → extract its <a> anchors
 */
function loadExpected(p) {
  if (p.toLowerCase().endsWith('.json')) {
    const parsed = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!Array.isArray(parsed)) {
      throw new Error(`Expected-list JSON must be an array of URL strings: ${p}`);
    }
    return [...new Set(parsed)].sort();
  }
  let htmlPath = p;
  if (fs.statSync(p).isDirectory()) {
    htmlPath = path.join(p, 'index.html');
  }
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`No index.html to derive expected anchors from: ${htmlPath}`);
  }
  return extractAnchorUrls(fs.readFileSync(htmlPath, 'utf8'));
}

(async () => {
  const found = await extractPdfUris(fs.readFileSync(pdfPath));

  if (!expectedPath) {
    if (found.length === 0) {
      console.log('No URLs found in the PDF.');
    } else {
      found.forEach((u) => console.log(u));
    }
    process.exit(0);
  }

  const expected = loadExpected(expectedPath);
  const {missing, extra} = diffLinks(found, expected);

  console.log(`Found ${found.length} URL${found.length === 1 ? '' : 's'} in ${pdfPath}`);
  console.log(`Expected ${expected.length} anchor URL${expected.length === 1 ? '' : 's'} from ${expectedPath}`);

  if (extra.length) {
    console.warn(`\n⚠ ${extra.length} extra URL${extra.length === 1 ? '' : 's'} in the PDF (not in expected set):`);
    extra.forEach((u) => console.warn(`  extra: ${u}`));
  }

  if (missing.length) {
    console.error(`\n✗ ${missing.length} expected URL${missing.length === 1 ? '' : 's'} missing from the PDF:`);
    missing.forEach((u) => console.error(`  missing: ${u}`));
    process.exit(1);
  }

  console.log(`\n✓ All ${expected.length} expected anchor URLs are present in the PDF.`);
  process.exit(0);
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
