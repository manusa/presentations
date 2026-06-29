# Porting playbook (Gatsby deck → deck-kit)

Reusable recipe + fidelity gotchas for porting a Gatsby/React deck into the static
`deck-kit` format. **Read this before any port.** The per-deck issue carries only
the deck-specific inventory; everything cross-cutting lives here. Distilled from
the pilot, `mock-mvc-in-action` (#61).

## Recipe

1. **Scaffold** `static/presentations/<slug>/index.html`: `<head>` with `<title>`,
   tokens/deck CSS, the deck-stage no-FOUC `<style>`; `<body>` with one
   `<deck-stage width="1920" height="1080">` and the deck-kit `<script defer>`s.
2. **One `<section data-label="…">` per slide.** Drop all `previousPage`/`nextPage`
   plumbing and the per-slide files — deck-stage owns ordering, rail, nav, numbering.
3. **Reveals → `data-reveal*` (#56):** `classNameVisibleFrom(g)` → `data-reveal="g-1"`;
   `-only`/`-until` likewise; deck-stage auto-derives `data-step-max`. **Code →**
   `<pre><code class="language-*">` + the highlight init snippet (#59), only if the
   deck has code.
4. **Hand-port SCSS → plain modern CSS** (no SCSS; README decision). Restore the
   original animations (see gotchas).
5. **Images:** `npm run optimize:images` → webp. Do not copy the raster originals.
6. **`meta.json`** (`title`/`subtitle`/`date`) + a deck-local `README.md` recording
   what changed vs. the Gatsby source.
7. **Update both landings** (see gotchas).
8. **Verify** (see checklist).
9. **Remove the Gatsby source** `src/pages/presentations/<slug>/` once parity is
   signed off — in the same issue, as the pilot did.

## Fidelity gotchas (learned the hard way on the pilot)

- **Two landing pages — update BOTH.** Production
  (`presentations.marcnuri.com`) is served by the **Gatsby** landing
  `src/components/landing-page/index.jsx`, which lists *all* decks;
  `static/index.html` (from `gen:landing`, driven by each deck's `meta.json`) is
  the **Cloudflare-preview** landing. When you migrate a deck, switch its Gatsby
  landing card from `navigate('/presentations/<slug>')` to
  `window.location.href='/presentations/<slug>/'` (hard-nav to the static deck —
  the pattern romania/valenciajug already use) **and** add/update `meta.json`.
- **Faithful fonts.** Legacy decks often load **only weight 400**
  (`?family=Oswald|Montserrat|Roboto`), so cover `<h1>`/`<h2>` render as the
  browser's *faux-bold of 400*. To match, load only 400 — pulling in 700 makes the
  ported headings heavier than the original.
- **Code size is the original's, not the floor.** Gatsby `<Code>` inherited the
  slide body size (`2.5rem` = **40px**), not a small mono default. Set
  `--type-mono` to match the original; the 28px mono floor is a *minimum*, not a
  target.
- **Restore the animations.** Gatsby `_slide.scss` reveals slid in from the right
  (`margin-left:100%→0`): port as `transform:translateX(100%)→0` on
  `[data-reveal]` (`-only` blocks stay instant). Per-slide `fade-in .5s` entrances:
  key off `[data-deck-active]` (deck-stage strips that attribute from PDF clones,
  so static export stays clean).
- **Per-line code highlight** (e.g. a coverage stripe): you can't split highlighted
  `innerHTML` on `\n` — hljs wraps multi-line annotations/params in single spans.
  DOM-walk and re-open straddling spans per line; pass covered lines as data
  (`data-cov-lines`).
- **Assets are converted, not copied.** `optimize:images` → webp; deleting the
  Gatsby deck removes the raster originals, leaving one optimized set. A literal
  `git mv` does not apply to a format change.
- **Rail thumbnails + relative `url()` (#62).** deck-kit rail thumbnails 404 on
  CSS-relative `url()` because the constructed stylesheet's base is the *document*,
  not the deck's `.css`. Workaround: root-absolute
  `url('/presentations/<slug>/assets/…')`. Proper fix tracked in **#62**
  (deck-stage `_snapshotAuthorCss` rewriting relative `url()`).
- **Inlining React SVG components as static SVG (#67).** A deck that renders SVG
  React components (the shared `src/components/icons` barrel, deck-local
  `components/*.jsx`) can't import them — inline each as plain SVG. JSX→HTML attr
  fixes: `className`→`class`, `strokeWidth`→`stroke-width`,
  `strokeMiterlimit`→`stroke-miterlimit`, `stopColor`→`stop-color`,
  `stopOpacity`→`stop-opacity`, `fillRule`→`fill-rule`, `xmlSpace`→`xml:space`;
  numeric braces `x={0}`→`x="0"`; text `{'…'}`→`…`; drop the `{...props}` spread
  (put `class`/`transform` on the root); SVG-camelCase attrs (`viewBox`,
  `gradientUnits`, `gradientTransform`, `clipPathUnits`, `spreadMethod`,
  `maskUnits`) stay as-is. Choose the embedding by what the SVG needs, **not** "always
  inline":
  - **Repeated + CSS-recolored** (logos in headers/footers, on N slides): define
    **once** as `<svg><symbol id>` and `<use href="#id">` it. Recolor per instance
    with inherited **CSS custom properties** (and `currentColor`) read by the
    glyph `fill`s — `fill="var(--x, default)"` — since custom properties (and
    `color`) cross the `<use>` shadow boundary. This kills the duplicate-id
    collisions you'd get from copy-pasting an Illustrator SVG (its `prefix__*`
    gradient/clip ids would repeat) **and** handles two-tone recolors a single
    `currentColor` can't. *Move the recolor out of any in-SVG `<style>`*: an
    internal `.cls{fill:…}` rule (specificity 0,1,0) beats a presentation-attr
    `fill` and the cascade favours the later (in-`<body>`) `<style>`, so scope the
    deck CSS as `.wrapper .cls { fill: … }` (0,2,0) or drive it via the `var()`
    default instead.
  - **Single-use but animated or page-font-dependent** (e.g. a diagram whose text
    must use the deck's Roboto and whose labels fade in): an external `<img src=…svg>`
    is an isolated document — no page fonts, no CSS piercing — so it's out. You do
    **not** need to dump the whole thing inline in the `<section>`, though: define it
    **once** as a `<symbol>` in the shared defs block and `<use>` it, same as the
    logos, to keep the slide markup readable. It still resolves document
    `@font-face`s (the symbol's own `<style>` clones into the `<use>` shadow tree and
    Roboto is document-global). For per-element animation that deck CSS can't reach
    across the shadow boundary (a `.k8s-text` fade), drive it with an **inherited,
    registered custom property** (`@property --x { inherits: true }`): animate `--x`
    on the host (document scope) and have the symbol's `<style>` read it
    (`opacity: var(--x)`) — only the value crosses the boundary, exactly like the
    recolor. Choose a resting `initial-value` that is correct when un-animated (e.g.
    `1` for an opacity fade) so the static PDF export — which strips
    `[data-deck-active]` — renders the final state. Give an absent font
    (`MyriadPro-Regular`) a real fallback (`'…','Roboto',sans-serif`). (Plain inline
    light-DOM also works, but buries the slide's content under the SVG.)
  - **Single-use, static, un-recolored** (an avatar/illustration): a standalone
    `assets/<name>.svg` via `<img>` is faithful and keeps `index.html` lean; its
    `prefix__*` ids are isolated so they can't collide.
  Verify the transcription visually — `screenshot:deck` surfaces any corrupted
  `d=` path or dropped attribute immediately.
- **Font Awesome is vendored, not a CDN (#67).** Contact-icon decks load FA from
  `static/deck-kit/vendor/fontawesome/css/all.min.css` (shared deck-kit infra,
  pinned 6.5.2; `npm run vendor:fontawesome`, `npm run test:fontawesome`), not a
  jsDelivr `<link>`. Keep the legacy `fab`/`fas` classes verbatim. (Self-hosting
  the Google **fonts** the decks still load from the Google CDN is tracked
  separately in **#68**, following this FA vendoring as the precedent.)

## Verification checklist

The static-deck tooling is Gatsby-independent and is the safety net:

- `screenshot:deck` the new deck; compare to the live Gatsby deck (`npm run
  develop`). Reveals must trigger on the same key presses.
- `audit:fit -- <url> <name> --floor 28` — no sub-floor must-read runs.
- `snapshot:baseline` → edit → `snapshot:diff` while iterating.
- `export:pdf` + `test:pdf-links` — correct page count, links survive.
- `gen:landing` lists the deck; it boots under `serve:static`.
