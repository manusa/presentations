# deck-kit authoring improvements

The improvements that make deck-kit comfortable for a **human** to author, each
derived from a real construct the Gatsby decks rely on. Every item is checked
against the deck-kit five rules (`static/deck-kit/README.md`): attribute-based
opt-in, events-out, append-only, composition-over-creep, new-filename-on-break.

**None of these introduce a build step.** They are runtime web-component
behavior. That is the whole point: we get Gatsby's authoring comforts back
without the toolchain we are removing.

Priority order: **1 and 3 are required before any code-bearing deck can be ported
comfortably** (Phase 0). 2 is a strong Phase-1 follow-up. 4–6 are supporting
tooling.

---

## 1. Declarative step reveals (REQUIRED — Phase 0)

### Problem

Progressive reveal is the single most-used interactive feature across every
Gatsby deck. The HOC exposes three helpers
(`src/components/slide-controls/slide-controls.jsx`):

```js
visibleClassNameFromStep(currentStep)(step)   // visible once currentStep >= step
visibleClassNameInStep(currentStep)(step)     // visible only when currentStep === step
visibleClassNameUntilStep(currentStep)(step)  // visible while currentStep <= step
```

Authoring is one attribute per element: `className={classNameVisibleFrom(2)}`.
`currentStep` starts at **1**; `totalSteps` is declared once per slide.

In deck-kit today the equivalent is **hand-written**: set `data-step-max="N"` on
the `<section>` (and keep N in sync by counting), then write a CSS selector per
revealed element:

```css
.s-flywheel[data-step="1"] .wheel { opacity: 1; transform: none; }
```

This is the #1 source of the "machine-oriented" feel: indices counted by hand,
kept in sync by hand, expressed as verbose CSS instead of next to the content.

### Proposal

Three new opt-in attributes on **any descendant** of a `<section>`, read by
`deck-stage.js`:

- `data-reveal="k"` — hidden until `data-step >= k` (the `from` helper).
- `data-reveal-only="k"` — visible only when `data-step === k` (the `in` helper).
- `data-reveal-until="k"` — visible while `data-step <= k` (the `until` helper).

`k` is 1-based on the *advance* count (`k=1` = appears on the first ArrowRight;
"always visible" = simply no attribute). deck-stage:

1. On upgrade, scans each `<section>` for reveal attributes and **auto-derives
   `data-step-max`** = the maximum `k` found. (Author no longer counts steps.
   An explicit `data-step-max` still wins, for hand control.)
2. On every step change, toggles the boolean `hidden` attribute (or a documented
   `[data-revealed]` hook) on each element per its reveal rule. Decks style the
   transition via CSS on that hook — content stays in the markup, indices stay
   next to the content they reveal.

### Gatsby → deck-kit mapping

deck-kit `data-step` is 0-based (0 = base); Gatsby `currentStep` is 1-based.
So a Gatsby reveal index `g` becomes deck-kit `k = g - 1`, and
`totalSteps = N` becomes `data-step-max = N - 1` — but with auto-derivation the
author stops thinking in raw indices and just numbers the reveals 1, 2, 3…

| Gatsby | deck-kit |
|---|---|
| `classNameVisibleFrom(2)` | `data-reveal="1"` |
| `classNameVisibleFrom(3)` | `data-reveal="2"` |
| `classNameInStep(2)` | `data-reveal-only="1"` |
| `classNameUntilStep(2)` | `data-reveal-until="1"` |
| `slideControls(C, …, totalSteps=4)` | auto-derived (was `data-step-max="3"`) |

### Contract check

✅ Attribute-based opt-in (rule 1): no attribute = current behavior, existing
decks unaffected. ✅ Append-only (rule 3): adds `data-reveal*` names; the
existing `data-step` / `data-step-max` contract is unchanged (explicit
`data-step-max` still honored). ✅ No build step.

### Acceptance criteria

- A `<section>` with `data-reveal="1"`/`"2"` and no `data-step-max` reports
  `data-step-max` of 2 and reveals correctly under ArrowRight.
