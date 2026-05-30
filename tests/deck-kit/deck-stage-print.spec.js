'use strict';

// Print contract: deck-stage's @media print rules lay every slide out
// in document flow so the browser paginates one page per slide.
//
// Step-aware expansion (one section with data-step-max="N" becoming N+1
// PDF pages) is a contract honored by scripts/export-pdf.js — it DOM-clones
// the section at data-step="0..N" before render. deck-stage itself only
// guarantees one page per visible slide; that step-expansion contract is
// thus enforced by export-pdf, not by deck-stage's print CSS.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { startServer, bootDeck } = require('./_helpers');

describe('deck-stage print layout', () => {
  let server;
  let browser;

  before(async () => {
    server = await startServer();
    browser = await chromium.launch();
  });

  after(async () => {
    if (browser) await browser.close();
    if (server) await server.close();
  });

  async function withPrintMedia(fixture) {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture(fixture));
    await page.emulateMedia({ media: 'print' });
    return page;
  }

  test('every non-last slide carries break-after: page under print media', async () => {
    const page = await withPrintMedia('minimal-deck.html');
    const breakAfter = await page.evaluate(() => {
      const slides = document.querySelectorAll('deck-stage > section');
      return Array.from(slides).map((s) => getComputedStyle(s).breakAfter);
    });
    // First N-1 should be 'page'; the last should be 'auto' to avoid a
    // trailing blank sheet. Every slide prints, so :last-child is the
    // genuine final page.
    for (let i = 0; i < breakAfter.length - 1; i++) {
      assert.equal(breakAfter[i], 'page', `slide ${i} should break-after: page`);
    }
    assert.equal(breakAfter[breakAfter.length - 1], 'auto', 'last slide should not force a trailing page break');
    await page.close();
  });

  test('data-deck-present-skip slides still print (not display:none)', async () => {
    const page = await withPrintMedia('minimal-deck-skip.html');
    const display = await page.evaluate(() => {
      const ps = document.querySelector('deck-stage > section[data-deck-present-skip]');
      return getComputedStyle(ps).display;
    });
    // Present-skip drops a slide from live nav, not from the deck — it must
    // still paginate into the PDF handout.
    assert.notEqual(display, 'none');
    await page.close();
  });

  test('print PDF emits one page per slide (present-skip slides included)', async () => {
    const page = await withPrintMedia('minimal-deck-skip.html');
    // 5 sections, 1 present-skip → all 5 print.
    const pdf = await page.pdf({ format: 'A4', printBackground: false });
    // Count "/Type /Page" entries in the PDF stream (rough but reliable).
    const text = pdf.toString('latin1');
    const matches = text.match(/\/Type\s*\/Page[^s]/g) || [];
    assert.equal(matches.length, 5, `expected 5 pages, got ${matches.length}`);
    await page.close();
  });

  test('chrome (rail, overlay, tapzones) is hidden in print media', async () => {
    const page = await withPrintMedia('minimal-deck.html');
    const hidden = await page.evaluate(() => {
      const root = document.querySelector('deck-stage').shadowRoot;
      const selectors = ['.rail', '.overlay', '.tapzones'];
      return selectors.map((s) => {
        const el = root.querySelector(s);
        return el ? getComputedStyle(el).display : 'missing';
      });
    });
    for (const d of hidden) assert.equal(d, 'none');
    await page.close();
  });
});
