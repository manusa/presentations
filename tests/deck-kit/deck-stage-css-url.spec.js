'use strict';

// Issue #62 — rail thumbnails adopt a CONSTRUCTED CSSStyleSheet whose base URL
// is the document, not each originating .css file. A relative url('../assets/…')
// in an external deck stylesheet therefore re-resolves against the document
// directory and 404s inside the thumbnails. _snapshotAuthorCss must rewrite
// relative url() to absolute against each source sheet's own href — while
// leaving fragment refs and (escaped-quote) data: URIs untouched.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { startServer, bootDeck } = require('./_helpers');

describe('deck-stage author-CSS url() rebasing', () => {
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

  test('CSS-relative url() background resolves in the thumbnail (no 404)', async () => {
    const page = await browser.newPage();
    const failed = [];
    page.on('response', (r) => { if (r.status() >= 400) failed.push(r.url()); });
    await bootDeck(page, server.fixture('css-url-bg/index.html'));

    // Force every thumb to materialize deterministically rather than depending
    // on the IntersectionObserver firing in headless.
    const { relBg, dataBg } = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      (stage._thumbs || []).forEach((t) => stage._materialize(t));
      return {
        relBg: getComputedStyle(stage._thumbs[0].clone).backgroundImage,
        dataBg: getComputedStyle(stage._thumbs[1].clone).backgroundImage,
      };
    });
    // Let the thumbnail's background fetch settle so a wrong-path 404 is seen.
    await page.waitForLoadState('networkidle');

    assert.match(
      relBg, /\/css-url-bg\/assets\/bg\.svg/,
      'thumb background must resolve against the stylesheet href',
    );
    assert.doesNotMatch(
      relBg, /\/fixtures\/assets\/bg\.svg/,
      'thumb background must NOT re-resolve against the document directory',
    );
    // Finding 1 regression: a data: URI whose serialized cssText carries
    // backslash-escaped inner quotes (Chromium's inline-SVG form) must pass
    // through untouched, not get rebased against the stylesheet dir.
    assert.match(
      dataBg, /^url\("data:image\/svg\+xml/,
      'data: URI background must be preserved, not rebased',
    );
    assert.doesNotMatch(
      dataBg, /css-url-bg\/styles/,
      'data: URI background must NOT be rebased against the stylesheet dir',
    );
    assert.equal(
      failed.filter((u) => /bg\.svg/.test(u)).length, 0,
      `no 404 for the background asset; failed responses: ${failed.join(', ') || '(none)'}`,
    );
    await page.close();
  });

  test('_rewriteCssUrls rebases relative refs and preserves fragment/data/absolute', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const out = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const base = 'https://example.com/deck/styles/deck.css';
      const docBase = 'https://example.com/deck/index.html';
      const rw = (css, b) => stage._rewriteCssUrls(css, b || base);
      return {
        dq: rw('.a{background-image:url("../img/x.png")}'),
        sq: rw(".b{background-image:url('../img/y.png')}"),
        uq: rw('.c{background-image:url(../img/z.png)}'),
        sameDir: rw('.h{background-image:url(sib.png)}'),
        multi: rw('.i{background-image:url(a.png),url(b.png)}'),
        // Inline <style> has href === null → _snapshotAuthorCss passes
        // document.baseURI as the base; relative refs rebase against it.
        inlineDoc: rw('.k{background-image:url(scene.png)}', docBase),
        frag: rw('.d{clip-path:url("#clip")}'),
        data: rw('.e{background-image:url("data:image/png;base64,AAAA")}'),
        // Chromium serializes inline-SVG data: URIs with backslash-escaped "
        dataEsc: rw('.m{background-image:url("data:image/svg+xml;utf8,<svg fill=\\"red\\"></svg>")}'),
        abs: rw('.f{background-image:url("https://cdn.example.com/a.png")}'),
        rootAbs: rw('.g{background-image:url("/root.png")}'),
        emptyCss: rw(''),
        emptyUrl: rw('.n{background-image:url("")}'),
      };
    });
    await page.close();

    assert.match(out.dq, /url\("https:\/\/example\.com\/deck\/img\/x\.png"\)/);
    assert.match(out.sq, /url\("https:\/\/example\.com\/deck\/img\/y\.png"\)/);
    assert.match(out.uq, /url\("https:\/\/example\.com\/deck\/img\/z\.png"\)/);
    // Same-directory (no ../) relative ref rebases against the stylesheet dir.
    assert.match(out.sameDir, /url\("https:\/\/example\.com\/deck\/styles\/sib\.png"\)/);
    // Both url() in one declaration rebase (the /g flag walks every token).
    assert.match(
      out.multi,
      /url\("https:\/\/example\.com\/deck\/styles\/a\.png"\),url\("https:\/\/example\.com\/deck\/styles\/b\.png"\)/,
    );
    // Inline <style> (document base) rebases to the document directory.
    assert.match(out.inlineDoc, /url\("https:\/\/example\.com\/deck\/scene\.png"\)/);
    // Same-document fragment refs (SVG filter/mask) must stay relative.
    assert.match(out.frag, /url\("#clip"\)/);
    // data: URIs are already absolute — untouched.
    assert.match(out.data, /url\("data:image\/png;base64,AAAA"\)/);
    // Escaped-quote data: URI preserved verbatim, NOT rebased (#62 regression).
    assert.match(out.dataEsc, /url\("data:image\/svg\+xml/);
    assert.doesNotMatch(out.dataEsc, /example\.com/);
    // Absolute http(s) refs pass through unchanged.
    assert.match(out.abs, /url\("https:\/\/cdn\.example\.com\/a\.png"\)/);
    // Root-absolute rebases to the origin root (resolves identically).
    assert.match(out.rootAbs, /url\("https:\/\/example\.com\/root\.png"\)/);
    // Guards: empty input and empty url() are no-ops.
    assert.equal(out.emptyCss, '');
    assert.match(out.emptyUrl, /url\(""\)/);
  });
});
