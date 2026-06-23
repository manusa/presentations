/**
 * Shared helpers for Playwright-driven slide capture.
 *
 * Kept intentionally agnostic of the deck-stage implementation:
 *   - slide count comes from `deck-stage > section` count in the light DOM
 *   - navigation is done by pressing ArrowRight (whatever the deck binds it to)
 *   - "settled" means non-looping CSS animations have reached `finished` / `idle`
 *
 * This lets us capture decks before/after any deck-stage rewrite.
 */

/**
 * Navigate to a deck (or any) URL and wait until it is render-ready, WITHOUT
 * relying on the network going idle.
 *
 * Why not `waitUntil: 'networkidle'` — the dev hosts hold a socket open for the
 * lifetime of the page (live-server's hot-reload WebSocket, Gatsby's HMR
 * channel), so the network never goes idle and the navigation hangs until the
 * 30s timeout, then throws. `waitUntil: 'load'` fires deterministically once
 * the document's own subresources have loaded; we then explicitly wait for the
 * things that actually affect a slide's pixels (fonts + images), which is what
 * networkidle was being used as a rough proxy for anyway.
 *
 * This is the single seam every capture script funnels through, so all of them
 * can point straight at `serve:static` with no throwaway plain-HTTP host.
 */
async function gotoDeck(page, url, {timeout = 30_000} = {}) {
  await page.goto(url, {waitUntil: 'load', timeout});
  await waitForDeckReady(page, {timeout: Math.min(timeout, 15_000)});
}

/**
 * Block until the render-affecting async work has settled. All three signals
 * are checked in ONE `page.waitForFunction` so the wait is bounded by `timeout`
 * end-to-end — there is no bare `page.evaluate` awaiting an unbounded in-page
 * promise (e.g. `customElements.whenDefined('deck-stage')`, which never resolves
 * if the deck-kit script 404s and the `<deck-stage>` tag is present but never
 * upgraded). On timeout it falls through so the caller still captures a frame.
 *
 *   1. <deck-stage> upgraded (deferred script ran) — or no deck on the page.
 *   2. Web fonts settled (`document.fonts.status === 'loaded'`, a terminal
 *      state reached on success OR error) — no metric shift / FOUT in the shot.
 *   3. Every <img> (light DOM) + every <image-slot> shadow <img> with a source
 *      reports `complete` — loaded or errored, never blocking on a 404.
 *
 * Pairs with `settleAnimations`, which handles CSS animations separately.
 */
async function waitForDeckReady(page, {timeout = 15_000} = {}) {
  try {
    await page.waitForFunction(
      () => {
        // 1. deck-stage defined/upgraded (or absent — nothing to wait for).
        const stage = document.querySelector('deck-stage');
        if (stage && !(window.customElements && customElements.get('deck-stage'))) return false;
        // 2. fonts settled.
        if (document.fonts && document.fonts.status !== 'loaded') return false;
        // 3. images complete.
        const imgs = [];
        document.querySelectorAll('img').forEach((i) => imgs.push(i));
        document.querySelectorAll('image-slot').forEach((slot) => {
          if (slot.shadowRoot) slot.shadowRoot.querySelectorAll('img').forEach((i) => imgs.push(i));
        });
        return imgs.every((i) => {
          const src = i.currentSrc || i.getAttribute('src');
          return !src || i.complete; // no source -> nothing to await
        });
      },
      {timeout, polling: 100}
    );
  } catch (e) { /* timed out — proceed; the caller still captures a frame */ }
}

/**
 * Wait for the page's currently-running, non-looping CSS animations to finish.
 * Looping (infinite) animations are treated as already-settled — they would
 * never finish and would block capture forever.
 *
 * Best effort: if `timeout` is reached, returns without throwing so callers
 * still capture a frame.
 */
