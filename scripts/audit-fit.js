#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * audit-fit.js — fit & legibility checker for a <deck-stage> deck.
 *
 * Walks every (section, step) state of the deck and, for each, measures the
 * ACTIVE section in its native 1920×1080 canvas (deck-stage renders the active
 * slide at exactly 0,0–1920,1080; see scripts/lib/deck.js). It reports:
 *
 *   (a) OVERFLOW — content that is being cut off:
 *         • clipped:  a clipping container (overflow != visible) whose own
 *                     content is larger than its box (scroll > client).
 *         • offCanvas: a text run whose rendered box escapes the 1920×1080
 *                     slide (the section clips it with overflow:hidden).
 *   (b) BELOW-FLOOR — any visible text run rendered below the legibility floor
 *         (default 28px = 14pt, the FONT-AUDIT "must-read" hard floor). Each
 *         finding carries px, pt (px/2), %-of-height (px/1080) and whether it is
 *         monospace, so decorative chrome (20–24px, acceptable per the audit)
 *         can be told apart from must-read content at a glance.
 *
 * Faint decorative text (effective opacity < 0.25 — ghost watermarks, dimmed
 * un-revealed step layers) is excluded from both checks: it is neither must-read
 * nor a real clip.
 *
 * Output:
 *   • screenshots/<name>.fit.json  — full structured findings (re-readable even
 *     if stdout stalls mid-batch).
 *   • one-line stdout summary.
 *
 * Exit code:
 *   • report mode (default): always 0 — safe to chain in a batch.
 *   • --ci: 1 if ANY overflow or any below-floor run was found (scope --floor to
 *     your gate, e.g. --floor 20 for the absolute project minimum).
 *
 * Mirrors the capture scripts: same deck-walking, same no-networkidle goto, so
 * it points straight at `serve:static`.
 */
const path = require('path');
const fs = require('fs');
const {gotoDeck, walkDeck, goToStep, disableRail, applyExportHidden, slideFilename} = require('./lib/deck');

const DEFAULT_FLOOR = 28; // px — FONT-AUDIT must-read hard floor (14pt on a 1080px canvas)

const USAGE = `Usage: npm run audit:fit -- <deck-url> [name] [--floor <px>] [--slide N [--step K]] [--ci]

  <deck-url>     URL of a deck (single page containing <deck-stage> with <section> children)
  [name]         Output basename → screenshots/<name>.fit.json
                 (default: the deck's URL slug, e.g. 2026-devtalks-romania)
  [--floor <px>] Legibility floor in px (default ${DEFAULT_FLOOR}). pt = px/2 on the 1080px canvas.
  [--slide N]    1-indexed section to audit (all its steps). Default: walk the whole deck.
  [--step K]     0-indexed step within --slide (requires --slide). Default: every step.
  [--ci]         Exit 1 if any overflow or below-floor run is found. Without it, always exit 0.

Reports per (section, step):
  • overflow   — clipped containers + text escaping the 1920×1080 slide
  • belowFloor — visible text runs under the floor, with px / pt / %-height / mono

Examples:
  npm run audit:fit -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/
  npm run audit:fit -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ devtalks --floor 36
  npm run audit:fit -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ s22 --slide 22
`;

function parseArgs(rawArgs) {
  const positional = [];
  let floor = DEFAULT_FLOOR;
  let slide = null;
  let step = null;
  let ci = false;
  for (let i = 0; i < rawArgs.length; i++) {
    const a = rawArgs[i];
    if (a === '--floor') {
      const v = parseFloat(rawArgs[++i]);
      if (Number.isNaN(v) || v <= 0) { console.error('--floor requires a positive number (px).'); process.exit(2); }
      floor = v;
    } else if (a === '--slide') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 1) { console.error('--slide requires a positive integer (1-indexed section).'); process.exit(2); }
      slide = v;
    } else if (a === '--step') {
      const v = parseInt(rawArgs[++i], 10);
      if (Number.isNaN(v) || v < 0) { console.error('--step requires a non-negative integer.'); process.exit(2); }
      step = v;
    } else if (a === '--ci') {
      ci = true;
    } else if (a === '-h' || a === '--help') {
      console.log(USAGE); process.exit(0);
    } else {
      positional.push(a);
    }
  }
  if (step !== null && slide === null) { console.error('--step requires --slide.'); process.exit(2); }
  return {positional, floor, slide, step, ci};
}

