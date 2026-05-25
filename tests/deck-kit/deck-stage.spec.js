'use strict';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { startServer, bootDeck } = require('./_helpers');

describe('deck-stage navigation', () => {
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

  async function freshDeck() {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    return page;
  }

  async function currentIndex(page) {
    return page.evaluate(() => document.querySelector('deck-stage').index);
  }

  test('ArrowRight advances one slide', async () => {
    const page = await freshDeck();
    await page.keyboard.press('ArrowRight');
    assert.equal(await currentIndex(page), 1);
    await page.close();
  });

  test('ArrowLeft retreats one slide', async () => {
    const page = await freshDeck();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await currentIndex(page), 1);
    await page.close();
  });

  test('PageDown is an alias for ArrowRight', async () => {
    const page = await freshDeck();
    await page.keyboard.press('PageDown');
    assert.equal(await currentIndex(page), 1);
    await page.close();
  });

  test('PageUp is an alias for ArrowLeft', async () => {
    const page = await freshDeck();
    await page.evaluate(() => document.querySelector('deck-stage').goTo(3));
    await page.keyboard.press('PageUp');
    assert.equal(await currentIndex(page), 2);
    await page.close();
  });

  test('Space advances', async () => {
    const page = await freshDeck();
    await page.keyboard.press('Space');
    assert.equal(await currentIndex(page), 1);
    await page.close();
  });

  test('Home jumps to slide 0', async () => {
    const page = await freshDeck();
    await page.evaluate(() => document.querySelector('deck-stage').goTo(4));
    await page.keyboard.press('Home');
    assert.equal(await currentIndex(page), 0);
    await page.close();
  });

  test('End jumps to last slide', async () => {
    const page = await freshDeck();
    await page.keyboard.press('End');
    assert.equal(await currentIndex(page), 5);
    await page.close();
  });

  test('R resets to slide 0', async () => {
    const page = await freshDeck();
    await page.evaluate(() => document.querySelector('deck-stage').goTo(3));
    await page.keyboard.press('r');
    assert.equal(await currentIndex(page), 0);
    await page.close();
  });

  test('number keys jump (1 → 0, 2 → 1, 0 → 9-clamped)', async () => {
    const page = await freshDeck();
    await page.keyboard.press('3');
    assert.equal(await currentIndex(page), 2);
    await page.keyboard.press('1');
    assert.equal(await currentIndex(page), 0);
    // 0 maps to slide 10 (index 9); deck has 6 slides → no movement
    await page.keyboard.press('5');
    const before = await currentIndex(page);
    await page.keyboard.press('0');
    const after = await currentIndex(page);
    assert.equal(after, before, '0 key with index 9 > length should be ignored');
    await page.close();
  });

  test('bounds clamp at index 0 (ArrowLeft is a no-op)', async () => {
    const page = await freshDeck();
    const beforeLog = await page.evaluate(() => window.__slidechangeLog.length);
    await page.keyboard.press('ArrowLeft');
    // We don't allow it to flip to -1 or wrap. `_go` calls _flashOverlay
    // but does not push a slidechange event when the index doesn't move.
    assert.equal(await currentIndex(page), 0);
    const afterLog = await page.evaluate(() => window.__slidechangeLog.length);
    assert.equal(afterLog, beforeLog);
    await page.close();
  });

  test('bounds clamp at last index (ArrowRight is a no-op)', async () => {
    const page = await freshDeck();
    await page.keyboard.press('End');
    const beforeLog = await page.evaluate(() => window.__slidechangeLog.length);
    await page.keyboard.press('ArrowRight');
    assert.equal(await currentIndex(page), 5);
    const afterLog = await page.evaluate(() => window.__slidechangeLog.length);
    assert.equal(afterLog, beforeLog);
    await page.close();
  });

  test('slidechange detail carries the right index, previousIndex, total', async () => {
    const page = await freshDeck();
    await page.evaluate(() => document.querySelector('deck-stage').goTo(2));
    const entry = await page.evaluate(() => window.__slidechangeLog[window.__slidechangeLog.length - 1]);
    assert.equal(entry.index, 2);
    assert.equal(entry.total, 6);
    assert.equal(entry.previousIndex, 0);
    assert.equal(entry.slideTag, 'SECTION');
    assert.equal(entry.previousSlideTag, 'SECTION');
    await page.close();
  });

  test('slidechange reason="keyboard" on keypress', async () => {
    const page = await freshDeck();
    await page.keyboard.press('ArrowRight');
    const last = await page.evaluate(() => window.__slidechangeLog[window.__slidechangeLog.length - 1]);
    assert.equal(last.reason, 'keyboard');
    await page.close();
  });

  test('slidechange reason="api" on goTo/next/prev/reset', async () => {
    const page = await freshDeck();
    await page.evaluate(() => document.querySelector('deck-stage').goTo(3));
    await page.evaluate(() => document.querySelector('deck-stage').prev());
    await page.evaluate(() => document.querySelector('deck-stage').next());
    await page.evaluate(() => document.querySelector('deck-stage').reset());
    const apiReasons = await page.evaluate(() =>
      window.__slidechangeLog.filter((e) => e.reason !== 'init').map((e) => e.reason),
    );
    assert.ok(apiReasons.length >= 4);
    for (const r of apiReasons) assert.equal(r, 'api');
    await page.close();
  });

  test('public API: index, length, goTo, next, prev, reset', async () => {
    const page = await freshDeck();
    const initialLen = await page.evaluate(() => document.querySelector('deck-stage').length);
    assert.equal(initialLen, 6);
    await page.evaluate(() => document.querySelector('deck-stage').next());
    assert.equal(await currentIndex(page), 1);
    await page.evaluate(() => document.querySelector('deck-stage').prev());
    assert.equal(await currentIndex(page), 0);
    await page.evaluate(() => document.querySelector('deck-stage').goTo(4));
    assert.equal(await currentIndex(page), 4);
    await page.evaluate(() => document.querySelector('deck-stage').reset());
    assert.equal(await currentIndex(page), 0);
    await page.close();
  });
});
