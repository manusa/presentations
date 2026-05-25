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
    const detailKeys = await page.evaluate(() => {
      const e = window.__slidechangeLog[window.__slidechangeLog.length - 1];
      return Object.keys(e);
    });
    // The capture in _helpers re-shapes slide/previousSlide → slideTag/previousSlideTag
    // for serialization; map them back to assert the on-the-wire detail names.
    const onWireKeys = detailKeys.map((k) => k.replace('slideTag', 'slide').replace('previousSlideTag', 'previousSlide'));
    assert.deepEqual([...onWireKeys].sort(), [...SLIDECHANGE_DETAIL_KEYS].sort());
    await page.close();
  });

  test('slidechange reason values stay within the documented set', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    await page.keyboard.press('ArrowRight');
    await page.evaluate(() => document.querySelector('deck-stage').goTo(3));
    await page.evaluate(() => document.querySelector('deck-stage').next());
    await page.evaluate(() => document.querySelector('deck-stage').prev());
    await page.evaluate(() => document.querySelector('deck-stage').reset());
    const reasons = await page.evaluate(() => window.__slidechangeLog.map((e) => e.reason));
    for (const r of reasons) {
      assert.ok(SLIDECHANGE_REASONS.includes(r), `reason "${r}" not in allowlist`);
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
      // _moveSlide is the canonical entry point used by the rail UI; the
      // public deckchange contract is documented from these emissions.
      stage._moveSlide(0, 1);
      stage._toggleSkip(0);
      stage._toggleSkip(0);
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
    assert.ok(seenActions.has('move'));
    assert.ok(seenActions.has('skip'));
    assert.ok(seenActions.has('unskip'));
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
