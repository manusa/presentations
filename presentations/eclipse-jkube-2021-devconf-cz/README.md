# Containerize your Java Applications using Eclipse JKube

Static **deck-kit** deck — a **Phase-2 / Tier-B port** of the Gatsby deck
`eclipse-jkube-2021-devconf-cz` (issue #73, migration tracked in `docs/migration/`).
Self-contained HTML/CSS/vanilla-JS under
`static/presentations/eclipse-jkube-2021-devconf-cz/`; no build step. Boots under
`npm run serve:static`.

The talk (DevConf.cz 2021, Feb 2021) introduces
[Eclipse JKube](https://www.eclipse.org/jkube/) and containerizing / deploying Java
applications to Kubernetes with it.

This is the **first new `<code-block>` consumer** beyond the migration pilot
(`mock-mvc-in-action`): the highlight-glue promotion to the shared deck-kit
`<code-block>` element was already shipped, and this deck validates it on real
multi-language code — **dockerfile, shell, yaml** (slide 5) and **xml, bash**
(slide 8). It also reuses the #67 inline-React-SVG recipe: the `JKubeLogo`,
`KubernetesLogo`, `DevconfCzLogo`, `JavaIcon`, `DockerLogo`, `ServerIcon`,
`VcsIcon` and a right-arrow shape are all inlined as `<symbol>`s.

## Structure

`index.html` is a single `<deck-stage width="1920" height="1080">` with 11
`<section>`s. deck-stage owns ordering, the thumbnail rail, keyboard nav,
fullscreen, and PDF pagination. Styling is one hand-ported file, `styles/deck.css`.

| # | Section (`data-label`) | Ported from | Notes |
|---|---|---|---|
| 1 | Containerize your Java Applications using Eclipse JKube | `index.jsx` | `TitleTemplate` cover: DevConf.cz logo + title/subtitle over the gradient |
| 2 | About me | `slide-010.jsx` | `SlideTemplate`; Avatar SVG + bio + contact icons |
| 3 | Agenda | `slide-020.jsx` | `SlideTemplate`; list |
| 4 | Introduction | `slide-030.jsx` | `SlideTemplate`; **3-step** developer workflow (icons swap + fade) |
| 5 | Deploying applications to Kubernetes - Challenges | `slide-040.jsx` | `SlideTemplate`; **4-step**; `<code-block>` dockerfile/shell/yaml + JKube overlay |
| 6 | What is Eclipse JKube? | `slide-050.jsx` | `SlideTemplate`; **3-step** reveal list |
| 7 | What is Eclipse JKube? (2) | `slide-060.jsx` | `SlideTemplate`; framework + 3-config-modes text list |
| 8 | What is Eclipse JKube? (3) | `slide-070.jsx` | `SlideTemplate`; `<code-block>` xml + bash |
| 9 | JKube vs. Dockerfile + YAML | `slide-080.jsx` | `TitleTemplate` demo divider |
| 10 | Why should I choose Eclipse JKube? | `slide-090.jsx` | `SlideTemplate`; list (footer page number 9, faithful to the source) |
| 11 | Thank you! | `slide-100.jsx` | `TitleTemplate`; thank-you + reach-out links + JKube logo |

## What changed from the Gatsby source

The Gatsby deck (`src/pages/presentations/eclipse-jkube-2021-devconf-cz/`) has been
removed now that parity is signed off; its landing card in
`src/components/landing-page/index.jsx` now hard-navigates to this static deck (the
`window.location.href` pattern the other migrated decks use). The port is faithful
slide-for-slide; the mechanics changed as follows:

- **Routing → sections.** The `slideControls` HOC and all `previousPage`/`nextPage`
  plumbing and per-slide JSX files collapse into one `<deck-stage>` with 11
  `<section>`s. deck-stage drives nav and step reveals.
- **Reveals → `data-reveal*`.** `classNameVisibleFrom(g)`→`data-reveal="g-1"`,
  `classNameVisibleIn(g)`→`data-reveal-only="g-1"`,
  `classNameVisibleUntil(g)`→`data-reveal-until="g-1"`; deck-stage auto-derives
  `data-step-max`. Slide 4 fades the icons in and swaps them in place (Gatsby
  `opacity 1s` + `.hidden{position:absolute;height:0}`); slides 5 and 6 slide the
  reveal in from the right (Gatsby `translate(100vw)→0`, `transition .4s`).
- **Code → shared `<code-block>`.** The Gatsby `<Code>` (`react-syntax-highlighter`,
  `railscasts` theme) on slide 5 and the raw `SyntaxHighlighter` (`androidstudio`
  theme) on slide 8 both become the deck-kit `<code-block language="…">`, rendered
  with the deck-kit standard **github-dark** theme + the `--hl-*` override layer.
  `dockerfile` is loaded as the one non-common highlight.js grammar
  (`vendor/highlight/languages/dockerfile.min.js`); bash/yaml/xml/shell ride in on
  the common engine bundle. `--type-mono` is **36px** — near the Gatsby `<Code>`
  body size (the slide body `2.5rem` = 40px it inherited), trimmed just enough for
  the dense Challenges slide to fit, and well above the 28px legibility floor.
- **Inline SVG components → `<symbol>` + `<use>`.** `JKubeLogo` and `KubernetesLogo`
  are reused verbatim from the `eclipse-jkube-introduction` port (paths identical to
  the shared barrel components); their glyphs recolor per instance through the
  inherited `--jkube-icon` / `--jkube-text` custom properties that cross the `<use>`
  shadow boundary. `DevconfCzLogo` (footer + cover/demo/thank-you), `JavaIcon`,
  `DockerLogo`, `ServerIcon`, `VcsIcon` and a right-arrow are inlined from the
  Gatsby components/shapes. The `Avatar` is a single-use static illustration, so it
  is `assets/avatar.svg` loaded via `<img>` (its `prefix__*` clip/gradient ids are
  isolated in the standalone file).
- **SCSS → plain CSS.** `styles/*.scss` (the `eclipse-jkube-2021-devconf-cz-*`
  templates) become `styles/deck.css`; rems converted at the 16px framework root
  (`2.5rem`→40px etc.). The DevConf palette — purple `#8e83e4` header bar, magenta
  `#ff009a` bullets/title-band/JKube icon — is carried over verbatim. The footer
  page number keeps the Gatsby default size (~16px) — faithful navigational chrome,
  intentionally below the 28px must-read floor.
- **Fonts.** Oswald (header) + Montserrat (body), self-hosted from
  `deck-kit/vendor/fonts`, weight 400 only — exactly as the Gatsby deck loaded them.
  Roboto is dropped: it was only the header font-stack's never-triggered fallback
  and the font of the unused workflow diagram (see below).
- **Background.** `devconf-landing-background.svg` is kept as SVG (a CSS
  `background` with `cover`); interior slides carry a 0.7 black overlay, title
  slides a 0.1 overlay (the Gatsby `slide-background` mixin).

### Dead code in the Gatsby source, intentionally not ported

These existed in the Gatsby deck folder but were **never imported / rendered by any
slide**, so they are not part of this deck (verified against every slide's imports):

- `components/developer-workflow-diagram.jsx` — the deck-local `DeveloperWorkflowDiagram`
  component is not referenced by `slide-060.jsx` (which renders the frameworks +
  3-config-modes text list) or any other slide.
- `components/devconf-logo.jsx` — only `devconf-cz-logo.jsx` is used (footer + title
  slides).
- `assets/devconf-icon.svg` — imported by `slide-template.jsx` but the binding was
  unused (the template renders the `DevconfCzLogo` component).
- `assets/devconf-logo-cz-reverse.svg` and `assets/docker-moby-logo.png` —
  unreferenced (the PNG is used only by a *different* deck, `eclipse-jkube-2020-bcn-jug`;
  slide 4 here uses the `DockerLogo` SVG component, not the raster).

## Assets

- `assets/avatar.svg` — speaker illustration (inlined from `components/avatar.jsx`).
- `assets/devconf-landing-background.svg` — slide background (kept as SVG).

## Verification

- `screenshot:deck` — 18 captures (8 single-state + slide 4 ×3 + slide 5 ×4 +
  slide 6 ×3), visually compared to the live Gatsby deck.
- `audit:fit -- <url> devconf --floor 28` — 0 overflow; the only sub-floor run is the
  16px footer page number (navigational chrome, faithful to the original).
- `export:pdf` + `test:pdf-links` + frame check — 18 pages, full-bleed, all 6 anchor
  links preserved.
