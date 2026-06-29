# Deploy your Java applications to the Cloud using Eclipse JKube

Static **deck-kit** deck — the **first Phase-2 / Tier-B port** of the Gatsby deck
`eclipse-jkube-introduction` (issue #70, migration tracked in `docs/migration/`).
Self-contained HTML/CSS/vanilla-JS under
`static/presentations/eclipse-jkube-introduction/`; no build step. Boots under
`npm run serve:static`.

The talk (EclipseCon 2020, Oct 2020) introduces
[Eclipse JKube](https://www.eclipse.org/jkube/) and deploying Java applications to
Kubernetes/OpenShift with it.

Despite the Tier-B ("code-heavy") label this deck is **code-free** (no
`react-syntax-highlighter` / `<Code>`, no `react-archer`) — so it carries no
highlight.js layer and triggers no code-highlight promotion. It is, however, the
heaviest user so far of the #67 **inline-React-SVG recipe**: five SVG React
components (`JKubeLogo`, `KubernetesLogo`, `OpenShiftLogo`, `Avatar`, and the static
`DeveloperWorkflowDiagram`).

## Structure

`index.html` is a single `<deck-stage width="1920" height="1080">` with 11
`<section>`s. deck-stage owns ordering, the thumbnail rail, keyboard nav,
fullscreen, and PDF pagination. Styling is one hand-ported file, `styles/deck.css`.

| # | Section (`data-label`) | Ported from | Notes |
|---|---|---|---|
| 1 | Deploy your Java applications to the Cloud using Eclipse JKube | `index.jsx` | `TitleTemplate` cover: EclipseCon logo + title/subtitle over the photo |
| 2 | About me | `slide1.jsx` | `SlideTemplate`; Avatar SVG + bio + Twitter |
| 3 | Agenda | `slide2.jsx` | `SlideTemplate`; nested list |
| 4 | Cloud Native Java | `slide3.jsx` | `SlideTemplate`; **7-step** reveal (`data-reveal` 0–6) |
| 5 | What is Eclipse JKube? | `slide4.jsx` | `SlideTemplate`; **3-step** reveal (`data-reveal` 1–2) |
| 6 | What is Eclipse JKube? (2) | `slide5.jsx` | `SlideTemplate`; framework rail |
| 7 | What is Eclipse JKube? Simplified Developer Workflow | `slide6.jsx` | `SlideTemplate`; rotated JKube logo + static workflow diagram |
| 8 | From zero to cloud with Maven and Eclipse JKube | `slide7.jsx` | `TitleTemplate` demo divider |
| 9 | Old school Java Web application ready for the cloud | `slide8.jsx` | `TitleTemplate` demo divider |
| 10 | What's coming - Roadmap | `slide9.jsx` | `SlideTemplate`; list (footer page number 9, faithful to the source) |
| 11 | Thank you! | `slide10.jsx` | `TitleTemplate`; thank-you + reach-out links + JKube logo |

## What changed from the Gatsby source

The Gatsby deck (`src/pages/presentations/eclipse-jkube-introduction/`) has been
removed now that parity is signed off; its landing card in
`src/components/landing-page/index.jsx` now hard-navigates to this static deck (the
`window.location.href` pattern the other migrated decks use). The port is faithful
slide-for-slide; the mechanics changed as follows:

- **Routing → sections.** The `slideControls` HOC and all `previousPage`/`nextPage`
  plumbing and per-slide JSX files collapse into one `<deck-stage>` with 11
  `<section>`s. deck-stage drives nav.
- **`<Helmet><title>` → static `<title>`** in `<head>`. Drops react-helmet.
- **Deck-specific chrome inlined.** `SlideTemplate` (orange Oswald header bar with
  the JKube logo on the right; footer = EclipseCon logo + page number) and
  `TitleTemplate` (cover / demo dividers / thank-you over the photo) are reproduced
  inline as plain markup + CSS. Per migration rule #4 the generic `<deck-slide>`
  element is **not** introduced. The footer page numbers (1–6, 9 — the source's own
  `slide` props, which skip the two demo dividers) are baked into each interior
  slide so they survive into the PDF, independent of deck-stage's rail numbering.
- **React SVG components → static SVG** (JSX attrs converted: `className`→`class`,
  `strokeWidth`→`stroke-width`, `stopColor`/`stopOpacity`→`stop-color`/
  `stop-opacity`, `clipPath`→`clip-path`, numeric `{0}`→`"0"`, text `{'…'}`→`…`;
  `{...props}` dropped):
  - **JKube logo** is repeated chrome (every interior header, slide 4's overlay,
    slide 7's rotated logo, the thank-you slide), so it is defined **once** as an
    `<svg><symbol>` and `<use>`d. It is recolored per instance through inherited CSS
    custom properties (`--jkube-icon`, `--jkube-text`) that cross the `<use>` shadow
    boundary — so the repeated markup carries **no duplicate-id collisions** and the
    original recolors are preserved (header 65 %-white, slide-4 overlay white text /
    `#326ce5` icon, slide-7 white text, thank-you orange icon / white text).
  - **Kubernetes** and **OpenShift** logos (slide 4's technology rail) are likewise
    `<symbol>` + `<use>`; OpenShift's wordmark recolors white via `--openshift-text`
    (the Gatsby `textColor='white'` prop).
  - The **Avatar** (static, unanimated, un-recolored) is a standalone
    `assets/avatar.svg` referenced with a plain `<img>`, keeping `index.html` lean
    (its `prefix__*` clip/gradient/mask ids are isolated so they can't collide).
  - The **developer-workflow diagram** is also defined **once** as a `<symbol>` in
    the same defs block and `<use>`d in slide 7, so the section markup stays
    readable. It can't be an `<img>` (an isolated SVG document gets none of the
    page's fonts), so it keeps its own `<style>` — which clones into the `<use>`
    shadow tree and still resolves Roboto from the document `@font-face`. Its
    `MyriadPro-Regular` font (never loaded) falls back to `'Roboto', sans-serif`.
    The `.k8s-text` fade-in can't be targeted by deck CSS across the `<use>`
    boundary, so it is driven by an inherited, registered custom property
    (`--k8s-fade`): the animation runs on the host (document scope) and only the
    value crosses into the shadow tree, the same way the logo recolors do. At rest
    `--k8s-fade` is `1` (and the PDF export strips `[data-deck-active]`), so the
    labels render fully opaque in the static export.
    - **Known legibility caveat (preserved from the original asset):** the diagram's
      own labels are `font-size: 12px` inside its `0 0 562.3 430.9` viewBox; at the
      rendered scale (~2×) that is ≈24px — below the 28px must-read floor. These are
      the **original 2020 SVG's** sizes, kept verbatim for fidelity (the issue scopes
      the diagram as already-static, no redesign). `audit:fit` cannot see them
      because they live in the `<use>` shadow tree, so the deck passes the floor gate
      while these labels sit just under it. A future legibility pass could rescale the
      diagram (it has horizontal headroom) or bump its `st10` label size — both alter
      the original asset, so they are deliberately left for a separate decision.
- **Reveals → declarative `data-reveal` (#56).** Slide 4 (Cloud Native Java) is a
  7-step build: `CloudNativeDefinition` shows only in the base state
  (`data-reveal-only="0"`), `MicroserviceArchitecture` only in step 1
  (`data-reveal-only="1"`), then the `DeveloperWorkflow` block appears from step 2
  (`data-reveal="2"`) and its technology logos slide in from the right at steps 3/4/5
  with the JKube logo overlay fading in at step 6. Slide 5 maps
  `visibleClassNameFromStep(2)`→`data-reveal="1"`, `(3)`→`data-reveal="2"`.
  deck-stage auto-derives `data-step-max` (6 and 2). The Gatsby
  **slide-in-from-right** motion (`.hidden{visibility:hidden;transform:translate(100vw)}`
  → `.visible{transition:transform .4s}`) is reproduced via a
  `transform: translateX(100%)` → `0` transition; the swapping top-level blocks keep
  the original's `display:none` so only the active phase occupies the content box.
- **SCSS → plain CSS.** The per-slide/template SCSS plus the deck
  `_variables`/`_fonts` are hand-ported to one `styles/deck.css` (custom properties;
  rems converted to deck-px at the framework 16px root, e.g. 4rem→64px, 2.5rem→40px,
  26rem→416px, 8rem→128px). Viewport units (`vh`) in the Gatsby title template are
  resolved against the fixed 1080-tall section (33vh→33.333%, 20vh→216px, 100vh→100%),
  since inside `<deck-stage>` raw `vh` tracks the real window rather than the scaled
  canvas. Two sub-floor Gatsby sizes are raised to clear the 28px legibility floor
  (AGENTS.md): the blockquote `cite` (1.7rem ≈ 27.2px → 28px) and the footer page
  number (Gatsby left it unstyled ≈ 16px → 32px).
- **Background.** The EclipseCon photo is a per-section CSS background (`#000 url(...)
  cover`) with the original overlays reproduced as a `::before` scoped to the section
  (the Gatsby mixin used `position: fixed`): interior slides use the
  `radial-gradient(circle, rgba(35,35,35,.95) 10%, rgba(10,10,10,.9) 100%)` from
  `slide-template.scss`; title slides use the mixin's default `rgba(0,0,0,.5)`.
- **Assets → webp** via `npm run optimize:images`: the EclipseCon logo + background,
  CNCF logo, Docker logo, the old-man photo, 9 framework logos, 9 Kubernetes icons.
  PNG logos/icons convert lossless; the JPEG photo/background convert lossy (q80).
  **Two orphan rasters from the Gatsby deck are dropped** (never rendered):
  `dilbert-kubernetes.png` and the non-`-square` `adult-elderly-…jpg` (only the
  `-square` crop is used). The raster originals are removed with the Gatsby source.
- **Fonts: only weight 400 is loaded**, exactly as the Gatsby deck did
  (`?family=Oswald|Montserrat|Roboto`), self-hosted from
  `deck-kit/vendor/fonts/`. Oswald = header bar, Montserrat = body, Roboto = diagram.
- **Font Awesome → vendored, not CDN.** The about-me / thank-you contact icons load
  from the repo-vendored `static/deck-kit/vendor/fontawesome/` (Font Awesome Free
  6.5.2). The legacy `fab`/`fas` classes are kept verbatim.
- **Entrance animations** (`fade-in` on the cover and the slide-7 rotated logo +
  `.k8s-text`) are keyed off deck-stage's `[data-deck-active]` so they replay on
  slide entry; the PDF export strips that attribute from its clones, so the static
  export renders at rest.

## Editing

See the repo `AGENTS.md` for the static-deck workflow (`serve:static`,
`snapshot:baseline`/`diff`, `screenshot:deck`, `audit:fit`, `export:pdf`). The
deck-kit contract lives in `static/deck-kit/README.md`.
