# Gatsby → deck-kit migration

Status: **analysis / planning**. No code has been migrated yet. This directory is
the design record for moving every historical Gatsby/React deck into the static
`deck-kit` format so that **Gatsby can be removed from the project entirely**.

## Why

Gatsby is effectively unmaintained. Keeping it costs us a large, churning
dependency tree (recent git history is dominated by gatsby / gatsby-plugin-*
security bumps), it blocks React 19 (see `AGENTS.md` → react-helmet SSG note),
and it is a second, parallel way of authoring decks that every contributor has
to understand.

We already have a maintained, build-less alternative: the static `deck-kit`
decks under `static/presentations/`. The plan is to **port the Gatsby decks into
deck-kit, one at a time, simplest first**, improving deck-kit's human-authoring
ergonomics as each port surfaces a gap. When the last deck is ported, Gatsby and
React drop out of `package.json` and the build step becomes "copy `static/` to
`public/`".

This is a genuine port (content moves into the new format), **not** a freeze of
the built HTML. The goal is a single, maintainable authoring model.

## Two workstreams

The migration has two intertwined tracks. Neither is useful alone:

1. **Make deck-kit pleasant for humans.** The current single-`index.html`
   format is machine-oriented: 4,000-line files, copy-pasted slide chrome,
   hand-managed step indices, no code highlighting. These are the things that
   made the Gatsby decks comfortable to author. See
   [`deck-kit-authoring-improvements.md`](./deck-kit-authoring-improvements.md).
2. **Port the decks.** Mechanical per-slide conversion, graded by difficulty.
   The first port ([`pilot-mock-mvc-in-action.md`](./pilot-mock-mvc-in-action.md))
   exists to *drive* workstream 1, not to ship fast.

Each authoring improvement must respect the deck-kit "five rules"
(`static/deck-kit/README.md`): attribute-based opt-in, events out / no imports
in, append-only contract, composition over feature creep, breaking change = new
filename. Crucially, **none of these improvements reintroduce a build step** —
they are runtime web-component behavior, which is what keeps deck-kit free of the
toolchain we are trying to delete.

## Deck inventory & difficulty tiers

14 Gatsby decks, ~161 slide files under `src/pages/presentations/`. Graded by the
hardest construct each one contains (counts from `grep`, see this doc's commit
message / the pilot doc for method):

### Tier A — legacy, near-pure markup (start here)

Plain `slideControls` HOC, per-slide SCSS, no runtime diagrams, 0–2 code blocks.

| Deck | Slides | Code blocks | Diagrams | Notes |
|---|---|---|---|---|
| `mock-mvc-in-action` | 10 | 2 | none | **Pilot.** Reveal lists, 2 `<Code>`, images, cover/summary/Q&A. |
| `isotope-introduction` | ~7 | ~0 | none | Legacy, image-heavy. |
| `eclipse-jkube-2021-cloud-tool-time` | 5 | 2 | 1 workflow diagram | Smallest, but uses a deck-local diagram + template pattern. |

### Tier B — template-based, code-heavy, occasional diagram

Deck-specific `SlideTemplate` wrapper (header/footer/branding), per-deck `styles/`,
several `<Code>` blocks, sometimes one workflow diagram.

`eclipse-jkube-introduction`, `eclipse-jkube-2020-bcn-jug`,
`eclipse-jkube-2021-devconf-cz`, `2021-eclipsecon-kubernetes-gradle-plugins`,
`2022-eclipsecon-whats-up-doc`, `2023-madridjug-jkube-remote-dev`,
`2023-eclipsecon-helm-for-java-developers`.

### Tier C — diagram-heavy + code-heavy (long pole)

Many runtime-computed `react-archer` connector diagrams and/or large code volume.
These are the hardest because the diagrams compute SVG arrows between DOM anchors
at runtime; there is no build-less drop-in.

`2022-kubernetes-for-java-developers` (15),
`2024-devbcn-full-stack-reactive-application` (23, 24 code blocks, 6 diagrams),
`2025-devbcn-model-context-protocol-servers` (24, 25 code blocks, 3 diagrams).

