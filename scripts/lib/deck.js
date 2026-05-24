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
 * Walk a deck slide-by-slide via ArrowRight, calling `onSlide(i, total)`
 * after each slide's animations have settled.
 *
 * `onSlide` is awaited; throw from it to abort the walk.
 *
 * Returns the total number of slides captured.
 */
async function walkDeck(page, onSlide) {
  const total = await page.evaluate(() => {
    const stage = document.querySelector('deck-stage');
    if (!stage) return 0;
    return stage.querySelectorAll(':scope > section').length;
  });
  if (total === 0) {
    throw new Error('No <deck-stage> > <section> elements found at this URL.');
  }

  for (let i = 1; i <= total; i++) {
    if (i > 1) {
      await page.keyboard.press('ArrowRight');
      // Give the deck a tick to process the keypress before we look at animations.
      await page.waitForTimeout(100);
    }
    await settleAnimations(page);
    await onSlide(i, total);
  }

  return total;
}

module.exports = {settleAnimations, walkDeck};
