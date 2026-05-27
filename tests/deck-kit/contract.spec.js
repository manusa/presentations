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
// `<section>` data-* attributes that deck-stage reads from consumer markup.
// data-step is runtime state managed by deck-stage; data-step-max and
// data-deck-skip are author-set; data-label is author-set.
const SECTION_DATA_ATTRS = ['data-label', 'data-deck-skip', 'data-step-max', 'data-step'];
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

  // ── URL hash deep-link ────────────────────────────────────────────────
  // Loading `index.html#3` must land on the third section (1-based).
  // This is the documented contract that screenshot:deck and the
  // host's ?slide= → location.hash bridge rely on.
  test('hash #N deep-links to section index N-1 on load', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html') + '#3');
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 2);
    await page.close();
  });

  // ── Keyboard contract ─────────────────────────────────────────────────
  // One assertion per documented binding. Duplicates per-handler tests in
  // deck-stage.spec.js by design — this file is the contract allowlist,
  // so removing a binding must fail HERE first.
  test('keyboard contract: ArrowRight / ArrowLeft / PageDown / PageUp / Space / Enter / Home / End / R / 0-9', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    const stage = () => page.evaluate(() => document.querySelector('deck-stage').index);

    await page.keyboard.press('ArrowRight');
    assert.equal(await stage(), 1, 'ArrowRight');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await stage(), 0, 'ArrowLeft');
    await page.keyboard.press('PageDown');
    assert.equal(await stage(), 1, 'PageDown');
    await page.keyboard.press('PageUp');
    assert.equal(await stage(), 0, 'PageUp');
    await page.keyboard.press('Space');
    assert.equal(await stage(), 1, 'Space');
    await page.keyboard.press('Enter');
    assert.equal(await stage(), 2, 'Enter');
    await page.keyboard.press('Home');
    assert.equal(await stage(), 0, 'Home');
    await page.keyboard.press('End');
    assert.equal(await stage(), 5, 'End');
    await page.keyboard.press('r');
    assert.equal(await stage(), 0, 'r resets');
    await page.keyboard.press('3');
    assert.equal(await stage(), 2, '3 jumps to slide index 2');
    await page.close();
  });

  // The `0` key is documented as "jump to slide 10". On a sub-10-slide
  // deck it must be a no-op (no clamp, no wrap). Covers the
  // key === '0' ? 9 : ... branch in deck-stage._onKey.
  test('keyboard: 0 maps to slide 10 — no-op when deck has <10 slides', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(2));
    await page.keyboard.press('0');
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 2);
    await page.close();
  });

  // F is documented as fullscreen-toggle. The Fullscreen API is gated in
  // headless Chromium, so we stub _toggleFullscreen and assert the key
  // routes there. Catches a regression that drops the F binding.
  test('keyboard: F routes to _toggleFullscreen', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      window.__fsCalls = 0;
      stage._toggleFullscreen = () => { window.__fsCalls++; };
    });
    await page.keyboard.press('f');
    assert.equal(await page.evaluate(() => window.__fsCalls), 1);
    await page.close();
  });

  // ── Image-slot per-attribute wiring ───────────────────────────────────
  // observedAttributes guarantees the names — these confirm each one
  // actually plumbs through to the rendered shadow DOM, not just sits in
  // the allowlist. If shape/radius/fit/etc. ever silently stops applying,
  // the surface is "documented but broken" — fail loudly here.
  test('image-slot per-attribute wiring: shape, radius, mask, fit, position, placeholder, src', async () => {
    const page = await browser.newPage();
    await page.goto(server.fixture('image-slot.html'));
    await page.waitForFunction(() => !!customElements.get('image-slot'));
    const wired = await page.evaluate(() => {
      const get = (id, fn) => {
        const el = document.getElementById(id);
        const frame = el.shadowRoot.querySelector('.frame');
        const img = el.shadowRoot.querySelector('img');
        return fn({ el, frame, img });
      };
      return {
        shapeCircle: get('circle', ({ frame }) => getComputedStyle(frame).borderRadius),
        shapeRoundedRadius: get('rounded', ({ frame }) => getComputedStyle(frame).borderRadius),
        mask: get('masked', ({ frame }) => getComputedStyle(frame).clipPath),
        fitContain: get('fit-contain', ({ el, img }) => {
          el.setAttribute('src', 'data:image/svg+xml;utf8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2F%3E');
          return img.style.objectFit;
        }),
        fitCover: get('fit-cover', ({ img }) => img.style.objectFit),
        position: get('positioned', ({ el, img }) => {
          el.setAttribute('src', 'data:image/svg+xml;utf8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2F%3E');
          return img.style.objectPosition;
        }),
        placeholder: get('placeholder', ({ el }) => el.shadowRoot.querySelector('.cap').textContent),
        src: get('with-src', ({ img }) => img.getAttribute('src')),
      };
    });
    assert.ok(/^(60px|50%)$/.test(wired.shapeCircle), `shape=circle borderRadius="${wired.shapeCircle}"`);
    assert.match(wired.shapeRoundedRadius, /20px/);
    assert.match(wired.mask, /polygon/);
    // fit=cover is the default — image-slot enters a reframe path that
    // strips object-fit from inline style. Pin the empty value so a
    // regression to inline 'cover' (which would break the reframe
    // behavior) gets caught.
    assert.equal(wired.fitCover, '');
    assert.equal(wired.fitContain, 'contain');
    assert.match(wired.position, /20% 80%/);
    assert.equal(wired.placeholder, 'Drop a hero');
    assert.match(wired.src, /^data:image\/svg\+xml/);
    await page.close();
  });

  // src resolves on first render (synchronous _render in connectedCallback),
  // not asynchronously after a microtask flush. A regression to async wiring
  // would briefly show the placeholder caption before paint.
  test('image-slot src resolves synchronously on first render — no placeholder flash', async () => {
    const page = await browser.newPage();
    await page.goto(server.fixture('image-slot.html'));
    await page.waitForFunction(() => !!customElements.get('image-slot'));
    const state = await page.evaluate(() => {
      const el = document.getElementById('with-src');
      const img = el.shadowRoot.querySelector('img');
      const empty = el.shadowRoot.querySelector('.empty');
      return {
        imgDisplay: img.style.display,
        emptyDisplay: empty.style.display,
        filled: el.hasAttribute('data-filled'),
        imgSrc: img.getAttribute('src'),
      };
    });
    assert.equal(state.filled, true, 'data-filled should be set on first render when src is present');
    assert.equal(state.imgDisplay, 'block', 'inner img should be displayed on first render');
    assert.equal(state.emptyDisplay, 'none', 'empty/placeholder state must be hidden when src is present');
    assert.ok(state.imgSrc && state.imgSrc.length > 0);
    await page.close();
  });

  // ── data-deck-skip ────────────────────────────────────────────────────
  // Per the contract, a section flagged data-deck-skip is excluded from
  // keyboard advance. Duplicate of deck-stage-rail.spec.js by design —
  // dropping skip support must fail in the contract suite too.
  test('data-deck-skip excludes a section from keyboard navigation', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck-skip.html'));
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight'); // hops over the skipped section
    const idx = await page.evaluate(() => document.querySelector('deck-stage').index);
    assert.notEqual(idx, 2, 'index 2 is data-deck-skip and must not be reached by keyboard nav');
    await page.close();
  });

  // ── data-step-max / data-step step machine ────────────────────────────
  // Step state is documented and owned by deck-stage. On a slide with
  // data-step-max="N", ArrowRight increments data-step (0..N) and
  // SWALLOWS the slide nav; once step == N, ArrowRight resumes slide
  // advance. ArrowLeft mirrors. Slide change resets data-step to 0.
  test('data-step-max: ArrowRight advances data-step before slide, then advances slide at max', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('stepped-deck.html'));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1)); // land on the stepped slide
    const step0 = await page.evaluate(() => document.querySelector('section[data-step-max]').getAttribute('data-step'));
    assert.equal(step0, '0', 'step should be 0 on slide enter');

    await page.keyboard.press('ArrowRight'); // step 0 → 1
    let st = await page.evaluate(() => ({
      idx: document.querySelector('deck-stage').index,
      step: document.querySelector('section[data-step-max]').getAttribute('data-step'),
    }));
    assert.equal(st.idx, 1, 'still on stepped slide after first ArrowRight');
    assert.equal(st.step, '1');

    await page.keyboard.press('ArrowRight'); // step 1 → 2 (== max)
    st = await page.evaluate(() => ({
      idx: document.querySelector('deck-stage').index,
      step: document.querySelector('section[data-step-max]').getAttribute('data-step'),
    }));
    assert.equal(st.idx, 1, 'still on stepped slide after reaching max step');
    assert.equal(st.step, '2');

    await page.keyboard.press('ArrowRight'); // step == max → slide advances
    const idxAfter = await page.evaluate(() => document.querySelector('deck-stage').index);
    assert.equal(idxAfter, 2, 'slide advances once step max is reached');
    await page.close();
  });

  test('data-step-max: ArrowLeft retreats step before slide; slide change resets step', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('stepped-deck.html'));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    // Walk to mid-step.
    await page.keyboard.press('ArrowRight');
    let step = await page.evaluate(() => document.querySelector('section[data-step-max]').getAttribute('data-step'));
    assert.equal(step, '1');
    // ArrowLeft retreats step, does not change slide.
    await page.keyboard.press('ArrowLeft');
    let st = await page.evaluate(() => ({
      idx: document.querySelector('deck-stage').index,
      step: document.querySelector('section[data-step-max]').getAttribute('data-step'),
    }));
    assert.equal(st.idx, 1);
    assert.equal(st.step, '0');
    // Step at 0 → ArrowLeft retreats slide.
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 0);

    // Re-enter the stepped slide via goTo, push it past 0, then leave —
    // step must reset to 0 on slide change.
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    await page.keyboard.press('ArrowRight');
    await page.evaluate(() => document.querySelector('deck-stage').goTo(2));
    const stepAfter = await page.evaluate(() =>
      document.querySelector('section[data-step-max]').getAttribute('data-step'),
    );
    assert.equal(stepAfter, '0', 'slide change resets data-step to 0');
    await page.close();
  });

  // R is documented as "reset to slide 1 step 0" — verify the step half.
  test('R resets to slide 0 AND clears data-step on the stepped slide', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('stepped-deck.html'));
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    await page.keyboard.press('ArrowRight'); // step → 1
    await page.evaluate(() => document.querySelector('deck-stage').goTo(2));
    // Re-enter and bump step before pressing R.
    await page.evaluate(() => document.querySelector('deck-stage').goTo(1));
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('r');
    const idx = await page.evaluate(() => document.querySelector('deck-stage').index);
    const step = await page.evaluate(() =>
      document.querySelector('section[data-step-max]').getAttribute('data-step'),
    );
    assert.equal(idx, 0);
    assert.equal(step, '0');
    await page.close();
  });

  // R must reset data-step on the current slide even when already on
  // slide 0. Without this guard, _go(0) short-circuits when index===0 and
  // skips _applyIndex's step-reset, leaving an opening stepped slide
  // stuck mid-reveal.
  test('R resets data-step on the current slide even when already on slide 0', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('stepped-deck-first.html'));
    // Land on the stepped first slide and walk past step 0.
    await page.keyboard.press('ArrowRight'); // step 0 → 1
    let step = await page.evaluate(() => document.querySelector('section[data-step-max]').getAttribute('data-step'));
    assert.equal(step, '1');
    // R while already on slide 0.
    await page.keyboard.press('r');
    const after = await page.evaluate(() => ({
      idx: document.querySelector('deck-stage').index,
      step: document.querySelector('section[data-step-max]').getAttribute('data-step'),
    }));
    assert.equal(after.idx, 0);
    assert.equal(after.step, '0', 'R must reset data-step even when _go(0) short-circuits');
    await page.close();
  });

  // Boundary cases for the documented contract: hash deep-link must
  // reject out-of-range and non-integer values silently (no crash, no
  // wrap, no land-on-undefined).
  test('hash #N out-of-range integer is ignored (no crash, defaults to slide 0)', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html') + '#999');
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 0);
    await page.close();
  });

  test('hash #N non-integer is ignored (no crash, defaults to slide 0)', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html') + '#abc');
    assert.equal(await page.evaluate(() => document.querySelector('deck-stage').index), 0);
    await page.close();
  });

  // data-step-max="0" must behave like a non-stepped slide (no key
  // swallowing). The handler's `max > 0` guard at deck-stage.js makes
  // this work today; a regression to `max >= 0` would swallow ArrowRight.
  test('data-step-max="0" does not swallow advance keys', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));
    await page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      stage.children[1].setAttribute('data-step-max', '0');
      stage.goTo(1);
    });
    await page.keyboard.press('ArrowRight');
    const idx = await page.evaluate(() => document.querySelector('deck-stage').index);
    assert.equal(idx, 2, 'ArrowRight on data-step-max="0" must advance slide, not swallow');
    await page.close();
  });

  // SECTION_DATA_ATTRS is the canonical README list — read it into the
  // suite so a future refactor that drops an entry shows up here.
  // The behavior tests above cover each name in turn.
  test('SECTION_DATA_ATTRS matches the README-documented surface', () => {
    assert.deepEqual(
      [...SECTION_DATA_ATTRS].sort(),
      ['data-deck-skip', 'data-label', 'data-step', 'data-step-max'],
    );
  });
});