- Explicit `data-step-max` overrides the auto-derived value.
- `screenshot:deck` / `audit:fit` walk the new states (they already key off
  `data-step-max`, so this must be set before they run — auto-derivation makes
  that automatic).
- New `contract.spec.js` assertions for the three attribute names.
- The existing `.s-amplifier` / `.s-flywheel` decks still render identically
  (they set `data-step-max` explicitly).

---

## 2. Slide-chrome template element (deferred — rule #4)

### Problem

Every Gatsby deck wraps its slides in a template that supplies a header (title +
logo), a footer (avatar + page number), and the slide number — `InteriorSlideTemplate`
(`src/components/slides/interior-slide-template.jsx`) and the per-deck
`SlideTemplate` wrappers (2023+). Authors write `<SlideTemplate slide={3}
title='…'>…</SlideTemplate>` and the chrome + page number come for free.

deck-kit has no equivalent: the Romania/Valencia decks hand-copy a
`chrome-top` / `chrome-bottom` block into every `<section>`, including the page
"pill" counted by hand. Changing the chrome means editing every section.

### Proposal

A generic, **structure-only** `<deck-slide>` element (own file, e.g.
`deck-slide.js`) providing named slots and an **auto-filled page number** read
from the element's index within `<deck-stage>` (deck-stage already stamps
`data-screen-label="NN Label"`; expose it). All visual styling stays in deck CSS
via `::part()` / slotted selectors, so it carries no deck-specific look — that
keeps it composition-friendly (rule 4).

```html
<deck-slide label="Configuration types">
  <div slot="body"> … </div>
  <!-- header title + page number rendered by the element; styled by deck CSS -->
</deck-slide>
```

### Contract check

⚠️ Rule 4 (composition over creep) says deck-specific behavior waits for 2+
decks, and we are honoring that. The *structure + page number* is generic, but
real decks differ in chrome (terminal window vs. logo header). **Recommendation:**
keep chrome inline (an HTML `<template>` cloned per section is enough to kill
copy-paste without new contract surface). Create the `<deck-slide>` element only
once 2+ decks genuinely share the shape — triggered by real sharing, not a fixed
phase. New element = new file (rule 5 applies only to *breaking* existing files,
which this does not).

### Acceptance criteria (when promoted)

- Page number auto-matches slide position; no hand-counted pills.
- Pure structure: a deck with no custom chrome CSS renders an unstyled but
  correct header/body/footer.
- `contract.spec.js` covers the new element's attributes/parts.

---

## 3. Build-less syntax highlighting (DONE — Phase 0, issue #59)

### Problem

Code blocks are everywhere (mock-mvc 2, 2023-helm 16, 2024-reactive 24,
2025-mcp 25). Gatsby uses `react-syntax-highlighter` via a `<Code language='java'>`
component that highlights at runtime and strips indentation. deck-kit has no
equivalent; the Romania deck fakes "code" with hand-marked-up `<span>`s, which
does not scale to real source listings.

### What shipped (#59)

**highlight.js**, vendored — a static script, no build, runs in the browser.

