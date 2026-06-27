'use strict';

// Build-less syntax highlighting (issue #59) — per-deck glue, NOT part of the
// frozen deck-kit contract, so this lives under tests/highlight/ rather than
// tests/deck-kit/. It proves the vendored highlight.js + the reference init
// snippet against the self-contained fixture under ./fixtures/.
//
// Reuses the deck-kit test harness (startServer serves REPO_ROOT, bootDeck
// waits for <deck-stage> upgrade + the initial slidechange) so the fixture is
// driven exactly like a real deck.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { chromium } = require('playwright');
const { startServer, bootDeck } = require('../deck-kit/_helpers');

const FIXTURE_PATH = path.join(__dirname, 'fixtures', 'index.html');

describe('build-less syntax highlighting (fixture)', () => {
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

  const fixtureUrl = () => `${server.url}/tests/highlight/fixtures/index.html`;

  test('language-java block renders hljs token spans', async () => {
    const page = await browser.newPage();
    await bootDeck(page, fixtureUrl());

    const info = await page.evaluate(() => {
      const code = document.querySelector('#plain-code');
      return {
        present: !!code,
        classes: code ? Array.from(code.classList) : [],
        tokenSpanCount: code
          ? code.querySelectorAll('span[class^="hljs-"], span[class*=" hljs-"]').length
          : 0,
      };
    });

    assert.ok(info.present, '#plain-code exists');
    assert.ok(info.classes.includes('hljs'), 'code gets the `hljs` class after highlighting');
    assert.ok(info.classes.includes('language-java'), 'authoring class `language-java` is preserved');
    assert.ok(info.tokenSpanCount >= 1, `>=1 hljs-* token span (got ${info.tokenSpanCount})`);

    await page.close();
  });

  test('indentation / leading whitespace is preserved', async () => {
    const page = await browser.newPage();
    await bootDeck(page, fixtureUrl());

    const res = await page.evaluate(() => {
      const code = document.querySelector('#plain-code');
      const cs = getComputedStyle(code);
      return {
        // The fixture indents `@Test` with exactly four spaces. highlight.js
        // wraps tokens in spans but never rewrites whitespace text nodes, so
        // the concatenated textContent must still carry that indentation.
        keepsIndent: code.textContent.includes('\n    @Test'),
        whiteSpace: cs.whiteSpace,
      };
    });

    assert.ok(res.keepsIndent, 'four-space indentation survives highlighting');
    assert.ok(/^pre/.test(res.whiteSpace), `code renders with white-space: pre* (got ${res.whiteSpace})`);

    await page.close();
  });

  test('code renders >= 28px (mono legibility floor) via a token', async () => {
    // Fixture-scoped: this guards that highlighting (adding the .hljs class)
    // doesn't drop the mono size below the floor, and that the size comes from
    // the --type-mono token. It does NOT guarantee a real deck sizes its code
    // correctly — that's what `audit:fit --floor 28` covers per-deck.
    const page = await browser.newPage();
    await bootDeck(page, fixtureUrl());

    const fontPx = await page.evaluate(() => {
      const code = document.querySelector('#plain-code');
      return parseFloat(getComputedStyle(code).fontSize);
    });

    assert.ok(fontPx >= 28, `computed font-size >= 28px (got ${fontPx}px)`);

    await page.close();
  });

  test('non-common vendored grammars register and highlight', async () => {
    // java rides in on the prebuilt common bundle; the four non-common curated
    // grammars are separate vendored .min.js files. Assert they actually loaded,
    // self-registered, AND highlight a real block — a wrong path or a registration
    // API change would otherwise pass every java-only test.
    const page = await browser.newPage();
    await bootDeck(page, fixtureUrl());

    const res = await page.evaluate(() => {
      const want = ['dockerfile', 'groovy', 'http', 'properties'];
      const docker = document.querySelector('#dockerfile-code');
      return {
        registered: want.filter((l) => window.hljs.getLanguage(l)).sort(),
        dockerHighlighted: docker.classList.contains('hljs'),
        dockerTokenSpans: docker.querySelectorAll('span[class^="hljs-"], span[class*=" hljs-"]').length,
      };
    });

    assert.deepEqual(res.registered, ['dockerfile', 'groovy', 'http', 'properties'],
      'all four non-common grammars self-registered from their vendored .min.js');
    assert.ok(res.dockerHighlighted, 'language-dockerfile block is highlighted (round-trips through highlightElement)');
    assert.ok(res.dockerTokenSpans >= 1, `dockerfile block has hljs-* spans (got ${res.dockerTokenSpans})`);

    await page.close();
  });

  test('no auto-detect: untagged and unregistered-language blocks are left untouched', async () => {
    const page = await browser.newPage();
    await bootDeck(page, fixtureUrl());

    const res = await page.evaluate(() => {
      const probe = (sel) => {
        const code = document.querySelector(sel);
        return {
          hasHljsClass: code.classList.contains('hljs'),
          isMarkedHighlighted: code.hasAttribute('data-highlighted'),
          tokenSpanCount: code.querySelectorAll('span[class^="hljs-"]').length,
          text: code.textContent,
        };
      };
      return { untagged: probe('#untagged-code'), bogus: probe('#bogus-code') };
    });

    assert.equal(res.untagged.hasHljsClass, false, 'untagged block is not given the hljs class');
    assert.equal(res.untagged.isMarkedHighlighted, false, 'untagged block is not marked data-highlighted');
    assert.equal(res.untagged.tokenSpanCount, 0, 'untagged block has no hljs-* token spans');
    assert.equal(res.untagged.text, 'plain text, no language tag', 'untagged text is unchanged');

    // A typo'd/unregistered `language-bogus` must NOT fall through to hljs
    // auto-detection — the init guard skips it, so it stays plain.
    assert.equal(res.bogus.hasHljsClass, false, 'unregistered language-bogus block is not highlighted');
    assert.equal(res.bogus.isMarkedHighlighted, false, 'unregistered block is not marked data-highlighted');
    assert.equal(res.bogus.tokenSpanCount, 0, 'unregistered block has no hljs-* token spans (no auto-detect)');

    await page.close();
  });

  test('composes with #56 reveals: highlighted at load, revealed on step 1', async () => {
    const page = await browser.newPage();
    await bootDeck(page, fixtureUrl());

    // Navigate to the reveal section (index 3, 0-based) and rest at step 0.
    // Wait on the runtime state, not a fixed sleep, so the test stays correct
    // even if a future fixture adds a reveal transition.
    await page.evaluate(() => document.querySelector('deck-stage').goTo(3));
    await page.waitForFunction(() => {
      const s = document.querySelector('deck-stage > section[data-label="Reveal"]');
      return s && s.hasAttribute('data-deck-active') && s.getAttribute('data-step') === '0';
    });

    const atStep0 = await page.evaluate(() => {
      const pre = document.querySelector('#reveal-pre');
      const code = document.querySelector('#reveal-code');
      return {
        // Highlighting runs once on load, independent of stepping — so the
        // code is already tokenized even while its <pre> is hidden.
        highlighted: code.classList.contains('hljs'),
        tokenSpanCount: code.querySelectorAll('span[class^="hljs-"], span[class*=" hljs-"]').length,
        revealed: pre.hasAttribute('data-revealed'),
        opacity: parseFloat(getComputedStyle(pre).opacity),
      };
    });

    assert.ok(atStep0.highlighted, 'reveal code is highlighted at load (step 0)');
    assert.ok(atStep0.tokenSpanCount >= 1, 'reveal code has hljs-* spans at step 0');
    assert.equal(atStep0.revealed, false, 'reveal <pre> is hidden at step 0 (data-revealed absent)');
    assert.equal(atStep0.opacity, 0, 'reveal <pre> opacity is 0 at step 0');

    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() =>
      document.querySelector('deck-stage > section[data-label="Reveal"]').getAttribute('data-step') === '1');

    const atStep1 = await page.evaluate(() => {
      const pre = document.querySelector('#reveal-pre');
      const code = document.querySelector('#reveal-code');
      return {
        step: document.querySelector('deck-stage > section[data-label="Reveal"]').getAttribute('data-step'),
        revealed: pre.hasAttribute('data-revealed'),
        opacity: parseFloat(getComputedStyle(pre).opacity),
        stillHighlighted: code.classList.contains('hljs'),
        tokenSpanCount: code.querySelectorAll('span[class^="hljs-"], span[class*=" hljs-"]').length,
      };
    });

    assert.equal(atStep1.step, '1', 'ArrowRight advanced to step 1');
    assert.ok(atStep1.revealed, 'reveal <pre> is revealed at step 1 (data-revealed present)');
    assert.equal(atStep1.opacity, 1, 'reveal <pre> opacity is 1 at step 1');
    assert.ok(atStep1.stillHighlighted, 'reveal code is still highlighted at step 1');
    assert.ok(atStep1.tokenSpanCount >= 1, 'reveal code still has hljs-* spans at step 1');

    await page.close();
  });

  test('works offline / file:// (no network, no CDN)', async () => {
    // The whole point of vendoring: open the fixture straight off disk with no
    // server and highlighting must still run. Block the network to prove no CDN
    // dependency leaked back in.
    let netAttempts = 0;
    const context = await browser.newContext();
    await context.route('http://**', (r) => { netAttempts++; r.abort(); });
    await context.route('https://**', (r) => { netAttempts++; r.abort(); });
    const page = await context.newPage();

    await page.goto(pathToFileURL(FIXTURE_PATH).href, { waitUntil: 'load' });
    await page.waitForFunction(() => {
      const code = document.querySelector('#plain-code');
      return code && code.classList.contains('hljs');
    }, { timeout: 10_000 });

    const tokenSpanCount = await page.evaluate(
      () => document.querySelector('#plain-code').querySelectorAll('span[class^="hljs-"]').length
    );
    assert.ok(tokenSpanCount >= 1, `highlighting works from file:// with network blocked (got ${tokenSpanCount} spans)`);
    // Not just "doesn't need the network" — it attempts none at all (no CDN
    // font/script/telemetry leaked in). A non-critical CDN call would otherwise
    // be silently aborted and still pass the highlight assertion above.
    assert.equal(netAttempts, 0, `fixture made no http(s) requests (got ${netAttempts})`);

    await context.close();
  });
});
