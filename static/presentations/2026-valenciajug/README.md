# Valencia JUG 2026 — Slide Deck

Talk: **"Turning Your Java Project Into an AI-Ready Codebase"**
Event: Valencia JUG, Meetup @ Xplore Group, 18 June 2026, 18:30–19:20.

> **Fork of `2026-devtalks-romania`.** Same talk, re-themed for Valencia JUG. See "Forked from the Romania deck" below for exactly what changed. The Romania deck stays untouched as the historical record.

Self-contained HTML/CSS/JS slide deck. Ships through the existing Gatsby static pipeline because Gatsby copies `static/*` verbatim into `public/`. Not built with the React/Gatsby slide framework used by older decks under `src/pages/presentations/*`.

---

## Why HTML/CSS/JS instead of Gatsby

1. **Spectacular look with CSS animations / animated diagrams** — fastest medium for this is plain HTML+CSS+SVG in one file. PPTX/Google Slides lose 60–80% of the polish on conversion.
2. **Simple text editing** — each slide is a `<section>` block; changing a title is editing a string.
3. **A one-week deadline** — no time to migrate or replicate the Gatsby framework for a brand-new design system.

This deck is a **fork of the DevTalks Romania 2026 deck**. It was copied to this slug and re-themed for Valencia JUG: near-black base + warm radial glow + vermilion-orange accent (sampled from the meetup flyer), replacing Romania's navy + pink + purple. Same Inter + JetBrains Mono type, same terminal motifs, same talk content.

---

## What's in here

```
2026-valenciajug/
  index.html                 single-page deck — markup; loads deck-kit web components from ../../deck-kit/
  README.md                  this file
  meta.json                  title + subtitle + date (newest-first sort key) for the Cloudflare-preview landing
  links/index.html           companion "slides & links" page — the QR target on the Q&A slide (see below)
  styles/                    split out of index.html; loaded in order via <link> tags in <head>
    tokens.css               @font-face (Techover base64) + :root CSS custom properties
    shared.css               reset, base typography, chrome rails, reusable utilities (.grid-bg, .brackets, .accent…)
    s-about2.css             .s-about2 dual-portrait layout + .proj-card grid variants
    shared-typography.css    .eyebrow + .h-title base rules used by most content slides
    s-section.css            .s-section divider (Maven reactor build)
    s-fieldnotes.css         .s-fieldnotes notebook-collage slide (largest single file at ~450 lines)
    s-amplifier.css          .s-amplifier (Act 3 bad/good) including stepped reveal states
    s-closing.css            .s-closing Q&A slide + @media print refinements
    light-overrides.css      .light theme overrides applied to content slides
    s-boot.css               .s-boot real title slide (JVM/SLF4J flavor)
    s-act2.css               .s-act2 Old World / New World gantt slides
    s-audience.css           .s-audience Act 3 opener (show-of-hands)
    s-legacy.css             .s-legacy two-column legacy-framing closer
    s-flywheel.css           .s-flywheel Act 3 closer (AI-readiness flywheel diagram)
    s-agents-md.css          .s-agents-md Act 4 (AGENTS.md excerpt + quick-build cards)
    s-skill.css              .s-skill Act 4 (SKILL.md three-step conveyor)
    s-specs-vs-tests.css     .s-specs-vs-tests Act 5 opener (advisory vs enforced)
    s-failure-spec.css       .s-failure-spec Act 5 (failing test reads like a spec · @Nested breadcrumb)
    s-blackbox.css           .s-blackbox Act 5 (black-box tests · unit of behavior)
    s-feedback-ladder.css    .s-feedback-ladder Act 5 (fast feedback loops · 4-rung ladder)
    s-ci.css                 .s-ci Act 5 (Fabric8 CI case study · 3-step reveal)
  assets/
    valenciajug-logo.svg     title-slide brand mark (traced from the official Valencia JUG logo; dark-mode recolor, transparent bg)
    favicon.svg              Valencia JUG bat mark on a rounded near-black tile (favicon)
    social-card.png          OG/Twitter share card (downscaled from the meetup flyer)
    logos/xplore-group.svg   "hosted at" mark on the title slide
    qr-links.svg             QR on the Q&A slide → links/ companion page (generated, see "Companion links page")
    book-cover.png           slide 02 "Full Stack Quarkus and React" proj-card (Packt, 2022)
    amp-scene-bad.webp       slide 07 hero — "Bad project amplified"
    amp-scene-good.webp      slide 08 hero — "Good project amplified"
    flywheel-scene.webp      slide 10 hero — AI-readiness flywheel
    portraits/               speaker portraits
      calm.webp              slide 02 front face (day job)
      unhinged.webp          slide 02 back face (after hours)
      maciejewska.webp       slide 05 step 2 (Joanna Maciejewska quote)
    logos/                   per-project logos consumed by <image-slot>
      claude.svg             grunt-glyph-claude (slide 20 — agent attribution)
      containers.png         logo-mcp-server, logo-podman-mcp
      eclipse-jkube.png      logo-jkube
      electronim.svg         logo-electronim
      fabric8io.svg          logo-k8s-client
      go.svg                 logo-ai-beacon (placeholder — no dedicated asset yet)
      helm.svg               logo-helm-java
      minikube.svg           logo-minikube
      yakd-square.svg        logo-yakd / pr-logo-yakd (slide 02 / slide 20)
```