- **Vendored** at an exact pin (11.11.1, non-minified engine), no CDN, with a
  provenance README + sha256 manifest. Source of truth + refresher:
  `scripts/vendor-highlight.js` (`npm run vendor:highlight`,
  `… -- --verify`). Lives next to its first consumer, not in `deck-kit/`
  (rule #4 — see promotion trigger below). Reference copy:
  `tests/highlight/fixtures/vendor/highlight/`.
- **Authoring contract:** `<pre><code class="language-X">…</code></pre>` —
  `class="language-<lang>"` on the inner `<code>`, nothing else. Indentation is
  preserved (`<pre>` + `white-space: pre`).
- **Init (per-deck glue):** an inline snippet after the vendored lib calls
  `hljs.highlightElement` on **only** the tagged blocks (not `highlightAll`) —
  **no auto-detection**, so output is deterministic. It is wrapped in
  `DOMContentLoaded` because `defer` is ignored on an *inline* script:

  ```html
  <script src="vendor/highlight/highlight.js" defer></script>
  <!-- + one <script src> per non-common grammar (dockerfile, groovy, http, properties) -->
  <script>
    addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('pre code[class*="language-"]').forEach((el) => {
        const lang = (el.className.match(/(?:^|\s)language-([\w-]+)/) || [])[1];
        if (lang && hljs.getLanguage(lang)) hljs.highlightElement(el);  // registered only — never auto-detect
      });
    });
  </script>
  ```

  The `getLanguage` guard matters: a bare `highlightElement` on an empty or
  typo'd `language-` class falls back to `hljs.highlightAuto`, which would make
  output non-deterministic — the guard skips those, leaving the block plain.
  Ordering vs deck-stage is a non-issue: rail thumbnails materialize lazily,
  deck-stage's `MutationObserver` re-clones a thumb when highlighting rewrites
  its text, and `hljs.highlightElement` is idempotent (sets `data-highlighted`).
- **Theme & legibility:** a vendored **dark** theme (`github-dark`) loaded in
  `<head>`; a thin `--hl-*` custom-property override layer (loaded *after* the
  theme so it wins at equal specificity) lets a deck recolor any token without
  editing the vendored file. Code size is driven once by a **mono token**
  (`--type-mono`, ≥ 28px), never per-block (`feedback-css-principled-not-magic-numbers`).

### Contract check

✅ No build step (static `<script>`). ✅ **No** change to `deck-stage.js` or the
deck-kit append-only contract (`tests/deck-kit/contract.spec.js`) — purely
additive, per-deck glue. Verified by `tests/highlight/highlight.spec.js`
(`npm run test:highlight`).

### Promotion trigger (document, do not build yet — rule #4)

Highlighting ships as **per-deck glue now, NOT a deck-kit core module.** Once a
**second** code-bearing deck adopts the same snippet, promote the init to a
shared `static/deck-kit/code-highlight.js` (opt-in via attribute / `<script>`,
per rules #1 and #4) and move the vendored lib under `deck-kit/`. The pilot
(`pilot-mock-mvc-in-action.md`) is the first consumer; the second triggers the
promotion.

### Acceptance criteria — met by #59

- `<pre><code class="language-*">` renders highlighted, indentation preserved. ✅
- Mono renders ≥ 28px; `audit:fit --floor 28` reports no sub-floor code runs. ✅
- Works offline / `file://`-served (vendored, no CDN). ✅
- Composes with #1 reveals (`<pre data-reveal="1">` reveals *and* stays highlighted). ✅

---

## 4. Reusable content primitives (deferred — rule 4)

Patterns like the "about me" card, ad/book cover, and bullet lists recur across
decks. Resist extracting these until 2+ ported decks demonstrably share the same
shape (rule 4). Track candidates here as they appear; do not pre-build.

Current candidates (not yet justified): about-me card, book-cover image block,
agenda list.

---

## 5. Authoring scaffolder (supporting tooling — not deck-kit core)

Reduce the copy-paste of starting a new deck or slide. Repo `scripts/`, not
deck-kit:

- `npm run new:deck -- <slug>` — emit `static/presentations/<slug>/` with
  `index.html` (deck-kit wired), `styles/tokens.css` seed, `meta.json`, `README.md`.
- `npm run new:slide` (or a snippet) — emit a `<section data-label="…">` /
  `<deck-slide>` skeleton.

Acceptance: a new deck boots in `serve:static` with zero hand-wiring of the
deck-kit `<script>` tags.

## 6. Migration helpers (supporting tooling — not deck-kit core)

- **Styles are hand-ported to plain modern CSS** (native nesting + custom
  properties), not machine-compiled — SCSS is dropped (see README decisions), and
  the committed CSS has to stay human-maintainable. Most legacy decks have thin
  per-slide SCSS, so this is quick.
- **`capture:diagram`** — for Tier-C `react-archer` diagrams: load the final
  `gatsby build` page in the existing Playwright harness, read the rendered
  `<svg>` for a diagram, and emit static SVG markup to inline in the ported
  section. Avoids reimplementing the runtime connector engine for frozen decks.

Acceptance: a ported Tier-C slide shows the same diagram as the Gatsby original
in a `snapshot:diff` against a screenshot of the live Gatsby page.
