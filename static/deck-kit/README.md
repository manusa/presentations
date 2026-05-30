# deck-kit

Shared web components that power static HTML slide decks under
`static/presentations/<slug>/`. Repo-local, no npm package boundary, no
build step. Loaded directly via `<script src=…>`.

## What lives here

| File | Purpose |
|---|---|
| `deck-stage.js` | `<deck-stage>` custom element — slide host, keyboard nav, thumbnail rail, fullscreen, print pagination. |
| `image-slot.js` | `<image-slot>` custom element — user-fillable image placeholder with shape/mask/fit/position attributes. |
| `README.md` | This file. |

## What does **not** live here

- **Per-deck content, CSS, assets.** Those stay under `static/presentations/<slug>/`.
- **Deck-specific glue scripts** (e.g. logo / scene image registries; the
  `.s-amplifier` → `data-step-max` auto-stamp loop in the DevTalks deck).
  These remain inline in each deck's `index.html` until 2+ decks share the
  same contract (see rule #4 below). The step-reveal mechanism itself is
  first-class (see `data-step-max` below).
- **A build step.** The files here are plain ES2018 — no transpile, no bundle, no minify.

## Stability promise (the five rules)

These are non-negotiable. The components currently power one shipped (or about-to-ship) deck; as more decks adopt them, regressions break talks that have already been given.

1. **Attribute-based opt-in only, never opt-out.** New features gate behind new attributes; unspecified attribute = legacy behavior. Examples: `<deck-stage noscale>` and `<deck-stage no-rail>` add behavior; nothing is opt-out.
2. **Events out, never callbacks/imports in.** Core dispatches `CustomEvent`s; deck code listens. Core never knows about specific decks. Example: deck slides can listen to `slidechange` to drive their own enter/leave animations.
3. **Append-only attributes, events, and `event.detail` shapes.** Once shipped, frozen. The `contract.spec.js` test (under `tests/deck-kit/`) enforces this mechanically — renaming or removing a name makes it fail loudly.
4. **Composition over feature creep.** Deck-specific behavior stays in the deck until 2+ decks need the same thing.
5. **Breaking change = new filename** (`deck-stage-v2.js`). Old decks keep pointing at the old file.

## Wiring a static deck

Drop both scripts at the bottom of `<body>` with `defer`. Inline per-deck glue (logo / scene-image registries, slide-class auto-stamping) stays inline in the deck and runs after upgrade because it waits on `DOMContentLoaded`:

```html
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="styles/tokens.css">
  <!-- … per-deck CSS … -->
  <style>deck-stage:not(:defined){visibility:hidden}</style>
</head>
<body>
<deck-stage width="1920" height="1080">
  <section data-label="Title">…</section>
  <section data-label="Agenda">…</section>
  <!-- … -->
</deck-stage>

<script src="../../deck-kit/image-slot.js" defer></script>
<script src="../../deck-kit/deck-stage.js" defer></script>
</body>
</html>
```

## Supported API surface

The complete, frozen contract per rule #3. Every name below is asserted by
`tests/deck-kit/contract.spec.js` — renaming or removing any of them must
flow through rule #5 (new filename). Anything **not** listed is an
implementation detail and may change without a filename bump.

### `<deck-stage>` attributes

- `width`, `height` — design viewport (default 1920×1080).
- `noscale` — skip auto-scaling fit-to-viewport; render at 1:1.
- `no-rail` — hide the thumbnail rail.

### `<section>` attributes (read by deck-stage)

- `data-label` — text shown in the rail; required for legible nav.
- `data-deck-present-skip` — hop over this section in prev/next navigation
  **only while presenting** (standalone fullscreen, or a host posting
  `__omelette_presenting`). Off-stage it stays a normal, navigable slide
  carrying a "Skipped" watermark, and it still prints to PDF. Use it to drop
  a slide from one delivery (e.g. a shorter conference slot) without removing
  it from the deck or the handout.
- `data-step-max="N"` — N+1 reveal states (`data-step="0".."N"`). Advance keys
  (ArrowRight / PageDown / Space / Enter) bump `data-step` until it reaches
  `N`, then resume slide advance; retreat keys (ArrowLeft / PageUp) mirror.
- `data-step` — runtime state, managed by deck-stage. Snaps to `0` whenever
  the slide is entered or left. Do not set manually past markup-default `0`.

### Keyboard bindings

- `ArrowRight` / `PageDown` / `Space` / `Enter` — advance step (when
  `data-step-max` in range) or slide.
- `ArrowLeft` / `PageUp` — retreat step or slide.
- `Home` / `End` — first / last slide.
- `0`..`9` — jump to first 10 slides (`1`→1, …, `9`→9, `0`→10).
- `R` — reset to slide 1, step 0.
- `F` — toggle fullscreen.

### URL hash

- `#<integer>` — on load, deep-link to that section index (1-based).
  `#3` lands on the third section. Updated on every nav so an in-iframe
  reload lands on the current slide.

### `<image-slot>` attributes

- `id` — persistence key; required for a dropped image to survive reload.
- `src` — initial / fallback image URL. Set inline (preferred) or via JS.
  A user drop overrides it; clearing the drop reveals `src` again.
- `shape` — `'rect' | 'rounded' | 'circle' | 'pill'` (default `'rounded'`).
- `radius` — corner radius in px for `shape="rounded"` (default 12).
- `mask` — any CSS `clip-path` value. Overrides `shape`.
- `fit` — `'cover' | 'contain' | 'fill'` (default `'cover'`).
- `position` — `object-position` value for `fit=contain|fill` (default `'50% 50%'`).
- `placeholder` — empty-state caption (default `'Drop an image'`).

### `<image-slot>` CSS hooks

- `[data-filled]` — set on the host once `src` (or a user drop) resolves.
  Use `image-slot[data-filled] { … }` for fill-only styling.
- `::part(frame)` / `::part(image)` / `::part(empty)` / `::part(ring)` —
  expose the inner crop frame, the inner `<img>`, the empty-state container,
  and the dashed drop-target ring for external styling.

### Events

Both events bubble and cross the shadow boundary (`composed: true`), so
listeners attach either on the `<deck-stage>` element or on `document`.

- `slidechange` — fires on every slide transition, including the initial
  mount. `event.detail = { index, previousIndex, total, slide, previousSlide, reason }`
  where `reason ∈ { 'init', 'keyboard', 'click', 'tap', 'api', 'mutation' }`.
- `deckchange` — fires on rail-driven mutations (move / delete).
  `event.detail = { action, from, to?, slide }` where
  `action ∈ { 'delete', 'move' }` (`to` only present for `'move'`).

### `<deck-stage>` JavaScript API

- `index` — current 0-based slide index (read-only).
- `length` — slide count (read-only).
- `goTo(i)` — navigate to a 0-based index.
- `next()` / `prev()` — advance / retreat one slide.
- `reset()` — back to slide 0.

## Running the test suite

```bash
npm run test:deck-kit
```

Backed by `node --test` (built-in) and the `playwright` package (already installed for `screenshot:*` / `export:pdf`). The suite spins up a tiny static HTTP server, drives Chromium against the fixtures under `tests/deck-kit/fixtures/`, and exercises keyboard nav, rail behavior, print pagination, the contract allowlist, and `<image-slot>` attribute wiring.

Tests should always pass on `main`. A failing `contract.spec.js` likely means the change is breaking the append-only rule — see rule #5 (new filename) before relaxing the allowlist.

## Pointers

- Repo-wide guide: [`CLAUDE.md`](../../CLAUDE.md) (Local Preview, Visual Review, Snapshot Regression Tests, Workflows).
- First consumer: [`static/presentations/2026-devtalks-romania/README.md`](../presentations/2026-devtalks-romania/README.md).