async function settleAnimations(page, {timeout = 5000, extraDelayMs = 50} = {}) {
  try {
    await page.waitForFunction(
      () => {
        const anims = document.getAnimations();
        return anims.every((a) => {
          if (a.playState === 'finished' || a.playState === 'idle') return true;
          try {
            const timing = a.effect && a.effect.getComputedTiming && a.effect.getComputedTiming();
            if (timing && timing.iterations === Infinity) return true;
          } catch (e) {
            /* ignore */
          }
          return false;
        });
      },
      {timeout, polling: 100}
    );
  } catch (err) {
    // Timed out; proceed anyway.
  }
  if (extraDelayMs > 0) await page.waitForTimeout(extraDelayMs);
}

/**
 * Hide elements marked `.export-hidden` (overlay, rail, tapzones, etc.) for
 * the duration of the page. The rule is injected into deck-stage's shadow
 * root because that's where the chrome lives — a light-DOM style tag would
 * never reach it across the shadow boundary.
 */
async function applyExportHidden(page) {
  await page.evaluate(() => {
    const stage = document.querySelector('deck-stage');
    if (!stage || !stage.shadowRoot) return;
    const style = document.createElement('style');
    style.setAttribute('data-export-hidden', '');
    style.textContent = '.export-hidden { display: none !important; }';
    stage.shadowRoot.appendChild(style);
  });
}

// Lay every slotted <section> out as its own full-bleed flow page (instead of
// the deck-stage screen default: all slides stacked at inset:0 inside a scaled
// canvas). Injected into deck-stage's shadow root.
//
// `contain: size` on each section is what defeats the right/bottom white frame.
// Decks stage elements off-screen for slide-in animations (e.g. a card parked at
// `left` so its box reaches x≈3827, ~2× the 1920px slide). `overflow:hidden`
// hides them visually, but Chromium's page.pdf() still measures that un-clipped
// descendant extent for its shrink-to-fit and scales the WHOLE multi-page
// document to ~0.943, anchored top-left — the frame. `contain: size` makes a
// section's layout size depend only on its own width/height (the design box), so
// page.pdf() ignores descendant overflow and each section fills its page 1:1.
// The section already has an explicit width/height, so size containment has no
// visual effect on its contents — they still paint, clipped by overflow:hidden.
const SCREEN_PAGINATE_SHADOW = `
  :host{position:static!important;inset:auto!important;height:auto!important;overflow:visible!important;background:none!important;}
  .stage{position:static!important;display:block!important;height:auto!important;width:auto!important;}
  .canvas{transform:none!important;position:static!important;width:auto!important;height:auto!important;will-change:auto!important;}
  ::slotted(*){position:relative!important;inset:auto!important;left:auto!important;top:auto!important;width:var(--deck-design-w)!important;height:var(--deck-design-h)!important;box-sizing:border-box!important;display:block!important;opacity:1!important;visibility:visible!important;break-after:page;page-break-after:always;break-inside:avoid;overflow:hidden;contain:size!important;}
  ::slotted(*:last-child){break-after:auto;page-break-after:auto;}
  .overlay,.tapzones,.rail,.rail-resize,.ctxmenu,.confirm-backdrop,.skipwm{display:none!important;}
`;
// Light-DOM reset: zero body margins/clipping, strip box-shadows (a box-shadow
// forces Chromium to rasterise the slide, bloating the PDF and losing vector
// text), and freeze animations so reveals capture at their settled frame.
const SCREEN_PAGINATE_LIGHT =
  'html,body{margin:0!important;padding:0!important;background:none!important;overflow:visible!important;height:auto!important;}' +
  '*{box-shadow:none!important;animation:none!important;}';

