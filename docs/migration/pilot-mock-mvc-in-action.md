# Pilot port: `mock-mvc-in-action`

The first deck to port, chosen to **drive the Phase-0 deck-kit improvements**,
not to ship quickly. Verifies the authoring model end to end on a small, real
deck before scaling to the rest.

Source: `src/pages/presentations/mock-mvc-in-action/`
Target: `static/presentations/mock-mvc-in-action/`

## Why this deck

- **Small** (10 sections) but not trivial.
- Uses the **foundational** Gatsby pattern: raw `slideControls` HOC,
  per-slide SCSS, `visibleClassNameFromStep` reveals — no deck-specific
  `SlideTemplate`, so the port exercises the *core* mechanics without
  template-wrapper noise.
- **Diagram-free** (confirmed: absent from the `react-archer` usage grep), so it
  isolates the two must-have features — reveals and code highlighting — from the
  Tier-C diagram problem.
- Contains exactly the constructs Phase 0 must solve: progressive reveals
  (improvement 1), 2 code blocks (improvement 3), images, a cover, a summary,
  and a Q&A slide.

Alternative smaller deck `eclipse-jkube-2021-cloud-tool-time` (5 slides) was
rejected as the pilot: it pulls in a deck-local workflow diagram and the
template/`components/` pattern, which couples the first port to harder problems.

## Inventory

10 sections, in order. "Steps" is the Gatsby `totalSteps` arg (default 1 = no
reveal); `data-step-max` is the deck-kit equivalent (`totalSteps - 1`).

| # | Source file | Title | Steps | data-step-max | Constructs |
|---|---|---|---|---|---|
| 1 | `index.jsx` | MockMVC in Action! | 1 | — | cover: title + subtitle; `<Helmet>` title; bg image prefetch |
| 2 | `slide1.jsx` | MockMVC | 3 | 2 | nested `<ul>` reveal list (`from(2)`, `from(3)`) |
| 3 | `slide2.jsx` | Pyramid of testing and MockMVC | 1 | — | image |
| 4 | `slide3.jsx` | Beer CRUD | 1 | — | content/image |
| 5 | `slide4.jsx` | MockMVC Configuration types | 4 | 3 | 3× `<Code language=java>` revealed `from(2..4)` |
| 6 | `slide5.jsx` | Advantages of MockMVC | 5 | 4 | reveal sequence |
| 7 | `slide6.jsx` | 100% Code Coverage | 9 | 8 | long reveal sequence |
| 8 | `slide7.jsx` | Let's get Reactive | 1 | — | content/image |
| 9 | `slide-q-and-a.jsx` | Q&A | 1 | — | static |
| 10 | `slide-summary.jsx` | Summary | 1 | — | static |

Constructs to handle: **reveals** (sections 2, 5, 6, 7 — needs improvement 1),
**code** (section 5 — needs improvement 3), **images** (sections 1, 3, 4, 8 —
plain `<img>` / `<image-slot>` + `optimize:images`), **head/title** (section 1 —
static `<title>`), **per-slide SCSS** (compile once → CSS).

## Mapping rules

### Routing → sections
Drop all `previousPage` / `nextPage` plumbing and per-slide files. Each JSX file
becomes one `<section data-label="…">` child of a single `<deck-stage>`.
`data-label` = the slide title (deck-stage stamps the number).

### `<Helmet><title>` → static `<head>`
One `<title>` in `index.html`. Deletes the react-helmet dependency for this deck.

### Reveals → `data-reveal` (improvement 1)
Per the mapping table in the improvements doc: `classNameVisibleFrom(g)` →
`data-reveal="g-1"`; `data-step-max` auto-derives. Example, section 2 (`slide1`):

```jsx
// Gatsby
<li className={classNameVisibleFrom(2)}>Main entry point…</li>
<li className={classNameVisibleFrom(3)}>Presentation<ul>…</ul></li>
```
```html
<!-- deck-kit (data-step-max auto = 2) -->
<li data-reveal="1">Main entry point…</li>
<li data-reveal="2">Presentation<ul>…</ul></li>
```

