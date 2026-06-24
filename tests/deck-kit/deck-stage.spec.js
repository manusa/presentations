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

  test('data-step-max never gets clobbered; data-step normalises to 0 on slide change', async () => {
    // data-step-max is author-set markup; deck-stage must never modify
    // it. data-step is owned by deck-stage's step machine: it resets to
    // 0 whenever the slide gains or loses focus (so re-entries replay
    // cleanly). Behavior of the step machine itself lives in
    // contract.spec.js — this test just guards the attribute lifecycle.
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('stepped-deck.html'));
    const state = await page.evaluate(() => {
      const stepped = document.querySelector('section[data-step-max]');
      return {
        stepMax: stepped.getAttribute('data-step-max'),
        step: stepped.getAttribute('data-step'),
        hasStepMax: stepped.hasAttribute('data-step-max'),
        hasStep: stepped.hasAttribute('data-step'),
      };
    });
    assert.equal(state.hasStepMax, true);
    assert.equal(state.hasStep, true);
    assert.equal(state.stepMax, '2');
    assert.equal(state.step, '0');
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(2));
    const after = await page.evaluate(() => {
      const stepped = document.querySelector('section[data-step-max]');
      return { stepMax: stepped.getAttribute('data-step-max'), step: stepped.getAttribute('data-step') };
    });
    assert.equal(after.stepMax, '2', 'data-step-max is author-set and must survive nav');
    assert.equal(after.step, '0', 'data-step resets to 0 on slide leave/enter');
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