The split mirrors the banner-comment sections of the original inline `<style>` block. `<link>` order in `index.html` preserves the original CSS source order, so the cascade is unchanged — verified zero-diff against snapshot baselines.

### Unused logo assets

These four SVGs sit in `assets/logos/` but are not referenced from any source file. They are kept on disk so they remain available if a future slide wires them in — do not delete without confirming there is no pending work that needs them.

- `github.svg`
- `java.svg` — placeholder carried over from the source deck, swapped out for `helm.svg`
- `javascript.svg` — placeholder carried over from the source deck, swapped out for `minikube.svg`
- `yakd.svg` — the live `logo-yakd` slot uses `yakd-square.svg` instead

---

## Slide model

- Slides are direct children of `<deck-stage>`: `<section class="s-title" data-label="Title">…</section>`. `data-label` is a bare title with **no numeric prefix**. deck-kit auto-stamps `data-screen-label="NN <label>"` based on the slide's 1-indexed section position; that is the canonical number used by deep-link (`#N`), screenshot filenames (`slide-NN.png`), and the rail thumbnails. It changes automatically when slides are added, removed, or reordered.
- The deck is the real talk arc only: Title → Acts I–VI (Act VI is the Q&A close). The trailing template-demo and exploration sections the source deck once carried were removed upstream before this fork (and the matching `styles/s-{about,content,compare,quote,stat,code,diagram,fullbleed}.css` files with them).
- The **talk-arc number** (the planned slide number from the structure document) lives on the `.pill` chrome inside each slide (e.g., `act 04 · skill · 14`) and on the `<!-- SLIDE NN — TITLE -->` banner comment above each `<section>`. These two carry the storyteller's sequence number, which deliberately has a gap (12/13) for the two Act 4 slides not yet implemented (Make Java boundaries obvious · Shape the work upstream). Renumber only after a deck-arc decision is made; not part of routine doc-sync work. The pill is the canonical source; the banner comment is an authoring aid.
- Theming is centralized in `:root` CSS custom properties at the top of `index.html` (`--bg`, `--accent`, `--accent-2`, `--pink`, `--purple`, type scale, padding tokens).
- Per-slide CSS is namespaced by class prefix (`.s-title { … }`, `.s-amplifier { … }`, etc.).
- `<deck-stage>` and `<image-slot>` are repo-wide web components loaded from `../../deck-kit/` at the bottom of `index.html`. The contract is append-only and pinned by Playwright tests (see `static/deck-kit/README.md`). This deck does not define its own copy.

Adding text to a slide = editing HTML inside the corresponding `<section>`. Adding a new slide = copy a section, change the class, add a CSS rule block.

---

## Palette