**Tier C diagram strategy:** these decks are delivered and frozen. The pragmatic
port is to capture the *rendered* SVG/DOM of each diagram from the final
`gatsby build` output and inline it as static markup, rather than reimplementing
the connector engine. A small capture helper is proposed in the improvements doc.

## End-state checklist (when the last deck is ported)

Cross-checked against the current Gatsby touchpoints. None of these is hard once
no deck depends on Gatsby:

- [ ] Remove `gatsby`, `gatsby-plugin-react-helmet`, `gatsby-plugin-sass`,
      `react`, `react-dom`, `react-helmet`, `react-archer`,
      `react-syntax-highlighter`, `sass` from `package.json` dependencies.
- [ ] Delete `gatsby-config.js`, `gatsby-browser.js`, `gatsby-ssr.js`, `src/`.
- [ ] Replace the `build` script (`gatsby clean && gatsby build`) with a copy of
      `static/` → `public/` (+ `gen:landing`).
- [ ] Switch the production landing from the React page (`src/pages/index.jsx`)
      to the already-existing static `gen:landing` output (`static/index.html`),
      extending it to list the ported decks (it already auto-discovers
      `static/presentations/*`).
- [ ] Move the jQuery `<script>` injection (currently `gatsby-ssr.js`) into the
      decks that actually need it, or drop it.
- [ ] Update `.github/workflows/publish-gh-pages.yml` and `publish-npm.yml`
      build steps. `index.js` (Express, serves `public/`) and
      `replaceDependencies.sh` keep working unchanged.
- [ ] Confirm `static/CNAME` still lands in `public/`.

The static-deck tooling (`serve:static`, `screenshot*`, `snapshot*`,
`audit:fit`, `export:pdf`, `optimize:images`, `gen:landing`, `test:deck-kit`,
`test:pdf-links`) is already Gatsby-independent and survives untouched — it is
how we will verify each port.

## Phased plan

- **Phase 0 — deck-kit foundations (blocks everything).** Land the two
  must-have authoring features via the pilot: declarative step reveals and
  build-less code highlighting. See the improvements doc, items 1 & 3.
- **Phase 1 — Tier A.** Port the 3 legacy decks. Confirm the authoring model is
  comfortable before scaling. Promote the slide-chrome template (improvement 2)
  if the second deck wants it (rule #4).
- **Phase 2 — Tier B.** Port the template-based decks. Most effort is volume of
  code blocks (now cheap once highlighting exists) and per-deck theming.
- **Phase 3 — Tier C.** Port the diagram-heavy decks using the captured-SVG
  strategy.
- **Phase 4 — cut Gatsby.** Execute the end-state checklist.

## How to turn this into issues

Each improvement (improvements doc) and each Phase/deck above is written to be
issue-ready (title, scope, acceptance criteria). Per repo convention, tracker
issues live in `manusa/com.marcnuri.automated-tasks`, referenced as
`manusa/com.marcnuri.automated-tasks#N`. File the Phase-0 improvements first;
they unblock the rest.

## Decisions (resolved)

- **Plain CSS, no SCSS.** SCSS is dropped entirely. Modern CSS (native nesting,
  custom properties, `@layer`) covers what we used SCSS for, so new decks are
  authored in plain CSS and the `sass` dependency goes away at end-state. Porting
  a deck means hand-converting its (mostly thin) SCSS to plain modern CSS — not
  machine-compiling it, since the committed result has to stay human-maintainable.
- **No premature generics (rule #4).** Shared slide chrome / content components
  become a generic deck-kit element only once 2+ decks genuinely share the shape —
  the deck-kit rules exist for a reason. On the pilot, chrome stays inline (a
  cloned `<template>` is enough). See improvements doc items 2 & 4.
- **Slide URLs change, and that's fine.** Gatsby per-slide routes
  (`/presentations/<slug>/slideN`) were never a feature; the deck-kit
  `/presentations/<slug>/#N` URLs are the going-forward form. No inbound-link
  audit needed.
