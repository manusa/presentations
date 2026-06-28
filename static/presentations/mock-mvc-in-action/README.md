# MockMVC in Action!

Static **deck-kit** deck — the **Phase-1 pilot port** of the Gatsby deck of the
same name (issue #61, migration tracked in `docs/migration/`). Self-contained
HTML/CSS/vanilla-JS under `static/presentations/mock-mvc-in-action/`; no build
step. Boots under `npm run serve:static`.

The original talk (≈2019) walks through Spring's `MockMVC`: the test pyramid, a
Beer CRUD example, the three MockMVC configuration types, a "100% code coverage"
walkthrough, and a reactive teaser.

## Structure

`index.html` is a single `<deck-stage width="1920" height="1080">` with 10
`<section>`s. deck-stage owns ordering, the thumbnail rail, keyboard nav,
fullscreen, the slide number, and PDF pagination. Styling is one hand-ported file,
`styles/deck.css`; code highlighting is vendored highlight.js loaded from the
shared `static/deck-kit/vendor/highlight/`.

| # | Section (`data-label`) | Ported from | Reveals / code |
|---|---|---|---|
| 1 | MockMVC in Action! | `index.jsx` | cover (title + subtitle) |
| 2 | MockMVC | `slide1.jsx` | nested reveal list (`data-reveal` 1–2) |
| 3 | Pyramid of testing and MockMVC | `slide2.jsx` | image |
| 4 | Beer CRUD | `slide3.jsx` | image |
| 5 | MockMVC Configuration types | `slide4.jsx` | 3 code blocks, cumulative (`data-reveal` 1–3) |
| 6 | 100% Code Coverage | `slide5.jsx` | 4 code blocks swapped in place (`data-reveal-only` 1–4); last paints covered lines green |
| 7 | Advantages of MockMVC - What can you test | `slide6.jsx` | reveal list (`data-reveal` 1–8) |
| 8 | Let's get Reactive | `slide7.jsx` | full-bleed photo + pulsing logo |
| 9 | Q&A | `slide-q-and-a.jsx` | static |
| 10 | Summary | `slide-summary.jsx` | static (thank-you + links) |

## What changed from the Gatsby source

The original Gatsby deck (`src/pages/presentations/mock-mvc-in-action/`) has been
removed now that parity is signed off; its landing card in
`src/components/landing-page/index.jsx` now hard-navigates to this static deck
(the same `window.location.href` pattern the other migrated decks use). The port
is faithful slide-for-slide; the mechanics changed as follows:

- **Routing → sections.** The `slideControls` HOC and all `previousPage`/`nextPage`
  plumbing and per-slide JSX files collapse into one `<deck-stage>` with 10
  `<section>`s. deck-stage stamps the slide number and drives nav.
- **`<Helmet><title>` → static `<title>`** in `<head>`. Drops the react-helmet
  dependency.
- **Reveals → declarative `data-reveal*` (#56).** `visibleClassNameFromStep(g)` →
  `data-reveal="g-1"` (cumulative); `visibleClassNameInStep(g)` →
  `data-reveal-only="g-1"` (swap-in-place, slide 6). deck-stage auto-derives each
  section's `data-step-max` from the reveal indices, so the step counts are no
  longer hand-maintained. They fire on the same key presses as the Gatsby deck.
  The Gatsby reveal **slide-in-from-right** motion (`_slide.scss`
  `.hidden{margin-left:100%}` → `.visible{transition:margin-left .3s}`) is
  reproduced via a `transform: translateX(100%)` → `0` transition on the
  `data-reveal` elements (lists/code on slides 2/5/7). The `data-reveal-only`
  blocks on slide 6 deliberately get no transition — the original swapped them in
  place instantly (`slide5.scss transition:none`).
- **`<Code language="java">` → `<pre><code class="language-java">` + vendored
  highlight.js (#59).** The Gatsby `Code` component stripped a common leading
  indent; that indentation is reproduced inline in the markup here. Theme is
  `github-dark` + a `--hl-*` override layer (the Gatsby deck used `androidstudio`),
  per the shipped #59 contract. Code size is one token (`--type-mono`, **40px**),
  matching the Gatsby code (which inherited the slide's 2.5rem body size) — well
  above the 28px mono floor.
- **`lineProps` coverage stripe → `data-cov-lines` + post-highlight glue.** Slide 6's
  payoff (the final code block highlighting the covered lines green) is reproduced
  by a small inline glue step that wraps each highlighted line and flags the
  covered ones. Line numbers are data on the `<code>` (`data-cov-lines`), not pixel
  offsets. Swap-in-place blocks are stacked in a single CSS grid cell so the
  opacity-hidden ones don't shift layout (the Gatsby version used `display:none`).
- **SCSS → plain CSS.** The thin per-slide SCSS + the framework `_slide.scss` base
  are hand-ported to one `styles/deck.css` (custom properties; rems converted to
  deck-px at the framework 16px root, e.g. 4rem→64px). SCSS is dropped, not
  machine-compiled.
- **Background-image prefetch hack dropped.** `index.scss` used a `content:url(...)`
  pseudo-element to warm the image cache; deck-stage and local assets make it
  unnecessary.
- **Assets → optimized WebP.** Each `assets/*` source is converted with
  `npm run optimize:images` (lossless for logos/diagrams/silhouette, lossy for the
  beer-bottle render and the reactor photo). The huge `pyramid-of-testing.png`
  (6250px) is downscaled to 3840px.
- **`<image-slot>` not loaded.** All images are fixed content (`<img>` / CSS
  backgrounds); the deck uses no user-fillable placeholders, so only `deck-stage.js`
  is loaded.
- **Fonts: only weight 400 is loaded**, exactly as the Gatsby deck did
  (`?family=Oswald|Montserrat|Roboto`). The cover `<h1>`/`<h2>` request bold but get
  a synthesized (faux) bold of the 400 Roboto/Oswald face — reproducing the original
  title's lighter look rather than a heavier true-700 face.
- **CSS background `url()`s are root-absolute** (`/presentations/mock-mvc-in-action/assets/…`).
  deck-stage's rail thumbnails adopt a *constructed* stylesheet whose base URL is the
  document, not `styles/deck.css`, so a `../assets/…` relative URL would 404 in the
  thumbnails (this deck is the first with CSS-relative backgrounds). The deck always
  deploys at this path. A deck-kit-side fix (rewriting relative `url()`s during the
  rail CSS snapshot) is tracked as a follow-up so future decks can use relative URLs.

All the original animations are reproduced. The two infinite decorative loops — the
Project Reactor logo pulse (slide 8) and the mockingbird silhouette colorize (slide
10) — run continuously. The per-slide one-shot `fade-in` entrances (cover, the
pyramid, the beer bottle, the reactor logo) are keyed off deck-stage's
`[data-deck-active]` so they replay each time a slide is entered; the PDF export
strips that attribute from its clones, so the static export renders at rest.

## Editing

See the repo `AGENTS.md` for the static-deck workflow (`serve:static`,
`snapshot:baseline`/`diff`, `screenshot:deck`, `audit:fit`, `export:pdf`). The
deck-kit contract lives in `static/deck-kit/README.md`.