function deckSlug(url) {
  try {
    const segs = new URL(url).pathname.split('/').filter(Boolean);
    return segs[segs.length - 1] || 'fit';
  } catch {
    return 'fit';
  }
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length < 1) { console.log(USAGE); process.exit(1); }
const {positional, floor, slide, step, ci} = parseArgs(rawArgs);
const [url, rawName] = positional;
if (!url) { console.error('Missing <url>.'); process.exit(2); }

const name = (rawName || deckSlug(url)).replace(/\.fit\.json$/i, '');
const outDir = path.resolve(__dirname, '..', 'screenshots');
fs.mkdirSync(outDir, {recursive: true});
const outPath = path.join(outDir, `${name}.fit.json`);

let chromium;
try {
  ({chromium} = require('playwright'));
} catch (err) {
  console.error('playwright is not installed. Run: npm install');
  process.exit(2);
}

/*
 * Measure the active section (sections[sectionIdx-1]) in-page. Returns
 * { overflow: [...], belowFloor: [...] } for this one state. Pure DOM
 * measurement — no screenshots — so it is fast and deterministic.
 */
async function measureState(page, sectionIdx, floorPx) {
  return page.evaluate(({sectionIdx, floorPx}) => {
    const TOL = 2; // px — absorb sub-pixel rounding
    const FAINT = 0.25; // effective-opacity floor below which text is decorative
    const stage = document.querySelector('deck-stage');
    if (!stage) return {error: 'no-stage'};
    const sections = Array.from(stage.querySelectorAll(':scope > section'));
    const active = sections[sectionIdx - 1];
    if (!active) return {error: 'no-section'};
    const secRect = active.getBoundingClientRect();

    // Effective visibility + opacity, climbing to the section.
    const vis = (el) => {
      let op = 1;
      let node = el;
      while (node && node !== active.parentNode) {
        const cs = getComputedStyle(node);
        if (cs.display === 'none' || cs.visibility === 'hidden') return {visible: false, opacity: 0};
        const o = parseFloat(cs.opacity);
        if (!Number.isNaN(o)) op *= o;
        node = node.parentElement;
      }
      return {visible: true, opacity: op};
    };

    const sample = (el) => {
      const direct = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      const text = (direct || el.textContent || '').replace(/\s+/g, ' ').trim();
      return text.length > 60 ? `${text.slice(0, 57)}…` : text;
    };

    // A compact, locator-friendly selector path up to the section.
    const sel = (el) => {
      const parts = [];
      let node = el;
      let depth = 0;
      while (node && node !== active.parentNode && depth < 5) {
        let s = node.tagName.toLowerCase();
        const cls = String(node.className || '').trim().split(/\s+/).filter(Boolean);
        if (cls.length) s += `.${cls.slice(0, 2).join('.')}`;
        parts.unshift(s);
        if (node === active) break;
        node = node.parentElement;
        depth++;
      }
      return parts.join(' > ');
    };

    const all = Array.from(active.querySelectorAll('*'));
    const overflow = [];
    const belowFloor = [];
    const seenOverflow = new Set();

    // Section-level vertical overflow: content taller than the slide.
    if (active.scrollHeight > active.clientHeight + TOL) {
      overflow.push({
        type: 'clipped', axis: 'y', selector: 'section',
        scroll: active.scrollHeight, client: active.clientHeight,
        by: active.scrollHeight - active.clientHeight, text: '(whole slide — content taller than 1080)',
      });
    }

    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      const v = vis(el);
      if (!v.visible || v.opacity < FAINT) continue;

      const cs = getComputedStyle(el);
      const hasText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());

      // (a1) clipped container — its own content overflows its clip box.
      // Horizontal clipping is reported only on a *text run* (a truncated
      // label) — a pure-layout track that clips wider children horizontally is
      // usually a deliberate window (conveyor belt, marquee, terminal log
      // texture), not cut-off prose. Vertical clipping is reported for any
      // container: content taller than its box is a real fit failure.
      const clipsX = cs.overflowX !== 'visible';
      const clipsY = cs.overflowY !== 'visible';
      const overX = clipsX && hasText && el.scrollWidth > el.clientWidth + TOL;
      const overY = clipsY && el.scrollHeight > el.clientHeight + TOL;
      if ((overX || overY) && el.textContent.trim()) {
        const key = `clip:${sel(el)}`;
        if (!seenOverflow.has(key)) {
          seenOverflow.add(key);
          overflow.push({
            type: 'clipped',
            axis: overX && overY ? 'xy' : (overX ? 'x' : 'y'),
            selector: sel(el),
            ellipsis: cs.textOverflow === 'ellipsis',
            scroll: overX ? el.scrollWidth : el.scrollHeight,
            client: overX ? el.clientWidth : el.clientHeight,
            by: overX ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight,
            text: sample(el),
          });
        }
      }

      // (a2) off-canvas text run — escapes the 1920×1080 slide
      if (hasText) {
        const off = (rect.left < secRect.left - TOL) || (rect.top < secRect.top - TOL)
          || (rect.right > secRect.right + TOL) || (rect.bottom > secRect.bottom + TOL);
        if (off) {
          const key = `off:${sel(el)}`;
          if (!seenOverflow.has(key)) {
            seenOverflow.add(key);
            overflow.push({
              type: 'offCanvas',
              selector: sel(el),
              text: sample(el),
              overBy: Math.round(Math.max(
                secRect.left - rect.left, secRect.top - rect.top,
                rect.right - secRect.right, rect.bottom - secRect.bottom)),
              rect: {x: Math.round(rect.left), y: Math.round(rect.top), w: Math.round(rect.width), h: Math.round(rect.height)},
            });
          }
        }
      }

      // (b) below-floor text run
      if (hasText) {
        const px = parseFloat(cs.fontSize);
        if (px && px < floorPx) {
          const fam = cs.fontFamily.toLowerCase();
          belowFloor.push({
            selector: sel(el),
            px: Math.round(px * 10) / 10,
            pt: Math.round((px / 2) * 10) / 10,
            pctHeight: Math.round((px / 1080) * 1000) / 10,
            mono: /mono|jetbrains|consol|courier/.test(fam),
            text: sample(el),
          });
        }
      }
    }

    belowFloor.sort((a, b) => a.px - b.px);
    // Semantic identity of the slide (so the report/progress line names it, not
    // just its number): the section's class (minus the cosmetic `light`) and any
    // data-label. Kept distinct from the filename `label` slug used downstream.
    const cls = String(active.className || '').split(/\s+/).filter((c) => c && c !== 'light').join(' ');
    const dataLabel = active.getAttribute('data-label') || '';
    return {overflow, belowFloor, cls, dataLabel};
  }, {sectionIdx, floorPx});
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch({headless: true});
  } catch (err) {
    if (/Executable doesn't exist|browserType\.launch/.test(String(err))) {
      console.error('Chromium binary is missing. Run: npm run screenshot:setup');
      process.exit(2);
    }
    throw err;
  }

  const states = [];
  try {
    const context = await browser.newContext({viewport: {width: 1920, height: 1080}});
    const page = await context.newPage();
    await gotoDeck(page, url);

    const record = (descriptor, result) => {
      if (result.error) throw new Error(`audit-fit: ${result.error} at section ${descriptor.sectionIdx}`);
      states.push({
        section: descriptor.sectionIdx,
        step: descriptor.step,
        label: slideFilename(descriptor).replace(/\.png$/, ''),
        cls: result.cls,
        dataLabel: result.dataLabel,
        overflow: result.overflow,
        belowFloor: result.belowFloor,
      });
      // Per-state progress line so the offending slide is visible without opening
      // the JSON. Batch-safe: just more stdout, exit codes unchanged.
      const tag = result.cls || result.dataLabel || `section ${descriptor.sectionIdx}`;
      const oc = result.overflow.length;
      const bc = result.belowFloor.length;
      const minPx = bc ? Math.min(...result.belowFloor.map((f) => f.px)) : null;
      const parts = [oc ? `⚠ ${oc} overflow` : '✓ fit'];
      parts.push(bc ? `${bc} below ${floor}px (min ${minPx}px)` : `0 below ${floor}px`);
      console.log(`slide ${descriptor.sectionIdx} step ${descriptor.step} [${tag}]: ${parts.join(' · ')}`);
    };

    if (slide !== null) {
      // Single-section audit (optionally a single step). Mirror screenshot.js setup.
      await disableRail(page);
      await applyExportHidden(page);
      const meta = await page.evaluate((n) => {
        const stage = document.querySelector('deck-stage');
        if (!stage) return {error: 'no-stage'};
        const secs = Array.from(stage.querySelectorAll(':scope > section'));
        if (n < 1 || n > secs.length) return {error: 'range', total: secs.length};
        const max = parseInt(secs[n - 1].getAttribute('data-step-max') || '0', 10);
        return {maxStep: Number.isFinite(max) && max > 0 ? max : 0, total: secs.length};
      }, slide);
      if (meta.error === 'no-stage') throw new Error('No <deck-stage> element found at this URL.');
      if (meta.error === 'range') throw new Error(`--slide ${slide} is out of range (deck has ${meta.total} sections).`);
      if (step !== null && step > meta.maxStep) {
        throw new Error(`--step ${step} is out of range for section ${slide} (data-step-max=${meta.maxStep}).`);
      }
      const steps = step !== null ? [step] : Array.from({length: meta.maxStep + 1}, (_, k) => k);
      for (const k of steps) {
        await goToStep(page, slide, k);
        const result = await measureState(page, slide, floor);
        record({sectionIdx: slide, step: k, maxStep: meta.maxStep, totalSections: meta.total}, result);
      }
    } else {
      // Whole-deck walk (step-aware), reusing the capture walker — which
      // already settles animations before each callback.
      await walkDeck(page, async (descriptor) => {
        const result = await measureState(page, descriptor.sectionIdx, floor);
        record(descriptor, result);
      });
    }
  } finally {
    await browser.close();
  }

  // Aggregate
  const overflowStates = states.filter((s) => s.overflow.length);
  const belowStates = states.filter((s) => s.belowFloor.length);
  const overflowCount = states.reduce((n, s) => n + s.overflow.length, 0);
  const belowCount = states.reduce((n, s) => n + s.belowFloor.length, 0);
  let smallest = null;
  for (const s of states) {
    for (const f of s.belowFloor) {
      if (!smallest || f.px < smallest.px) smallest = {px: f.px, pt: f.pt, label: s.label};
    }
  }
  // Below-floor size distribution, ascending by px: { "16": 4, "24": 3 }.
  const pxCounts = {};
  for (const s of states) for (const f of s.belowFloor) pxCounts[f.px] = (pxCounts[f.px] || 0) + 1;
  const belowFloorByPx = {};
  for (const px of Object.keys(pxCounts).map(Number).sort((a, b) => a - b)) belowFloorByPx[px] = pxCounts[px];

  const report = {
    url,
    floorPx: floor,
    generatedFrom: {
      sections: states.length ? Math.max(...states.map((s) => s.section)) : 0,
      states: states.length,
    },
    summary: {
      states: states.length,
      overflowFindings: overflowCount,
      overflowStates: overflowStates.length,
      belowFloorFindings: belowCount,
      belowFloorStates: belowStates.length,
      smallest,
      belowFloorByPx,
    },
    states,
  };
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  const rel = path.relative(process.cwd(), outPath);
  const smallestStr = smallest ? ` (smallest ${smallest.px}px/${smallest.pt}pt on ${smallest.label})` : '';
  console.log(
    `audit:fit — ${states.length} states · ${overflowCount} overflow` +
    ` · ${belowCount} below ${floor}px floor${smallestStr} → ${rel}`
  );

  if (ci && (overflowCount > 0 || belowCount > 0)) process.exit(1);
  process.exit(0);
})().catch((err) => {
  console.error(err.message || err);
  process.exit(2);
});
