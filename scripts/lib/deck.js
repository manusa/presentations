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
    document.querySelector('deck-stage').goTo(n - 1);
  }, sectionIdx);
  await settleAnimations(page);
  for (let s = 0; s < step; s++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
  }
  await settleAnimations(page);
}

module.exports = {settleAnimations, applyExportHidden, expandStepClones, walkDeck, slideFilename, goToStep};