Color lives in two tiers: **theme tokens** in `styles/tokens.css` `:root` (semantic, reused everywhere) and a set of **hardcoded UI-mimicry palettes** in the per-slide CSS that deliberately do *not* follow the theme. When re-theming, convert the first tier and leave the second alone — that single rule is what keeps a re-skin from breaking the slides that quote a real UI.

### Theme tokens (`tokens.css`)

Near-black base + warm radial glow + vermilion-orange, sampled from the meetup flyer. The load-bearing decision is a **brand/alert split: orange = brand / positive / "the work that matters", red = bad / error.** (Romania's single pink did both jobs; Valencia separates them.)

| Token | Value | Role |
|---|---|---|
| `--bg` / `--bg-elev` / `--bg-card` | `#0E0D13` / `#17151D` / `#201C26` | near-black surfaces |
| `--fg` / `--fg-dim` / `--fg-mute` | `#FFFFFF` / `#BDB4AB` / `#837A70` | text; dim/mute are warm grays (de-blued) |
| `--orange` (= `--accent`) | `#F4541F` | primary brand accent (vermilion) — the hero |
| `--orange-soft` | `#FF7A45` | softer orange (e.g. terminal `.val` tokens) |
| `--accent-2` | `#C9962E` | warm gold — secondary category tone |
| `--cyan` | `#5BE9F0` | cool / positive contrast |
| `--amp-bad` (red) | `#E5484D` | bad / error / alert — **only** |
| `--pink` → `--orange`, `--purple` → `--accent-2` | aliases | retired Romania hues; alias the new accents so legacy highlight usages re-theme automatically |

**Light slides** (`light-overrides.css`) render on cream and need darker, AA-safe **`-ink` variants**: `--accent-ink #A8470C` (orange), `--accent-2-ink #7E5E12` (gold), `--cyan-ink #086978` (deep teal). Rule of thumb: **dark sections use the bright tokens, cream sections use the `-ink` tokens.** The Map · Roads · Guardrails spine relies on this — the flywheel (dark) uses `--cyan` / `--accent-2` / `--accent`; the recap (cream) uses the matching `-ink` trio. Same hue identity (cyan / gold / orange), per-background tone.

### Gantt category palette (`s-act2.css`, Old World / New World)

The two Gantt slides encode "you orchestrate, agents execute" as a **warm-vs-cool axis**: every *your-lane* block is warm; the *agent* lanes are teal. Categories within the warm set separate by hue **and** value so they hold up at projection distance. Bug stays red (the alert split); orange stays the sole hero on the implementation work. Text colors target WCAG AA on each fill (block labels are ~20–22px bold = "large text").

| Category | Fill | Text |
|---|---|---|
| implement (hero) | `var(--orange)` `#F4541F` | `#1A0B00` (dark ink — white fails AA on orange) |
| chore (email, expenses) | `#8A7C66` (warm brown) | `#FFFFFF` |
| meeting (standup, 1-1) | `#A98A4A` (tan-gold) | `#1A1206` |
| management (review) | `#6B5D4C` (dark brown) | `#FFFFFF` |
| bug (fix bug) | `#C8463F` (red) | `#FFFFFF` |
| you-merge (the "Spawn" marker block) | `var(--accent-2)` `#C9962E` | `#241A04` — kept warm so teal stays exclusively the agents |
| agent work | `#0E7C8A` (teal) | `#EAFBFD` |
| agent alt / tn | `#0A6573` / `#2AA5B3` (deeper / brighter teal) | `#EAFBFD` / `#042024` |

The teal `#0E7C8A` is reused for the **spawn-arrow connectors** (`.g1-spawn`, light-mode override in `s-act2.css`) — those point *at* the agents, so teal is correct there; only the solid you-merge block had to leave the teal family. `--cyan` (`#5BE9F0`) itself is too pale to sit on cream, which is why the light-mode connectors use the deeper `#0E7C8A`.

### Preserved UI-mimicry palettes — **do not "convert" these**

Several slides reproduce a recognizable third-party UI; those colors are quotations, not theme choices, so re-coloring them to match the deck destroys the recognition. They are hardcoded in the per-slide CSS and annotated in-line (e.g. `/* GitHub danger-fg */`). A re-theme must skip them.

- **GitHub Primer** (s-project-story, s-skill, s-ci, s-leverage — PR / issues / diff / billing mockups): fg `#1F2328`, muted `#59636E`, subtle `#656D76`, border `#D1D9E0`, canvas `#F6F8FA`; danger `#CF222E` on `#FFEBE9` (dark `#82071E`); success `#1A7F37` / `#1F883D` on `#DAFBE1`; attention `#9A6700` on `#FFF8C5`; link blue `#0969DA` / `#0550AE`; **merged-PR purple** `#6F42C1` / `#8250DF` / `#5B2DA0`. (The one diff element the re-theme *did* touch — `.diff-rem` — was aligned **to** this GitHub danger-red, not away from it.)
- **macOS traffic lights** (terminal / window chrome): `#FF5F57` / `#FEBC2E` / `#28C840`.
- **Go brand** (language dot, s-fieldnotes): `#00ADD8`.
- **Console / syntax highlight** (terminal slides s-audience / s-specs-vs-tests / s-blackbox / s-failure-spec): the JetBrains-ish token colors.
- **Decorative repo-tile pins** (s-fieldnotes): intentionally varied — orange / gold / cyan pushpins. (The original pink pins were the one decorative case retired into the warm system → gold.)

---

## Image slots

Logos and large scene images are not hard-coded as `<img src="…">`. Each slot is an `<image-slot id="…" src="assets/…">` element provided by `static/deck-kit/image-slot.js`. The component handles fit / crop / placeholder text per its own attributes. `src` is set directly as an attribute on the element — there is no JS registry hydrating sources on DOMContentLoaded.

To **swap a logo or hero image**: edit the `src=` attribute on the matching `<image-slot>` element in `index.html`. The new file must live somewhere served by `serve:static` (typically `assets/logos/` or `assets/`).

To **add a new logo**: drop the asset under `assets/logos/`, then add `<image-slot id="logo-foo" class="picon" fit="contain" src="assets/logos/foo.svg" placeholder="logo"></image-slot>` inside the slide.

Logo slot ids currently in use: `logo-mcp-server`, `logo-podman-mcp` (both → `containers.png`), `logo-jkube` (→ `eclipse-jkube.png`), `logo-k8s-client` (→ `fabric8io.svg`), `logo-electronim`, `logo-yakd` (→ `yakd-square.svg`), `logo-helm-java` (→ `helm.svg`), `logo-minikube`, `logo-ai-beacon` (→ `go.svg` placeholder; no dedicated AI-beacon asset yet). Slide-20-specific slots: `pr-logo-yakd` (→ `yakd-square.svg`, in the PR card bar), `grunt-glyph-claude` (→ `claude.svg`, agent attribution in the grunt-work panel head). Hero scene slots: `amp-scene-bad`, `amp-scene-good`, `flywheel-scene`. Portrait + book slots on slide 02: `speaker-calm`, `speaker-crazy`, `book-cover`.

---

## Companion links page

The Q&A / "Thank you" slide (`.s-closing`) carries a QR code. It points at a small, mobile-first companion page served from this deck at:

```
https://presentations.marcnuri.com/presentations/2026-valenciajug/links/
```

It is a standalone `links/index.html` (not a `<deck-stage>` slide) so a phone scanning the QR lands on a real web page, not a fullscreen 1920×1080 canvas. It mirrors the deck's brand palette inline (no base64 display font pulled onto mobile) and holds four sections, **feedback first on purpose** (it is the thing we most want back, so it does not get buried at the bottom): **feedback** (Google Form), **slides** (the GitHub release + the live deck), **read more** (curated blog.marcnuri.com posts grouped Map · Roads · Guardrails), and **keep in touch** (the same socials as the closing slide). The QR image on the slide is itself a clickable link to this page.

**Feedback form** — a **new** anonymous Google Form per the locked decision (Valencia gets its own so responses stay separate from Romania's). Until Marc supplies the URL, the links page wires the placeholder `__VALENCIA_FEEDBACK_FORM_URL__` on the first/primary card; replace it before the talk.

**Open items:**

- **Slides link** — points straight at `github.com/manusa/presentations/releases/download/v0.13.0/valenciajug-2026.pdf` (a fixed tag, not `/releases/latest`, so it can't drift). `v0.13.0` is the planned Valencia release; cut it at pre-talk time (bump `package.json`, `gh release create`) with the asset named exactly `valenciajug-2026.pdf`, and update the tag on the links page if the version differs.
- **Feedback form URL** — replace `__VALENCIA_FEEDBACK_FORM_URL__` on `links/index.html` once the Valencia Google Form exists.

### The QR asset

`assets/qr-links.svg` is generated, not hand-drawn:

```bash
npm run gen:qr     # regenerate from the URL in scripts/gen-qr.js
```

`gen:qr` uses the `qrcode` devDependency (dev-only, like `sharp` behind `optimize:images` — it never ships in the published package) to emit a near-black-on-white SVG (the Valencia target sets its own `--bg` `#0E0D13` module color in `scripts/gen-qr.js`). A pre-rendered SVG keeps the no-build-step contract, stays crisp at projection size, and prints correctly through `export:pdf`. Regenerate only when the target URL changes (for example, if a short vanity URL is introduced). The slide frames it on a white card (`s-closing.css` `.qr`) so the white field is the QR's quiet zone and it scans against the dark slide.

---

## How it deploys

Three paths pick this directory up automatically:

| Channel | Trigger | Output URL |
|---|---|---|
| GitHub Pages (production) | push to `main` (`.github/workflows/publish-gh-pages.yml`) | `https://presentations.marcnuri.com/presentations/2026-valenciajug/` |
| NPM package | push to `main` with a `package.json` version bump (`.github/workflows/publish-npm.yml`) | `npx mn-presentations` → local express server over `public/` → `http://localhost:8000/presentations/2026-valenciajug/` |
| Cloudflare Pages (preview) | push to any non-main branch / PR | `https://<commit-sha>.presentations-a7o.pages.dev/presentations/2026-valenciajug/` |

Each push to `main` re-publishes the first two. The NPM publish requires a version bump in `package.json` to succeed (the GH Pages publish does not). The Cloudflare preview runs on every PR push and posts a sticky comment with the URL. Preview URLs are gated by Cloudflare Access (GitHub OAuth) so they're visible only to the repo owner — see repo-level `AGENTS.md` "Deploy → Preview access control" for the full setup. Production at `marcnuri.com` is unaffected by Cloudflare and remains publicly served.

A link from the landing page (`src/components/landing-page/index.jsx`) is optional and can be added later. This deck's entry in the Cloudflare preview landing (`static/index.html`) is sourced from `meta.json` in this directory — title, subtitle, and date (the newest-first sort key) live there; regenerate with `npm run gen:landing` after any change.

---

## Placement rationale

The directory sits at `static/presentations/2026-valenciajug/` (not `static/devtalks-romania/`) to match the URL shape of the Gatsby-generated decks, which all live under `/presentations/<slug>/`. This keeps the URL pattern consistent for anything (analytics, manual links, future indexing) that walks `presentations.marcnuri.com/presentations/*`.

Caveat: `README.md` is publicly served at `…/2026-valenciajug/README.md` because it lives under `static/`. It is documentation, not secrets, so this is acceptable.

---

## Forked from the Romania deck

This deck was created by copying `static/presentations/2026-devtalks-romania/` wholesale and re-theming it. Everything structural (slide markup, deck-kit usage, image-slot wiring, the Romania-era upstream-bundle cleanup) carries over unchanged. What changed for Valencia:

- **Theme.** `styles/tokens.css` `:root` swapped to a near-black base (`--bg #0E0D13`), warm radial glow (added in `shared.css` `deck-stage section`), and vermilion-orange primary accent (`--orange #F4541F`), all sampled from the meetup flyer. `--fg-dim`/`--fg-mute` de-blued to warm grays; `--pink` retired to alias the orange (legacy highlight usages re-theme); `--purple` aliases a warm gold `--accent-2`; `--amp-bad` decoupled to a literal red. The light-slide palette (`light-overrides.css`) moved from navy ink to warm-dark ink + orange/gold accent inks.
- **Per-slide literals.** ~320 hardcoded navy / pink / purple / cool-blue-gray literals across the per-slide CSS were converted to warm-dark / red (alert) / orange (brand) / gold / warm-gray equivalents, file by file. A later cleanup pass caught the stragglers the first pass missed — a retired-pink terminal token, two error-pill text colors, a pale-pink fail console, and the decorative repo-tile pins (→ gold) — and re-aligned the `.diff-rem` count to GitHub's own danger-red. The s-act2 Gantt category palette was redesigned to a **warm-you / teal-agents** axis (see [Palette](#palette)). **Intentional UI mimicry is deliberately preserved** (GitHub Primer, macOS traffic lights, console/syntax colors, Go-brand blue, GitHub-merged purple) — the [Palette](#palette) section lists every value and the don't-convert rule.
- **Chrome & identity.** `~/dev/devtalks-2026` → `~/dev/valenciajug-2026`, the six act-divider Maven paths `devtalks-act-*` → `valenciajug-act-*`, boot-log class names `c.m.devtalks`/`c.m.d.boot` → `c.m.valenciajug`/`c.m.v.boot`, every footer `devtalks.ro · 2026` → `Valencia JUG · 2026`, and the closing-slide footer date.
- **Title slide.** Date/time/venue/event/badge updated to 18 June 2026 · 18:30–19:20 · Valencia · Meetup · `PT50M`; DevTalks logo replaced with the Valencia JUG mark + an Xplore Group "hosted at" mark.
- **Brand assets.** `valenciajug-logo.svg` (traced from the official logo, dark-mode recolor, transparent bg), `favicon.svg`, `social-card.png` (from the flyer), `assets/logos/xplore-group.svg`, and a regenerated `qr-links.svg` pointing at the Valencia links page. `devtalks-logo.png` dropped.
- **Companion page, meta & landing.** `links/index.html`, `meta.json`, and the OG/Twitter/canonical meta in `index.html` repointed to the Valencia slug, event facts, new feedback form (placeholder), and `valenciajug-2026.pdf` release asset.

The fast-feedback-loops slide is **included live** here (Romania carried a `data-deck-present-skip` on it for its 45-minute slot; Valencia has a 50-minute slot).

---

## Known tradeoffs / cleanups worth doing

- (none currently tracked)

---

## Authoring quick reference

| Task | Where | Effort |
|---|---|---|
| Change a title or body text | `<section>` HTML in `index.html` | seconds |
| Change theme colors / fonts | `:root` block in `styles/tokens.css` | ~1 min |
| Swap a logo | edit `src=` on the matching `<image-slot>` element (+ drop asset in `assets/logos/`) | ~1 min |
| Replace a hero image | edit `src=` on the matching `<image-slot>` element (+ run `optimize:images --lossy` first) | ~5 min |
| Add a new slide layout | copy a `<section>`, rename the class, create `styles/s-mylayout.css` and add a `<link>` to `index.html` | 10–30 min |
| Add a CSS-animated diagram | inline SVG in the slide markup + `@keyframes` in that slide's `styles/s-*.css` | 30–60 min per diagram |

---

## Deploying a new version

1. Before editing: `npm run snapshot:baseline -- http://localhost:$(cat .live-server.port)/presentations/2026-valenciajug/ valenciajug` (captures the "before" state — see `AGENTS.md` workflow #2).
2. Edit deck files in this directory.
3. `npm run snapshot:diff -- http://localhost:$(cat .live-server.port)/presentations/2026-valenciajug/ valenciajug` — review every flagged slide and confirm the deltas are intentional.
4. Bump `package.json` `version` (root of repo) — required for the NPM publish workflow to publish a new tag. GH Pages publish does not need this.
5. Commit and push to `main`. Both workflows run automatically. `snapshots/` is gitignored — nothing to stage there.
