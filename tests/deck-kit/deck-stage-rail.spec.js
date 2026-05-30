'use strict';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { startServer, bootDeck } = require('./_helpers');

describe('deck-stage thumbnail rail', () => {
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

  test('default (no attribute) renders the rail', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const railDisplay = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const rail = stage.shadowRoot.querySelector('.rail');
      return rail && getComputedStyle(rail).display;
    });
    assert.notEqual(railDisplay, 'none', 'rail should render by default');
    await page.close();
  });

  test('no-rail attribute hides the rail', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck-norail.html'));
    const railDisplay = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const rail = stage.shadowRoot.querySelector('.rail');
      return rail && getComputedStyle(rail).display;
    });
    assert.equal(railDisplay, 'none');
    await page.close();
  });

  test('data-deck-present-skip excludes a slide from keyboard nav while presenting', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck-skip.html'));
    // Drive presenting via the omelette source (no real fullscreen in headless).
    await page.evaluate(() => {
      const s = document.querySelector('deck-stage');
      s._omelettePresenting = true;
      s._syncPresenting();
    });
    // Slides: 0, 1, 2(present-skip), 3, 4. ArrowRight from 1 lands on 3, not 2.
    await page.keyboard.press('ArrowRight'); // 0 → 1
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 1);
    await page.keyboard.press('ArrowRight'); // 1 → 3 (skipping 2)
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 3);
    await page.keyboard.press('ArrowLeft'); // 3 → 1 (skipping 2)
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 1);
    await page.close();
  });

  test('data-deck-present-skip thumb gets data-skip in the rail', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck-skip.html'));
    const skipped = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const thumbs = stage.shadowRoot.querySelectorAll('.rail .thumb');
      return Array.from(thumbs).map((t) => t.hasAttribute('data-skip'));
    });
    // Slide indices: 0, 1, 2(present-skip), 3, 4 → expect [false, false, true, false, false]
    assert.deepEqual(skipped, [false, false, true, false, false]);
    await page.close();
  });

  test('rail width persists to localStorage on resize drag', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    // Pre-condition: no width has been written yet.
    const pre = await page.evaluate(() => localStorage.getItem('deck-stage.railWidth'));
    assert.equal(pre, null);
    // Synthesize the actual drag the user performs on `.rail-resize`:
    // pointerdown → pointermove(s) → pointerup. The production
    // pointerdown handler attaches the pointermove/pointerup listeners,
    // and pointerup writes the persisted width. This is the real
    // production code path — _setRailWidth + the storage write inside
    // the captured pointerup handler — without manually setting state.
    const stored = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const resize = stage.shadowRoot.querySelector('.rail-resize');
      const fire = (type, x) => resize.dispatchEvent(new PointerEvent(type, {
        pointerId: 1, clientX: x, clientY: 0, bubbles: true, cancelable: true,
      }));
      fire('pointerdown', 240);
      fire('pointermove', 280);
      fire('pointermove', 320);
      fire('pointerup', 320);
      return localStorage.getItem('deck-stage.railWidth');
    });
    assert.equal(stored, '320', 'pointerup handler should write the final width');
    await page.close();
  });

  test('localStorage railWidth is applied on init', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'), {
      storage: { 'deck-stage.railWidth': '240' },
    });
    const railPx = await page.evaluate(() => document.querySelector('deck-stage')._railPx);
    assert.equal(railPx, 240);
    await page.close();
  });

  test('localStorage railVisible=0 hides the rail on init', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'), {
      storage: { 'deck-stage.railVisible': '0' },
    });
    const visible = await page.evaluate(() => document.querySelector('deck-stage')._railVisible);
    assert.equal(visible, false);
    await page.close();
  });

  test('reorder dispatches deckchange with action=move', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const moveEvent = await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      return new Promise((resolve) => {
        stage.addEventListener('deckchange', (e) => {
          if (e.detail.action === 'move') resolve(e.detail);
        }, { once: true });
        stage._moveSlide(0, 2);
      });
    });
    assert.equal(moveEvent.action, 'move');
    assert.equal(moveEvent.from, 0);
    assert.equal(moveEvent.to, 2);
    await page.close();
  });
});