/**
 * Lay every (section, step) clone out as its own full-bleed page for a
 * SCREEN-media page.pdf() export. Call AFTER expandStepClones AND
 * emulateMedia('screen'), BEFORE page.pdf().
 *
 * Why screen media, not print: in SCREEN media each section renders at its true
 * 1920×1080 and the deck's top-level `[data-step]` rules drive the reveal (the
 * correct per-step build state) instead of the per-slide `@media print`
 * force-reveal that collapses every step into the final state. (The right/bottom
 * white frame is a separate page.pdf() shrink-to-fit triggered by off-screen
 * content — see SCREEN_PAGINATE_SHADOW's `contain: size`.)
 *
 * Two steps:
 *  1. Re-activate the deck's genuine static-capture `@media print` fixes in
 *     screen media (set their media to 'all') — EXCEPT the per-slide
 *     force-reveal blocks. A force-reveal un-hides every step at once
 *     (opacity/visibility/animation with no `data-step` qualifier); promoting it
 *     would collapse the per-step build, so those stay print-only and inactive
 *     in screen, leaving `[data-step]` to govern. Everything else promotes: the
 *     data-step-AWARE fixes (most importantly the s-about2 3D-flip flatten — a
 *     live 3D flip captures a face upside-down, so it MUST be flattened) AND the
 *     non-stepped visual fixes the old "promote iff cssText contains data-step"
 *     heuristic wrongly dropped (e.g. the flywheel `.wheel-svg { filter: none }`,
 *     whose drop-shadow otherwise forces that SVG to rasterise). The classifier
 *     keys off the reveal-signalling properties, not a brittle `data-step`
 *     substring, so a future data-step-aware fix that doesn't mention `data-step`
 *     is no longer silently dropped.
 *  2. Inject the pagination layout into the shadow root + a light-DOM reset.
 */
async function paginateForScreenExport(page) {
  await page.evaluate(({shadowCss, lightCss}) => {
    // The promote loop walks `document.styleSheets` — every same-origin sheet in
    // the light DOM: the deck's author CSS AND deck-stage's own head-injected
    // `<style id="deck-stage-print-page">` (its `@media print` html/body reset
    // promotes harmlessly, duplicating SCREEN_PAGINATE_LIGHT). It does NOT reach
    // deck-stage's shadow-root sheet — that sheet's `@media print` pagination is
    // reimplemented from scratch by SCREEN_PAGINATE_SHADOW below.
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch (e) { continue; } // cross-origin: skip
      for (const rule of rules) {
        const isPrint =
          (rule.type === 4 || (rule.constructor && rule.constructor.name === 'CSSMediaRule')) &&
          rule.media &&
          /\bprint\b/i.test(rule.media.mediaText) && !/\bscreen\b/i.test(rule.media.mediaText);
        if (!isPrint) continue;
        // Promote every print fix to screen EXCEPT a force-reveal — a block that
        // un-hides all build steps at once via opacity/visibility/animation and
        // is NOT scoped to a `data-step` (the data-step-scoped blocks reveal the
        // right step themselves, so they always promote). The match is on the
        // whole serialized rule text, so the words also match in value position
        // (`transition: opacity …`, `will-change: opacity`, a `@keyframes` body):
        // today no print block trips that (they all use `transition: none`), but
        // a future @media-print VISUAL fix written with `transition: opacity`
        // would be misread as a force-reveal and dropped. Keep a genuine
        // step-reveal and a visual fix in SEPARATE @media print blocks.
        const txt = rule.cssText;
        const isForceReveal =
          !/data-step/i.test(txt) && /\b(opacity|visibility|animation)\b/i.test(txt);
        if (!isForceReveal) rule.media.mediaText = 'all';
      }
    }
    const stage = document.querySelector('deck-stage');
    if (stage && stage.shadowRoot) {
      // Appended LAST into the shadow root so it wins the cascade over
      // deck-stage's own base `::slotted` rules: both sides are `!important`
      // with equal specificity, so later-in-tree-order wins. This implicit
      // dependency on append order is why pagination must be injected here, not
      // prepended.
      const s = document.createElement('style');
      s.setAttribute('data-export-paginate', '');
      s.textContent = shadowCss;
      stage.shadowRoot.appendChild(s);
    }
    const l = document.createElement('style');
    l.setAttribute('data-export-paginate', '');
    l.textContent = lightCss;
    document.head.appendChild(l);
  }, {shadowCss: SCREEN_PAGINATE_SHADOW, lightCss: SCREEN_PAGINATE_LIGHT});
}