// ── Declarative step reveals (data-reveal / -only / -until) ─────────────────
// deck-stage auto-derives data-step-max from reveal attributes and toggles
// the boolean data-revealed hook on each reveal element from the current
// data-step. Mirrors the data-step-max step-machine block in contract.spec.js.
describe('deck-stage step reveals', () => {
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

  // Read the reveal section's step state + each tracked element's
  // data-revealed flag in one round-trip.
  const revealState = (page, ids) => page.evaluate((ids) => {
    const out = { revealed: {} };
    for (const id of ids) {
      const el = document.getElementById(id);
      out.revealed[id] = el ? el.hasAttribute('data-revealed') : null;
    }
    const anchor = document.getElementById(ids[0]);
    const sec = anchor && anchor.closest('section');
    out.step = sec && sec.getAttribute('data-step');
    out.stepMax = sec && sec.getAttribute('data-step-max');
    return out;
  }, ids);

  const opacityOf = (page, id) =>
    page.evaluate((id) => getComputedStyle(document.getElementById(id)).opacity, id);

  test('auto-derives data-step-max from the greatest k across reveal attrs', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-deck.html'));
    const max = await page.evaluate(() =>
      document.querySelectorAll('section')[1].getAttribute('data-step-max'));
    assert.equal(max, '2', 'greatest k is 2 (data-reveal="2")');
    await page.close();
  });

  test('reveal / reveal-only / reveal-until behave per the semantics table at steps 0..max', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-deck.html'));
    const ids = ['r1', 'r2', 'o1', 'u1'];
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));

    // step 0 (base): until-1 shown; reveal-1/2 + only-1 hidden.
    let st = await revealState(page, ids);
    assert.equal(st.step, '0', 'enters at step 0');
    assert.deepEqual(st.revealed, { r1: false, r2: false, o1: false, u1: true }, 'step 0');

    // step 1: reveal-1 appears, only-1 appears, until-1 still shown, reveal-2 hidden.
    await page.keyboard.press('ArrowRight');
    st = await revealState(page, ids);
    assert.equal(st.step, '1');
    assert.deepEqual(st.revealed, { r1: true, r2: false, o1: true, u1: true }, 'step 1');

    // step 2 (max): reveal-1/2 shown, only-1 gone (=== 1 only), until-1 gone (<= 1 only).
    await page.keyboard.press('ArrowRight');
    st = await revealState(page, ids);
    assert.equal(st.step, '2');
    assert.deepEqual(st.revealed, { r1: true, r2: true, o1: false, u1: false }, 'step 2');

    // ArrowLeft retreats back through the same states.
    await page.keyboard.press('ArrowLeft');
    st = await revealState(page, ids);
    assert.equal(st.step, '1');
    assert.deepEqual(st.revealed, { r1: true, r2: false, o1: true, u1: true }, 'retreat to step 1');
    await page.close();
  });

  test('data-reveal-until re-appears when the deck retreats back below k', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-deck.html'));
    const u0 = () => page.evaluate(() => document.getElementById('u0').hasAttribute('data-revealed'));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    // until="0" is the case whose interesting transitions are at the boundary:
    // shown at step 0, hidden once step passes k, then shown again on retreat.
    assert.equal(await u0(), true, 'until="0" shown at step 0');
    await page.keyboard.press('ArrowRight'); // step 1
    assert.equal(await u0(), false, 'until="0" hidden once step passes k');
    await page.keyboard.press('ArrowLeft'); // back to step 0
    assert.equal(await u0(), true, 'until="0" re-appears on retreat below k');
    await page.close();
  });

  test('explicit data-step-max is never overwritten by auto-derivation', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-explicit-deck.html'));
    const max = await page.evaluate(() =>
      document.querySelectorAll('section')[1].getAttribute('data-step-max'));
    assert.equal(max, '5', 'author-set data-step-max="5" survives despite reveals deriving 2');
    await page.close();
  });

  test('un-styled reveal elements hide by default via the injected global style (opacity)', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-deck.html'));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    // step 0: hidden reveal element is opacity:0; shown one is opacity:1.
    assert.equal(await opacityOf(page, 'r1'), '0', 'reveal-1 hidden at step 0');
    assert.equal(await opacityOf(page, 'u1'), '1', 'until-1 visible at step 0');
    await page.keyboard.press('ArrowRight'); // step 1 → reveal-1 appears
    assert.equal(await opacityOf(page, 'r1'), '1', 'reveal-1 visible at step 1');
    // The global rule lives in the document head, once.
    const tags = await page.evaluate(() =>
      document.querySelectorAll('style#deck-stage-reveal').length);
    assert.equal(tags, 1, 'exactly one reveal stylesheet injected');
    await page.close();
  });

  test('entering a stepped slide shows base state; leaving and re-entering replays from step 0', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-deck.html'));
    const ids = ['r1', 'r2', 'o1', 'u1'];
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight'); // walk to step 2
    let st = await revealState(page, ids);
    assert.equal(st.step, '2');
    // Leave to the tail slide, then come back.
    await page.evaluate(() => document.querySelector('deck-stage').goTo(2));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    st = await revealState(page, ids);
    assert.equal(st.step, '0', 're-entry resets data-step to 0');
    assert.deepEqual(st.revealed, { r1: false, r2: false, o1: false, u1: true }, 'base state on re-entry');
    await page.close();
  });

  test('R resets data-step and re-hides later reveals', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-deck.html'));
    const ids = ['r1', 'r2', 'o1', 'u1'];
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    await page.keyboard.press('ArrowRight'); // step 1: reveal-1 shown
    let st = await revealState(page, ids);
    assert.equal(st.revealed.r1, true, 'reveal-1 shown before R');
    await page.keyboard.press('r');
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 0, 'R returns to slide 0');
    st = await revealState(page, ids);
    assert.equal(st.step, '0', 'R reset the reveal section to step 0');
    assert.deepEqual(st.revealed, { r1: false, r2: false, o1: false, u1: true }, 're-hidden after R');
    await page.close();
  });

  test('a section with no reveal attrs and no data-step-max stays non-stepped', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('reveal-deck.html'));
    // The plain leading section (index 0) must not gain data-step-max.
    const plainMax = await page.evaluate(() =>
      document.querySelectorAll('section')[0].hasAttribute('data-step-max'));
    assert.equal(plainMax, false, 'plain section must not be auto-stepped');
    // ArrowRight on it advances the slide, not a step.
    const idx = await page.evaluate(() => document.querySelector('deck-stage').index);
    assert.equal(idx, 0);
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 1,
      'ArrowRight advances the slide on a non-stepped section');
    await page.close();
  });

  test('validation: multiple attrs honor the first; k=0 valid; invalid → always visible (with warnings)', async () => {
    const page = await browser.newPage();
    const warnings = [];
    page.on('console', (msg) => { if (msg.type() === 'warning') warnings.push(msg.text()); });
    await bootDeck(page, server.fixture('reveal-edge-deck.html'));
    const ids = ['multi', 'zero', 'bad', 'neg'];

    // Greatest valid k = 1 (#multi honors data-reveal="1"); invalid attrs ignored.
    const max = await page.evaluate(() =>
      document.querySelectorAll('section')[1].getAttribute('data-step-max'));
    assert.equal(max, '1', 'invalid values do not contribute to the derived max');

    // #rzero (data-reveal="0") and #empty (data-reveal="") are visible at every
    // step; both must carry the data-revealed hook (step>=0 always true for
    // rzero; empty is invalid → treated as always visible).
    const alwaysAt = () => page.evaluate(() => ({
      rzero: document.getElementById('rzero').hasAttribute('data-revealed'),
      empty: document.getElementById('empty').hasAttribute('data-revealed'),
    }));

    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    // step 0: #multi (reveal>=1) hidden; #zero (only===0) shown; #bad/#neg always shown.
    let st = await revealState(page, ids);
    assert.deepEqual(st.revealed, { multi: false, zero: true, bad: true, neg: true }, 'edge step 0');
    assert.deepEqual(await alwaysAt(), { rzero: true, empty: true }, 'k=0 and empty shown at step 0');
    // step 1: #multi shown; #zero (only===0) hidden; #bad/#neg still always shown.
    await page.keyboard.press('ArrowRight');
    st = await revealState(page, ids);
    assert.deepEqual(st.revealed, { multi: true, zero: false, bad: true, neg: true }, 'edge step 1');
    assert.deepEqual(await alwaysAt(), { rzero: true, empty: true }, 'k=0 and empty shown at step 1');

    // Warnings fired for the multiple-attr element and the two invalid values.
    assert.ok(warnings.some((w) => /multiple reveal attributes/i.test(w)), 'warns on multiple reveal attrs');
    assert.ok(warnings.some((w) => /data-reveal="abc"/.test(w)), 'warns on non-integer value');
    assert.ok(warnings.some((w) => /data-reveal="-1"/.test(w)), 'warns on negative value');
    // Each malformed attribute warns exactly once (the _revealWarned WeakSet),
    // not on every nav — re-applying reveals across steps must not re-spam.
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    assert.equal(
      warnings.filter((w) => /data-reveal="abc"/.test(w)).length, 1,
      'invalid value warns exactly once across navigation',
    );
    await page.close();
  });
});