### Code → `<pre><code>` + highlight.js (improvement 3)
```jsx
<Code className={classNameVisibleFrom(2)} language='java'>@WebMvcTest annotation</Code>
```
```html
<pre data-reveal="1"><code class="language-java">@WebMvcTest annotation</code></pre>
```

### Styles → plain modern CSS
Hand-port the deck's thin `*.scss` (`index.scss` ~50 lines, per-slide files
≤ ~10 lines) to plain CSS using native nesting + custom properties — SCSS is
dropped (README decisions), not machine-compiled. Link the resulting CSS from
`<head>` in cascade order. The background-image **prefetch hack** in `index.scss`
(`content: url(...)`) is a Gatsby-era optimization; drop it or replace with
`<link rel="preload">`. Move `assets/` and run `optimize:images`.

### Chrome
This deck has minimal chrome (`.slide` → `.title` + `.content`). Keep it inline
for the pilot (improvement 2 is deferred to Phase 1). If repetition bites, use a
cloned `<template>` rather than introducing a new element yet.

## Port recipe

1. Scaffold `static/presentations/mock-mvc-in-action/index.html`: `<head>` with
   `<title>`, tokens/deck CSS, the deck-stage no-FOUC `<style>`; `<body>` with
   `<deck-stage width=1920 height=1080>` and the two deck-kit `<script defer>`s.
2. Add `meta.json` (`title`, `subtitle`, `date`) and a deck-local `README.md`.
3. Convert each JSX file to a `<section>` per the mapping rules above.
4. Hand-port SCSS → plain modern CSS; move and `optimize:images` the assets.
5. Wire highlight.js (vendored, not CDN) + a tokenized mono ≥ 28px theme.
6. `npm run gen:landing` to list it.
7. Verify (below).

## Verification

The static-deck tooling is the safety net (all Gatsby-independent):

- **Visual parity:** `screenshot:deck` the new deck; compare against screenshots
  of the live Gatsby deck (`npm run develop`, capture each slide/step). Reveals
  must trigger on the same key presses.
- **Legibility:** `audit:fit` — no sub-28px must-read runs, code ≥ 28px,
  titles ≥ 72px (`AGENTS.md` floors).
- **No-regression while iterating:** `snapshot:baseline` → edit → `snapshot:diff`.
- **PDF:** `export:pdf` + `test:pdf-links` (no anchors here, but confirms the
  step-aware print path produces the right page count).

## Definition of done

- [ ] Improvement 1 (declarative reveals) implemented in `deck-stage.js` with
      `contract.spec.js` coverage; `npm run test:deck-kit` green.
- [ ] Improvement 3 (highlight.js) wired and vendored.
- [ ] All 10 sections render; reveals on sections 2/5/6/7 match the Gatsby deck
      step-for-step.
- [ ] `audit:fit` clean at the 28px floor.
- [ ] Deck listed by `gen:landing`; boots under `serve:static`.
- [ ] Deck-local `README.md` records what changed vs. the Gatsby source.
- [ ] (Not yet) Gatsby source remains until we are confident; removal of
      `src/pages/presentations/mock-mvc-in-action/` is a separate, explicit step
      once parity is signed off.

## Effort estimate

Once Phase-0 improvements land: **~half a day** of mechanical conversion +
verification for this deck. The improvements themselves (reveals + highlighting
in deck-kit) are the real Phase-0 cost — estimate 1–2 days including
`contract.spec.js` tests — and they are a one-time investment amortized across
all 14 decks.

## Open questions

- Background-image **prefetch hack**: drop entirely, or port to `<link
  rel="preload">`? (Leaning drop — deck-stage preloads the rail anyway.)
- Section 7 component is exported as `Slide4` (copy-paste artifact in the Gatsby
  source) — cosmetic, irrelevant after port; noted so it isn't mistaken for a
  duplicate.
