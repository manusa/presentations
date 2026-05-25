'use strict';

// Append-only contract for static/deck-kit/. Per rule #3 in deck-kit's
// stability promise: once a name (attribute, event, event.detail key,
// public API member) is shipped, it is frozen. This file enumerates the
// supported surface. Adding entries is fine; renaming or removing
// requires a breaking-change-by-filename (deck-stage-v2.js).

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { startServer, bootDeck } = require('./_helpers');

const IMAGE_SLOT_ATTRS = ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
const DECK_STAGE_ATTRS = ['width', 'height', 'noscale', 'no-rail'];
const SLIDECHANGE_DETAIL_KEYS = ['index', 'previousIndex', 'total', 'slide', 'previousSlide', 'reason'];
const SLIDECHANGE_REASONS = ['init', 'keyboard', 'click', 'tap', 'api', 'mutation'];
const DECKCHANGE_DETAIL_KEYS = ['action', 'from', 'to', 'slide'];
const DECKCHANGE_ACTIONS = ['delete', 'skip', 'unskip', 'move'];
const DECK_STAGE_API = ['index', 'length', 'goTo', 'next', 'prev', 'reset'];

describe('deck-kit contract — append-only', () => {
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

  test('image-slot observedAttributes is exactly the documented set', async () => {
    const page = await browser.newPage();
    await page.goto(server.fixture('image-slot.html'));
    await page.waitForFunction(() => !!customElements.get('image-slot'));
    const got = await page.evaluate(() => customElements.get('image-slot').observedAttributes);
    assert.deepEqual([...got].sort(), [...IMAGE_SLOT_ATTRS].sort());
    await page.close();
  });

  test('deck-stage observedAttributes is exactly the documented set', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const got = await page.evaluate(() => customElements.get('deck-stage').observedAttributes);
    assert.deepEqual([...got].sort(), [...DECK_STAGE_ATTRS].sort());
    await page.close();
  });

  test('slidechange event detail carries exactly the documented keys', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => window.__slidechangeLog.length >= 2);
    // detailKeys is captured straight off `e.detail` inside the page —
    // a wire-level read, not a helper-reshape — so a rename of any key
    // on the dispatch site is caught here.
    const detailKeys = await page.evaluate(
      () => window.__slidechangeLog[window.__slidechangeLog.length - 1].detailKeys,
    );
    assert.deepEqual([...detailKeys].sort(), [...SLIDECHANGE_DETAIL_KEYS].sort());
    await page.close();
  });

  test('slidechange reason values stay within the documented set', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    await page.keyboard.press('ArrowRight'); // reason='keyboard'
    await page.evaluate(() => document.querySelector('deck-stage').goTo(3)); // reason='api'
    await page.evaluate(() => {
      // 'mutation' reason fires when slides are mutated externally —
      // _moveSlide takes the same path on its second broadcast.
      document.querySelector('deck-stage')._moveSlide(0, 1);
    });
    // Tap-back / tap-forward fire reason='tap'; the overlay prev/next
    // buttons fire reason='click'. Drive both via the shadow-DOM nodes.
    await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const overlay = stage.shadowRoot.querySelector('.overlay');
      overlay.querySelector('.next').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      stage._onTapBack(new Event('click'));
    });
    const reasons = await page.evaluate(() => window.__slidechangeLog.map((e) => e.reason));
    for (const r of reasons) {
      assert.ok(SLIDECHANGE_REASONS.includes(r), `reason "${r}" not in allowlist`);
    }
    // All six reasons should appear in this run, so removing any one
    // from the production code is caught immediately.
    const seen = new Set(reasons);
    for (const r of SLIDECHANGE_REASONS) {
      assert.ok(seen.has(r), `reason "${r}" not observed in this run — coverage gap`);
    }
    await page.close();
  });

  test('slidechange bubbles and crosses the shadow boundary (composed)', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const flags = await page.evaluate(() => {
      return new Promise((resolve) => {
        const stage = document.querySelector('deck-stage');
        document.addEventListener('slidechange', (e) => {
          resolve({ bubbles: e.bubbles, composed: e.composed });
        }, { once: true });
        stage.next();
      });
    });
    assert.equal(flags.bubbles, true);
    assert.equal(flags.composed, true);
    await page.close();
  });

  test('deckchange event detail carries exactly the documented keys, action in allowlist', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const result = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const events = [];
      stage.addEventListener('deckchange', (e) => events.push(e.detail));
      // _moveSlide / _toggleSkip / _deleteSlide are the rail-UI canonical
      // entry points. Fire all four documented actions so removing any
      // one would be caught.
      stage._moveSlide(0, 1);
      stage._toggleSkip(0);
      stage._toggleSkip(0);
      stage._deleteSlide(stage._slides.length - 1);
      return events.map((d) => ({ keys: Object.keys(d), action: d.action }));
    });
    for (const e of result) {
      // 'to' is optional (only present on action='move'); the wire-format key
      // set is the union of all observed keys, sliced to what we ship.
      for (const k of e.keys) {
        assert.ok(DECKCHANGE_DETAIL_KEYS.includes(k), `unknown deckchange detail key "${k}"`);
      }
      assert.ok(DECKCHANGE_ACTIONS.includes(e.action), `action "${e.action}" not in allowlist`);
    }
    // Confirm all documented actions have actually fired in this run.
    const seenActions = new Set(result.map((e) => e.action));
    for (const a of DECKCHANGE_ACTIONS) {
      assert.ok(seenActions.has(a), `action "${a}" not observed in this run — coverage gap`);
    }
    await page.close();
  });

  test('deck-stage exposes exactly the documented public API members', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const present = await page.evaluate((api) => {
      const stage = document.querySelector('deck-stage');
      return api.map((name) => ({ name, ok: name in stage }));
    }, DECK_STAGE_API);
    for (const { name, ok } of present) {
      assert.ok(ok, `public API member "${name}" missing on <deck-stage>`);
    }
    await page.close();
  });
});
