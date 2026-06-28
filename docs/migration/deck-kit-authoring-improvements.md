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

## 1. Declarative step reveals (DONE — Phase 0, issue #56)

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

### What shipped (#56)

Three opt-in attributes on **any descendant** of a `<section>`, read by
`deck-stage.js`:

- `data-reveal="k"` — shown once `data-step >= k` (the `from` helper).
- `data-reveal-only="k"` — shown only while `data-step === k` (the `in` helper).
- `data-reveal-until="k"` — shown while `data-step <= k` (the `until` helper).

`k` is the 0-based step index (`k=0` is valid — e.g. `data-reveal-only="0"` =
base-state-only; "always visible" = omit the attribute). deck-stage:

1. **Auto-derives the section's `data-step-max`** from the maximum `k` found, so
   the author never counts steps. An explicit `data-step-max` still wins;
   auto-managed sections are tracked (a `WeakSet`) so re-derivation never clobbers
   an author-set value.
2. Toggles the boolean **`[data-revealed]`** hook on each reveal element per its
   rule, and injects a one-time default-hide style
   (`:not([data-revealed]){opacity:0;pointer-events:none}`) into `<head>` so
   un-styled reveals hide with no deck CSS. Decks animate the transition by
   styling the `[data-revealed]` hook — content stays in the markup, indices stay
   next to the content they reveal. Multiple reveal attributes on one element →
   warns and honors the first (`reveal` > `-only` > `-until`).

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

### Contract check & acceptance — met by #56

✅ Attribute-based opt-in (rule 1): no attribute = current behavior. ✅
Append-only (rule 3): adds `data-reveal*` + the `[data-revealed]` hook; existing
`data-step` / `data-step-max` semantics unchanged. ✅ No build step. Documented in
`static/deck-kit/README.md`; covered by `tests/deck-kit/contract.spec.js` and the
`reveal-deck` / `reveal-edge-deck` / `reveal-explicit-deck` fixtures
(`npm run test:deck-kit`). The existing `.s-amplifier` / `.s-flywheel` decks
(explicit `data-step-max`) render identically.

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
  `… -- --verify`). Vendored as a **single served copy** under
  `static/deck-kit/vendor/highlight/` (consolidated there from
  `tests/highlight/fixtures/vendor/highlight/` by the pilot #61, via `git mv`, no
  duplication) so decks load the same files the test uses. The vendored *asset* is
  shared infra; only the init *glue* stays per-deck (rule #4 — see promotion
  trigger below).
- **Authoring contract:** `<pre><code class="language-X">…</code></pre>` —
  `class="language-<lang>"` on the inner `<code>`, nothing else. Indentation is
  preserved (`<pre>` + `white-space: pre`).
- **Init (per-deck glue):** an inline snippet after the vendored lib calls
  `hljs.highlightElement` on **only** the tagged blocks (not `highlightAll`) —
  **no auto-detection**, so output is deterministic. It is wrapped in
  `DOMContentLoaded` because `defer` is ignored on an *inline* script:

  ```html
  <script src="../../deck-kit/vendor/highlight/highlight.js" defer></script>
  <!-- + one <script src> per non-common grammar (dockerfile, groovy, http, properties) -->
  <script>
    addEventListener('DOMContentLoaded', () => {
      if (!window.hljs) {  // engine failed to load — fail clearly, don't throw a cryptic ReferenceError
        console.warn('highlight.js failed to load — code blocks will not be highlighted');
        return;
      }
      document.querySelectorAll('pre code[class*="language-"]').forEach((el) => {
        const lang = (el.className.match(/(?:^|\s)language-([\w-]+)/) || [])[1];
        if (lang && hljs.getLanguage(lang)) hljs.highlightElement(el);  // registered only — never auto-detect
      });
    });
  </script>
  ```

  Two guards, both deliberate: the `!window.hljs` check turns a missing-engine
  failure into a legible warning instead of an uncaught `ReferenceError` (this
  snippet is the template decks copy); and the `getLanguage` check means a bare
  `highlightElement` on an empty or typo'd `language-` class never falls back to
  `hljs.highlightAuto` (which would make output non-deterministic) — the block
  stays plain.
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

The highlight **init glue** ships as **per-deck inline glue now, NOT a deck-kit
core module.** Once a **second** code-bearing deck adopts the same snippet,
promote the init to a shared `static/deck-kit/code-highlight.js` (opt-in via
attribute / `<script>`, per rules #1 and #4). (The vendored *library asset* is
already consolidated under `deck-kit/vendor/` by the pilot — see above — since it
is a shared dependency, not deck-specific glue.) The pilot
(`pilot-mock-mvc-in-action.md`, #61) is the first consumer; the second triggers
the glue promotion.

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
