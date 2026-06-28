# Isotope Mail Introduction

Static **deck-kit** deck — the **second Tier-A port** of the Gatsby deck of the
same name (issue #64, migration tracked in `docs/migration/`). Self-contained
HTML/CSS/vanilla-JS under `static/presentations/isotope-introduction/`; no build
step. Boots under `npm run serve:static`.

The original talk (≈early 2019) introduces [Isotope Mail](https://github.com/manusa/isotope-mail),
an open-source web mail client: why it exists, its high-level architecture, the
encrypted client-side storage model, the tech stack, and how it scales.

This deck is **code-free and diagram-free** — pure markup, tech-logo images, and
CSS-positioned layouts — so it carries no highlight.js and no diagram engine.

## Structure

`index.html` is a single `<deck-stage width="1920" height="1080">` with 9
`<section>`s. deck-stage owns ordering, the thumbnail rail, keyboard nav,
fullscreen, the slide number, and PDF pagination. Styling is one hand-ported file,
`styles/deck.css`.

| # | Section (`data-label`) | Ported from | Reveals |
|---|---|---|---|
| 1 | Isotope Mail Introduction | `index.jsx` | cover (title + subtitle) |
| 2 | Why? | `slide1.jsx` | chart + nested reveal list (`data-reveal` 1–4) |
| 3 | Architecture (High level) | `slide2.jsx` | colour-coded logo rows (`data-reveal` 1–4) |
| 4 | Isotope Mail in Action! | `slide3.jsx` | live-demo link |
| 5 | Isotope storage model | `slide4.jsx` | CSS-positioned logo boxes |
| 6 | Back-end Architecture | `slide5.jsx` | back-end list + front-end list revealed (`data-reveal` 1) |
| 7 | Scaling Isotope Mail | `slide6.jsx` | autoscaling illustration |
| 8 | Q&A | `slide-q-and-a.jsx` | static |
| 9 | Summary | `summary.jsx` | static (thank-you + links) |

## What changed from the Gatsby source

The original Gatsby deck (`src/pages/presentations/isotope-introduction/`) has been
removed now that parity is signed off; its landing card in
`src/components/landing-page/index.jsx` now hard-navigates to this static deck
(the same `window.location.href` pattern the other migrated decks use). The port is
faithful slide-for-slide; the mechanics changed as follows:

- **Routing → sections.** The `slideControls` HOC and all `previousPage`/`nextPage`
  plumbing and per-slide JSX files collapse into one `<deck-stage>` with 9
  `<section>`s. deck-stage stamps the slide number and drives nav.
- **`<Helmet><title>` → static `<title>`** in `<head>`. Drops the react-helmet
  dependency.
- **Reveals → declarative `data-reveal` (#56).** `visibleClassNameFromStep(g)` →
  `data-reveal="g-1"`. The three stepped sections are Why? (`slide1`, 4 reveals),
  Architecture (`slide2`, 4 reveals), and Back-end/Front-end Architecture (`slide5`,
  1 reveal — the back-end block is `from(1)` = always visible, the front-end block is
  `from(2)` → `data-reveal="1"`). deck-stage auto-derives each section's
  `data-step-max` from the reveal indices, so step counts are no longer
  hand-maintained; they fire on the same key presses as the Gatsby deck. The Gatsby
  reveal **slide-in-from-right** motion (`_slide.scss` `.hidden{margin-left:100%}` →
  `.visible{transition:margin-left .3s}`) is reproduced via a
  `transform: translateX(100%)` → `0` transition on the `data-reveal` elements.
- **SCSS → plain CSS.** The thin per-slide SCSS (`index/slide1/slide2/slide3/slide5/
  scaling/storage-model/slide-q-and-a/slide-summary`) plus the framework `_slide.scss`
  base are hand-ported to one `styles/deck.css` (custom properties; rems converted to
  deck-px at the framework 16px root, e.g. 6rem→96px, 4rem→64px, 2.5rem→40px). SCSS is
  dropped, not machine-compiled. The two colour-coded box grids (Architecture,
  storage model) keep `box-sizing: content-box` so their thick borders sit outside the
  box height — exactly as the Gatsby default box model, and what keeps the
  Architecture row labels aligned with the bordered boxes.
- **Background-image prefetch hack dropped.** `index.scss` used a `content:url(...)`
  pseudo-element on the cover to warm the image cache; deck-stage and local assets
  make it unnecessary.
- **Assets → optimized WebP.** Each `assets/*.png` source is converted with
  `npm run optimize:images` (lossless — every asset is a logo, icon, chart, or flat
  illustration). The PNG originals are removed with the Gatsby source, leaving one
  optimized set.
- **`<image-slot>` / highlight.js not loaded.** All images are fixed content
  (`<img>` / CSS backgrounds) and the deck is code-free, so the deck loads only
  `deck-stage.js`.
- **Fonts: only weight 400 is loaded**, exactly as the Gatsby deck did
  (`?family=Oswald|Montserrat|Roboto`). The cover `<h1>`/`<h2>` request bold but get a
  synthesized (faux) bold of the 400 Roboto/Oswald face — reproducing the original
  title's lighter look rather than a heavier true-700 face.
- **CSS background `url()`s are relative** (`../assets/…`, resolved against
  `styles/deck.css`): the lock icon (storage model), the autoscaling illustration
  (scaling), and the Isotope logo (summary). deck-stage rebases relative `url()`s in
  the rail-thumbnail CSS snapshot (issue #62 fix), so they resolve in both the live
  slides and the thumbnails.

The original `fade-in` entrances (cover, and the "Let's play!" link) are reproduced
keyed off deck-stage's `[data-deck-active]` so they replay each time a slide is
entered; the PDF export strips that attribute from its clones, so the static export
renders at rest.

## Editing

See the repo `AGENTS.md` for the static-deck workflow (`serve:static`,
`snapshot:baseline`/`diff`, `screenshot:deck`, `audit:fit`, `export:pdf`). The
deck-kit contract lives in `static/deck-kit/README.md`.