/**
 * Disable the thumbnail rail so the capture is the slide and nothing else.
 *
 * By default <deck-stage> reserves a left-hand thumbnail rail and scales the
 * fixed 1920×1080 design canvas to fit the *remaining* width — so a raw
 * viewport screenshot picks up the dark rail strip on the left plus
 * top/bottom letterbox bars where the down-scaled canvas no longer fills the
 * 16:9 viewport. Setting the `no-rail` attribute makes `_railWidth()` return
 * 0; the synchronous `_fit()` in attributeChangedCallback then anchors the
 * stage at left:0 and scales the canvas 1:1, so it exactly fills the
 * 1920×1080 viewport. The resulting PNG is the slide alone — no black frame,
 * shareable as-is.
 *
 * No-op if the page has no <deck-stage> (e.g. the landing page).
 */
async function disableRail(page) {
  await page.evaluate(() => {
    const stage = document.querySelector('deck-stage');
    if (stage) stage.setAttribute('no-rail', '');
  });
}

/**
 * Expand stepped slides into one section per step state. For every section
 * with `data-step-max="N"`, inserts N clones right after it (preserving DOM
 * order) and sets `data-step="0..N"` across the resulting N+1 sections.
 *
 * Cloned sections have their `id` attributes stripped (on the section itself
 * and all descendants) so they don't collide with the originals — most
 * notably `<image-slot id="…">` slots, which would otherwise produce two
 * elements sharing one id. The `src` attribute is preserved on clones, and
 * we re-set it after insertion to ensure image-slot's attributeChangedCallback
 * fires and paints the image.
 *
 * Used by export:pdf so a single page.pdf() call can produce one PDF page
 * per step state with Chromium natively de-duplicating fonts/images across
 * pages — far smaller than per-state pdf() + pdf-lib merge.
 *
 * Returns the new total section count after expansion.
 */
async function expandStepClones(page) {
  return page.evaluate(() => {
    const stage = document.querySelector('deck-stage');
    if (!stage) return 0;
    const stepped = Array.from(stage.querySelectorAll(':scope > section[data-step-max]'));
    stepped.forEach((sec) => {
      const max = parseInt(sec.getAttribute('data-step-max') || '0', 10);
      if (max <= 0) return;
      sec.setAttribute('data-step', '0');
      let prev = sec;
      for (let step = 1; step <= max; step++) {
        const clone = sec.cloneNode(true);
        clone.setAttribute('data-step', String(step));
        clone.setAttribute('data-step-clone', '');
        if (clone.hasAttribute('id')) clone.removeAttribute('id');
        clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
        sec.parentNode.insertBefore(clone, prev.nextSibling);
        // Force image-slot to re-paint via attributeChangedCallback.
        clone.querySelectorAll('image-slot[src]').forEach((s) => {
          const src = s.getAttribute('src');
          s.removeAttribute('src');
          s.setAttribute('src', src);
        });
        prev = clone;
      }
    });
    return stage.querySelectorAll(':scope > section').length;
  });
}

/**
 * Walk a deck via ArrowRight, capturing every (section, step) pair.
 *
 * Slides with `data-step-max="N"` expand to N+1 captures (steps 0..N) because
 * the in-deck step-reveal handler intercepts ArrowRight until the slide is
 * fully stepped, then passes it through to advance to the next section.
 * `onSlide` is awaited; throw from it to abort the walk.
 *
 * `onSlide(descriptor, totalPairs, captureIndex)` where descriptor is
 *   { sectionIdx: 1-indexed section position,
 *     step:       0-indexed step within section,
 *     maxStep:    section's data-step-max (0 for non-stepped),
 *     totalSections: raw <section> count (for filename padding) }.
 *
 * Returns the total number of (section, step) pairs captured.
 */
