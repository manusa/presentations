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
- **Deck-specific glue scripts** (e.g. the step-reveal handler keyed off `data-step-max`, logo / scene image registries). These remain inline in each deck's `index.html` until 2+ decks share the same contract (see rule #4 below).
- **A build step.** The files here are plain ES2018 — no transpile, no bundle, no minify.

## Stability promise (the five rules)

These are non-negotiable. The components currently power one shipped (or about-to-ship) deck; as more decks adopt them, regressions break talks that have already been given.

1. **Attribute-based opt-in only, never opt-out.** New features gate behind new attributes; unspecified attribute = legacy behavior. Examples: `<deck-stage noscale>` and `<deck-stage no-rail>` add behavior; nothing is opt-out.
2. **Events out, never callbacks/imports in.** Core dispatches `CustomEvent`s; deck code listens. Core never knows about specific decks. Example: the `slidechange` event powers the deck's step-reveal script today.
3. **Append-only attributes, events, and `event.detail` shapes.** Once shipped, frozen. The `contract.spec.js` test (under `tests/deck-kit/`) enforces this mechanically — renaming or removing a name makes it fail loudly.
4. **Composition over feature creep.** Deck-specific behavior stays in the deck until 2+ decks need the same thing.
5. **Breaking change = new filename** (`deck-stage-v2.js`). Old decks keep pointing at the old file.

## Wiring a static deck

Drop both scripts at the bottom of `<body>` with `defer`. Inline registries (logos, scene images) and `data-step-max` step-reveal glue stay inline in the deck for now and run after upgrade because they wait on `DOMContentLoaded`:

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
  <section data-label="01 Title">…</section>
  <section data-label="02 Agenda">…</section>
  <!-- … -->
</deck-stage>

<script src="../../deck-kit/image-slot.js" defer></script>
<script src="../../deck-kit/deck-stage.js" defer></script>
</body>
</html>
```

Attributes the components understand:

- `<deck-stage>` observed: `width`, `height`, `noscale`, `no-rail`.
- `<deck-stage>` slide attributes read on `<section>`s: `data-label`, `data-deck-skip`.
- `<deck-stage>` events: `slidechange` (`{index, previousIndex, total, slide, previousSlide, reason}`) and `deckchange` (`{action, from, to?, slide}`). Both bubble and cross the shadow boundary (`composed: true`).
- `<deck-stage>` API: `index`, `length`, `goTo(i)`, `next()`, `prev()`, `reset()`.
- `<image-slot>` observed: `shape`, `radius`, `mask`, `fit`, `position`, `placeholder`, `src`, `id`.

## Running the test suite

```bash
npm run test:deck-kit
```

Backed by `node --test` (built-in) and the `playwright` package (already installed for `screenshot:*` / `export:pdf`). The suite spins up a tiny static HTTP server, drives Chromium against the fixtures under `tests/deck-kit/fixtures/`, and exercises keyboard nav, rail behavior, print pagination, the contract allowlist, and `<image-slot>` attribute wiring.

Tests should always pass on `main`. A failing `contract.spec.js` likely means the change is breaking the append-only rule — see rule #5 (new filename) before relaxing the allowlist.

## Pointers

- Repo-wide guide: [`CLAUDE.md`](../../CLAUDE.md) (Local Preview, Visual Review, Snapshot Regression Tests, Workflows).
- First consumer: [`static/presentations/2026-devtalks-romania/README.md`](../presentations/2026-devtalks-romania/README.md).
