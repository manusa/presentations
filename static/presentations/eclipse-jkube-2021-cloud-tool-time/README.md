# Deploying a Quarkus application into Kubernetes using JKube

Static **deck-kit** deck — the **third Tier-A port** of the Gatsby deck
`eclipse-jkube-2021-cloud-tool-time` (issue #67, migration tracked in
`docs/migration/`). With this port **Tier A is complete**. Self-contained
HTML/CSS/vanilla-JS under `static/presentations/eclipse-jkube-2021-cloud-tool-time/`;
no build step. Boots under `npm run serve:static`.

The talk (Eclipse Cloud Tool Time, Feb 2021) introduces
[Eclipse JKube](https://www.eclipse.org/jkube/) and deploying a Quarkus app to
Kubernetes/OpenShift with it.

This deck is **code-free** (no highlight.js) and **diagram-engine-free** — the
developer-workflow illustration is a hand-authored static `<svg>`, not
`react-archer`, so no diagram-capture tooling is involved.

## Structure

`index.html` is a single `<deck-stage width="1920" height="1080">` with 6
`<section>`s. deck-stage owns ordering, the thumbnail rail, keyboard nav,
fullscreen, and PDF pagination. Styling is one hand-ported file, `styles/deck.css`.

| # | Section (`data-label`) | Ported from | Notes |
|---|---|---|---|
| 1 | Deploying a Quarkus application into Kubernetes using JKube | `index.jsx` | `TitleTemplate` cover: ECDTools logo + title/subtitle over the jumbotron |
| 2 | About me | `slide-010.jsx` | `SlideTemplate`; Avatar SVG + bio + contact links |
| 3 | Agenda | `slide-020.jsx` | `SlideTemplate`; nested list |
| 4 | What is Eclipse JKube? | `slide-030.jsx` | `SlideTemplate`; 3-step reveal (`data-reveal` 1–2) |
| 5 | What is Eclipse JKube? Kubernetes Maven Plugin | `slide-040.jsx` | `SlideTemplate`; rotated JKube logo + static workflow diagram |
| 6 | Thank you! | `slide-050.jsx` | `TitleTemplate`; thank-you + reach-out links + JKube logo |

## What changed from the Gatsby source

The Gatsby deck (`src/pages/presentations/eclipse-jkube-2021-cloud-tool-time/`) has
been removed now that parity is signed off; its landing card in
`src/components/landing-page/index.jsx` now hard-navigates to this static deck (the
`window.location.href` pattern the other migrated decks use). The port is faithful
slide-for-slide; the mechanics changed as follows:

- **Routing → sections.** The `slideControls` HOC and all `previousPage`/`nextPage`
  plumbing and per-slide JSX files collapse into one `<deck-stage>` with 6
  `<section>`s. deck-stage drives nav.
- **`<Helmet><title>` → static `<title>`** in `<head>`. Drops react-helmet.
- **Deck-specific chrome inlined.** `SlideTemplate` (orange Oswald header bar;
  footer = ECDTools logo + page number + JKube logo) and `TitleTemplate`
  (cover/thank-you over the jumbotron) are reproduced inline as plain markup +
  CSS. Per migration rule #4 the generic `<deck-slide>` element is **not**
  introduced. The footer page numbers (1–4) are baked into each interior slide so
  they survive into the PDF, independent of deck-stage's own rail numbering.
- **React SVG components → static SVG.** The four React SVG components are inlined
  as plain SVG (JSX attrs converted: `className`→`class`, `strokeWidth`→
  `stroke-width`, `stopColor`→`stop-color`, etc.; `{...props}` dropped):
  - **ECDTools logo** and **JKube logo** are repeated chrome, so each is defined
    **once** as an `<svg><symbol>` and `<use>`d on the cover, the four footers,
    slide 5, and the thank-you slide. They are recolored per instance through
    inherited CSS custom properties (`--ecd-label`, `--jkube-icon`,
    `--jkube-text`) that cross the `<use>` shadow boundary — so the repeated
    markup carries **no duplicate-id collisions** and the original two-tone
    recolors (footer 85 %-white, cover white, slide-5 white text, thank-you blue
    icon) are preserved. (The unused `assets/ecdtools-logo-white.png` raster from
    the Gatsby deck is dropped — the cover/footer logo is the inline SVG, which is
    what the Gatsby deck actually rendered.)
  - The **Avatar** (static, unanimated, un-recolored) is a standalone
    `assets/avatar.svg` referenced with a plain `<img>`, keeping `index.html` lean.
  - The **developer-workflow diagram** is inlined **light-DOM** (not `<use>`/`<img>`)
    because it needs the page's Roboto font and the `.k8s-text` fade-in, neither of
    which an isolated SVG document gets. Its `MyriadPro-Regular` font (never loaded)
    now falls back to `'Roboto', sans-serif` — the family the Gatsby slide CSS set
    on the diagram container as the design intent, and legible at projector scale.
- **Reveals → declarative `data-reveal` (#56).** Slide 4's
  `visibleClassNameFromStep(2)`→`data-reveal="1"`, `(3)`→`data-reveal="2"`;
  deck-stage auto-derives `data-step-max = 2`, so the 3-step reveal fires on the
  same key presses as the Gatsby deck. The Gatsby reveal **slide-in-from-right**
  motion (`.hidden{visibility:hidden;transform:translate(100vw)}` →
  `.visible{transition:transform .4s}`) is reproduced via a `transform:
  translateX(100%)` → `0` transition on the `data-reveal` elements.
- **SCSS → plain CSS.** The nine per-slide/template SCSS files plus the deck
  `_variables`/`_fonts` are hand-ported to one `styles/deck.css` (custom
  properties; rems converted to deck-px at the framework 16px root, e.g. 4rem→64px,
  2.5rem→40px, 8rem→128px, 10rem→160px). `lighten(#0A4E9B, 20%)` is pre-computed to
  `#1b7ff0` (list bullets + JKube icon). Viewport units (`vh`) in the Gatsby
  templates are resolved against the fixed 1080-tall section (33vh→33.333%,
  17vh→184px, 100vh→100%), since inside `<deck-stage>` raw `vh` tracks the real
  window rather than the scaled canvas.
- **Background.** The jumbotron is a per-section CSS background (`#000 url(...)
  cover`) with the original dark overlay (interior slides 0.7, cover/thank-you 0.1)
  reproduced as a `::before` scoped to the section (the Gatsby mixin used
  `position: fixed`). `assets/jumbotron-image.jpg` → `assets/jumbotron.webp` via
  `npm run optimize:images` (lossy q80); the JPEG original is removed with the
  Gatsby source.
- **Fonts: only weight 400 is loaded**, exactly as the Gatsby deck did
  (`?family=Oswald|Montserrat|Roboto`). Oswald = header bar, Montserrat = body,
  Roboto = diagram.
- **Font Awesome → vendored, not CDN.** The about-me / thank-you contact icons load
  from the repo-vendored `static/deck-kit/vendor/fontawesome/` (Font Awesome Free
  6.5.2) rather than a CDN — see that directory's README. The legacy `fab`/`fas`
  classes are kept verbatim.
- **Entrance animations** (`fade-in` on the cover and the slide-5 logo +
  `.k8s-text`) are keyed off deck-stage's `[data-deck-active]` so they replay on
  slide entry; the PDF export strips that attribute from its clones, so the static
  export renders at rest.

## Editing

See the repo `AGENTS.md` for the static-deck workflow (`serve:static`,
`snapshot:baseline`/`diff`, `screenshot:deck`, `audit:fit`, `export:pdf`). The
deck-kit contract lives in `static/deck-kit/README.md`.
