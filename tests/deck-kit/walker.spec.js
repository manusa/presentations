'use strict';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { startServer, bootDeck } = require('./_helpers');
const { walkDeck } = require('../../scripts/lib/deck');

describe('walkDeck (step-aware)', () => {
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

  // Inspect the deck's *runtime* state at the moment of each visit. This is
  // the invariant that, when broken, produced the bug in issue #1814: the
  // walker thought it was on (section i+1) while the deck was still on
  // section i at a higher step. Asserting runtime state == descriptor at
  // every visit locks down that the diff selectivity behavior follows.
  async function snapshotRuntime(page) {
    return page.evaluate(() => {
      const stage = document.querySelector('deck-stage');
      const sections = Array.from(stage.querySelectorAll(':scope > section'));
      const active = sections.findIndex((s) => s.hasAttribute('data-deck-active'));
      const step = active >= 0 ? parseInt(sections[active].getAttribute('data-step') || '0', 10) : -1;
      return {activeSectionIdx: active + 1, dataStep: step};
    });
  }

  test('visits each (section, step) pair exactly once on a stepped deck', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('stepped-deck.html'));

    const visits = [];
    const total = await walkDeck(page, async (slide, totalPairs, captureIndex) => {
      const runtime = await snapshotRuntime(page);
      visits.push({
        sectionIdx: slide.sectionIdx,
        step: slide.step,
        maxStep: slide.maxStep,
        totalSections: slide.totalSections,
        totalPairs,
        captureIndex,
        runtime,
      });
    });

    // stepped-deck.html: <section> + <section data-step-max="2"> + <section>
    // → expected sequence is (1,0), (2,0), (2,1), (2,2), (3,0) = 5 captures.
    assert.equal(total, 5, 'walkDeck should return the number of (section,step) pairs visited');
    assert.deepEqual(
      visits.map((v) => [v.sectionIdx, v.step]),
      [[1, 0], [2, 0], [2, 1], [2, 2], [3, 0]],
      'walks sections in order, exhausting steps before advancing'
    );
    // Descriptor surface — callers rely on these fields for filename + padding.
    assert.equal(visits[0].totalSections, 3, 'totalSections = raw section count, not pair count');
    assert.equal(visits[0].maxStep, 0, 'non-stepped section has maxStep=0');
    assert.equal(visits[1].maxStep, 2, 'stepped section reports its data-step-max');
    assert.equal(visits[1].totalPairs, 5);
    assert.equal(visits[0].captureIndex, 1, 'captureIndex is 1-indexed');
    assert.equal(visits[4].captureIndex, 5);
    // Selectivity invariant — the actual bug guard. If the walker ever drifts
    // off the active section/step, snapshot-diff false negatives/positives
    // re-appear. This pins each descriptor against the live deck state.
    for (const v of visits) {
      assert.equal(v.runtime.activeSectionIdx, v.sectionIdx,
        `at capture ${v.captureIndex}: descriptor says section ${v.sectionIdx}, deck is on ${v.runtime.activeSectionIdx}`);
      assert.equal(v.runtime.dataStep, v.step,
        `at capture ${v.captureIndex}: descriptor says step ${v.step}, deck data-step is ${v.runtime.dataStep}`);
    }
    await page.close();
  });

  test('stepped FIRST section: exhausts steps before advancing off the boot slide', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('stepped-deck-first.html'));

    const visits = [];
    const total = await walkDeck(page, async (slide, totalPairs, captureIndex) => {
      const runtime = await snapshotRuntime(page);
      visits.push({sectionIdx: slide.sectionIdx, step: slide.step, captureIndex, runtime});
    });

    // stepped-deck-first.html: <section data-step-max="2"> + <section> + <section>
    // First captures land on the boot slide at step 0, 1, 2 — exercises the
    // step-reveal handler against the initially-active slide rather than
    // transitioning into a stepped slide from an adjacent one.
    assert.equal(total, 5);
    assert.deepEqual(
      visits.map((v) => [v.sectionIdx, v.step]),
      [[1, 0], [1, 1], [1, 2], [2, 0], [3, 0]],
      'stepped-first deck walks step 0..N on section 1 before advancing'
    );
    for (const v of visits) {
      assert.equal(v.runtime.activeSectionIdx, v.sectionIdx);
      assert.equal(v.runtime.dataStep, v.step);
    }
    await page.close();
  });

  test('throws if no <deck-stage> > <section> elements present', async () => {
    const page = await browser.newPage();
    await page.goto(server.fixture('_blank.html'));
    await assert.rejects(
      () => walkDeck(page, async () => {}),
      /No <deck-stage> > <section> elements/
    );
    await page.close();
  });

  test('plain deck: every visit is step=0, count equals section count', async () => {
    const page = await browser.newPage();
    await bootDeck(page, server.fixture('minimal-deck.html'));

    const visits = [];
    const total = await walkDeck(page, async (slide) => {
      visits.push(slide);
    });

    assert.ok(total >= 2, 'minimal-deck has at least 2 sections');
    assert.equal(total, visits[0].totalSections, 'plain deck → pair count equals section count');
    assert.ok(visits.every((v) => v.step === 0), 'no stepped sections → every step is 0');
    assert.ok(visits.every((v) => v.maxStep === 0), 'no stepped sections → every maxStep is 0');
    await page.close();
  });
});