async function walkDeck(page, onSlide) {
  const sequence = await page.evaluate(() => {
    const stage = document.querySelector('deck-stage');
    if (!stage) return [];
    const sections = Array.from(stage.querySelectorAll(':scope > section'));
    const totalSections = sections.length;
    const out = [];
    sections.forEach((s, idx) => {
      const max = parseInt(s.getAttribute('data-step-max') || '0', 10);
      const maxStep = Number.isFinite(max) && max > 0 ? max : 0;
      for (let step = 0; step <= maxStep; step++) {
        out.push({sectionIdx: idx + 1, step, maxStep, totalSections});
      }
    });
    return out;
  });

  if (sequence.length === 0) {
    throw new Error('No <deck-stage> > <section> elements found at this URL.');
  }

  await applyExportHidden(page);
  await disableRail(page);

  for (let i = 0; i < sequence.length; i++) {
    if (i > 0) {
      await page.keyboard.press('ArrowRight');
      // Give the deck a tick to process the keypress before we look at animations.
      await page.waitForTimeout(100);
    }
    await settleAnimations(page);
    await onSlide(sequence[i], sequence.length, i + 1);
  }

  return sequence.length;
}

/**
 * Filename for a (section, step) capture descriptor produced by `walkDeck`.
 * Stepped sections get `slide-NN-step-K.png`; non-stepped get `slide-NN.png`.
 * Pad width is derived from `totalSections`, not the inflated pair count.
 */
function slideFilename({sectionIdx, step, maxStep, totalSections}) {
  const pad = Math.max(2, String(totalSections).length);
  const idx = String(sectionIdx).padStart(pad, '0');
  return maxStep > 0 ? `slide-${idx}-step-${step}.png` : `slide-${idx}.png`;
}

/**
 * Jump to (sectionIdx, step) on an already-loaded deck. sectionIdx is
 * 1-indexed (matching the documented `#N` hash entry point). Uses the
 * public deck-stage.goTo() API for the section jump, then K ArrowRight
 * presses to advance the step. Settles between each press.
 *
 * Throws with a clear message if sectionIdx or step are out of range.
 */
async function goToStep(page, sectionIdx, step) {
  const meta = await page.evaluate((n) => {
    const stage = document.querySelector('deck-stage');
    if (!stage) return {error: 'no-stage'};
    const sections = Array.from(stage.querySelectorAll(':scope > section'));
    if (n < 1 || n > sections.length) {
      return {error: 'section-out-of-range', total: sections.length};
    }
    const s = sections[n - 1];
    const max = parseInt(s.getAttribute('data-step-max') || '0', 10);
    return {maxStep: Number.isFinite(max) && max > 0 ? max : 0, total: sections.length};
  }, sectionIdx);
  if (meta.error === 'no-stage') {
    throw new Error('No <deck-stage> element found at this URL.');
  }
  if (meta.error === 'section-out-of-range') {
    throw new Error(`--slide ${sectionIdx} is out of range (deck has ${meta.total} sections).`);
  }
  if (step < 0 || step > meta.maxStep) {
    throw new Error(
      `--step ${step} is out of range for section ${sectionIdx} (data-step-max=${meta.maxStep}).`
    );
  }
  await page.evaluate((n) => {
    const stage = document.querySelector('deck-stage');
    stage.goTo(n - 1);
    // goTo() to the already-current section is a no-op in deck-stage: it skips
    // _applyIndex, which is what normally snaps data-step back to 0. When
    // goToStep is called repeatedly for the SAME section with increasing steps
    // (audit:fit walking one slide's steps on a reused page), that leaves the
    // section at its previous step, so the ArrowRight loop below starts from the
    // wrong baseline and overshoots — past the max, an advance key falls through
    // to the next slide and the intended slide goes inactive (measured as empty).
    // deck-stage reads the step from the data-step attribute, so resetting it
    // here gives the press loop a deterministic step-0 baseline either way.
    const sec = stage.querySelectorAll(':scope > section')[n - 1];
    if (sec && sec.hasAttribute('data-step-max')) sec.setAttribute('data-step', '0');
  }, sectionIdx);
  await settleAnimations(page);
  for (let s = 0; s < step; s++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
  }
  await settleAnimations(page);
}

module.exports = {gotoDeck, waitForDeckReady, settleAnimations, applyExportHidden, paginateForScreenExport, disableRail, expandStepClones, walkDeck, slideFilename, goToStep};
