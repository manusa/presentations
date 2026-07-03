# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, GitHub Copilot, etc.) when working with code in this repository.

## Project Overview

Marc Nuri's tech-talk slide decks, published to **presentations.marcnuri.com**.

Two stacks coexist in this repo and are **not** interchangeable:

- **Gatsby / React decks** — the historical pattern. One JSX file per slide under `src/pages/presentations/<deck-slug>/slide-NNN-*.jsx`, with deck-scoped components and SCSS partials under `src/components/<deck-slug>/`. Shared primitives (`InteriorSlideTemplate`, `slideControls`, icons, shapes) live under `src/components/`. Keyboard navigation is provided by the `slideControls` HOC.
- **Static HTML decks** — newer pattern, starting with the 2026 DevTalks Romania deck. Self-contained HTML/CSS/vanilla-JS under `static/presentations/<deck-slug>/`. These ship through the same deploy pipeline as the Gatsby decks because Gatsby copies `static/*` verbatim into `public/`. **Do not port these into the Gatsby framework.**

If you are working on a static deck, read its directory-local `README.md` before editing.

## Build / Dev

```bash
npm install                # installs dependencies
npm run develop            # gatsby develop --host=0.0.0.0 (hot reload for Gatsby decks)
npm run build              # gatsby clean & gatsby build → public/
```

Static decks under `static/presentations/*` need no build step — they appear in `public/` as-is.

### Dependency upgrades (Gatsby/React stack)

- **Run npm via the `node22` shell function** for any dependency work (`node22 && npm ci`, `node22 && npm install …`). CI runs Node 22 / npm 10; the machine-default Node 26 / npm 11 writes a lockfile that npm 10's strict `npm ci` rejects (it prunes nested deps), silently red-failing the `deck-kit tests` check while the `npm install`-based publish jobs stay green. Verify "latest" with `npm view <pkg> version`, not `npm outdated` (a stale npm cache here under-reports — it once hid that gatsby 5.16 had shipped).
- **React 19 is blocked on this stack (as of Gatsby 5.16.1, 2026-06).** Gatsby 5.16+ officially supports React 19, but head management doesn't: the Gatsby decks set `<title>`/meta/`<body>` class through react-helmet (`gatsby-plugin-react-helmet`), and under React 19 + Gatsby's `renderToString` SSG neither react-helmet (drops head non-deterministically — the landing page lost its title + SEO meta) nor `react-helmet-async@3` (switches to React-19 "passthrough", which relies on streaming SSR Gatsby doesn't use → `<title>`/meta strand in `<body>`, `body.devbcn-*` class dropped) produces a correct SSR head. The only robust fix is migrating to Gatsby's **Head API** (`export const Head`) — a page-level refactor, since titles/body-class live in shared slide templates (`src/components/<deck>/slide-template.jsx`). Stay on React 18 until then.

## Local Preview (Static Decks)

`npm run serve:static` runs live-server on `static/` with WebSocket-based hot reload — connected browsers refresh automatically whenever any file under `static/` changes. Use this when iterating on a static deck under `static/presentations/<slug>/`; for Gatsby decks, use `npm run develop` instead (port 8000, React HMR).

Visiting `/` shows a dev-only index of every deck under `static/presentations/`, rendered on the fly by `scripts/serve-static-middleware.js` (no file written to `static/`, so it never lands in `public/` or collides with the Gatsby landing). Labels come from each deck's `README.md` first H1, falling back to the slug.

**Idempotent**, so it is safe to call even while a server is already up. If a `live-server` is already serving this worktree (matched by the absolute `--middleware` path, so it never reuses another worktree's server), `serve:static` adopts it — prints its URL, points `.live-server.port` at it, and exits without spawning a duplicate or killing anything. Only when nothing is serving does it spawn a fresh one. This means an agent can run `serve:static` while you have your own server running and it will reuse yours, not replace it.

**Port is random**, not fixed. Each fresh spawn binds a free port (so multiple worktrees on the same machine can run their own `serve:static` in parallel without colliding). On startup the wrapper prints `→ http://localhost:NNNNN/` and writes the port to `.live-server.port` (gitignored) in the worktree root. Read either source to get the URL — e.g. `cat .live-server.port`, then pass `http://localhost:$(cat .live-server.port)/presentations/<slug>/` to `screenshot:deck`, `snapshot:diff`, etc.

**Cleanup runs when the Claude session closes, not per turn.** The wrapper writes `.live-server.pid` (the stop target). A **`SessionEnd`** hook in `.claude/settings.json` runs `npm run --silent serve:static:stop` when the session actually ends — `/exit`, `logout`, or other real termination (the matcher excludes `/clear` and `resume`, so clearing context mid-work leaves the server up). It is deliberately **not** a `Stop` hook: `Stop` fires after every turn, which would tear the server down mid-session. Stop is unconditional — it kills whatever PID is tracked, regardless of who started it (which is fine: it only fires when you're done). Run `npm run serve:static:stop` to stop it by hand at any time. Both paths verify the PID still belongs to a `live-server` process first (recycled-PID guard) and remove the sidecars. Because start is idempotent, at most one server ever exists per worktree; `SessionEnd` is best-effort (a hard terminal-close may skip it), so the next `serve:static` simply reuses a survivor — no pileup.

**Deep-linking to a slide** — static decks accept a `#<N>` hash on initial load (1-indexed) to land on section N. Useful when iterating on one slide so the browser re-opens where you left off:

```
http://localhost:$(cat .live-server.port)/presentations/<slug>/#19
```

This is part of the deck-kit contract (`static/deck-kit/README.md` § URL hash). The `screenshot` script exposes the same entry point via `--slide N [--step K]` for one-shot captures of a specific (section, step) state without manual ArrowRight clicking.

## Visual Review (Screenshots + PDF)

Four Playwright-backed scripts produce visual artifacts. All output goes under `./screenshots/` (gitignored). All capture at 1920×1080.

**Batch-safe one-liners.** The capture/audit scripts are deliberately batch-safe: `screenshot`/`screenshot:deck`/`snapshot:baseline` exit 0 on success, `export:pdf` exits 0 on success but **1 if the exported PDF dropped a clickable link or any page came out shrink-to-fit framed** (its built-in link- and frame-survival checks), `snapshot:diff` exits 1 only on a real pixel regression, and `audit:fit` exits 0 in report mode (non-zero only behind `--ci`). Point them straight at `serve:static` — the `networkidle` hang is gone (`scripts/lib/deck.js` → `gotoDeck`), so no throwaway `python3 -m http.server` host is needed. The remaining footgun is **raw `grep`/`curl` interposed in a chain**: `grep` exits **1** when it matches nothing and `curl` exits non-zero on any transport/non-2xx error, so under `&&`, a pipeline, or `set -euo pipefail` a harmless no-match aborts the rest of the batch. Guard any `grep`/`curl` whose empty result is acceptable with `|| true` (or `|| :`):

```bash
PORT=$(cat .live-server.port)                              # sidecar, written by serve:static
grep -q 'data-step-max' static/.../index.html || true     # presence check — no-match must not abort
HITS=$(grep -c networkidle scripts/*.js || true)          # capture a possibly-zero count
curl -sf "http://localhost:$PORT/..." -o /dev/null || true # probe — a non-200 must not abort
```

**First-time setup** (downloads Chromium ~150MB):
```bash
npm run screenshot:setup
```

**Single URL → PNG** — `screenshot`. For verifying one page (a Gatsby slide, a static deck URL, the landing page). By default waits for non-looping CSS animations to finish before capturing (the slide's "final" state). Pass `--delay <ms>` to capture mid-animation instead.
```bash
npm run screenshot -- http://localhost:8000/ landing
npm run screenshot -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ early-state --delay 200
```

**Whole deck → PNG per (section, step)** — `screenshot:deck`. Walks a `<deck-stage>`-style deck via `ArrowRight` keypress, captures each (section, step) state after animations settle. Outputs `screenshots/<name>/slide-NN.png` for non-stepped sections and `screenshots/<name>/slide-NN-step-K.png` for sections with `data-step-max`.
```bash
npm run screenshot:deck -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ devtalks-current
```

**Single slide at a specific step** — `screenshot --slide N [--step K]`. Loads the deck, jumps to section N (1-indexed), advances to step K, captures. Equivalent to loading the URL with the `#N` hash plus K manual `ArrowRight` presses, without the manual clicking.
```bash
npm run screenshot -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ s19-step1 --slide 19 --step 1
```

**Whole deck → multi-page PDF** — `export:pdf`. Renders a 1920×1080 vector PDF via Chromium's `page.pdf()` in **screen media** with one section per page (`scripts/lib/deck.js` → `paginateForScreenExport`) — text remains selectable, file size stays small (no rasterised slides). Screen media (not print) is what lets `[data-step]` drive each build step instead of the per-slide `@media print` force-reveal collapsing them; the deck's genuine `@media print` fixes are promoted into the export individually (see "print fixes in the PDF export" below). Photographic WebP `<image-slot>` sources are transcoded to JPEG just-in-time before render, because PDF doesn't support WebP and would otherwise embed each one as a multi-megabyte FlateDecode bitmap. Hand the output to conference organizers who require PDF. As its **last steps it runs two self-validating checks** — the PDF link-survival check and the frame-survival check (both below) — and **exits non-zero if any clickable reference was dropped or any page came out shrink-to-fit framed**, so a broken PDF fails the export instead of shipping silently.
```bash
npm run export:pdf -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ /tmp/devtalks-2026.pdf
```

**PDF link-survival check** — `test:pdf-links`. Asserts the deck's clickable references (`<a href>` anchors) survive into the exported PDF as link annotations. This guards against a future change to `export-pdf.js`, an `@media print` rule, or an `<a>` wrapper silently breaking link survival — which otherwise only surfaces when a viewer of the post-talk PDF reports a dead link. `export:pdf` invokes it automatically (reading the deck's anchors live from the DOM); run it standalone to inspect a PDF or re-check one:
```bash
# inspect: print every URL embedded in the PDF, exit 0
npm run test:pdf-links -- /tmp/devtalks-2026.pdf

# guard: derive the expected set live from the deck's index.html <a> anchors,
# fail (exit 1, "missing: …") if any is absent from the PDF
npm run test:pdf-links -- /tmp/devtalks-2026.pdf static/presentations/2026-devtalks-romania/

# guard against an explicit JSON list of URLs instead of the deck markup
npm run test:pdf-links -- /tmp/devtalks-2026.pdf path/to/expected-pdf-links.json
```
Only `<a href>` anchors count — stylesheet/font/preconnect `<link>`s and `og:`/`<meta>` URLs are not anchors and never become PDF link annotations, so they are excluded from the expected set. URLs are normalized for comparison, so a bare origin and its trailing-slash form (`https://blog.marcnuri.com` vs `…/`, as Chromium stores it) match. Backed by `pdf-lib` (pure JS, no native deps); the shared extraction/diff logic lives in `scripts/lib/pdf-links.js`, unit-tested under `tests/pdf-links/` (`node --test tests/pdf-links/*.spec.js`). This is a repo-level PDF-output concern, **not** a deck-kit one.

**PDF frame-survival check** — `test:pdf-frame`. Asserts every exported page is full-bleed, i.e. `page.pdf()` did **not** shrink-to-fit the deck into a white right/bottom frame. Background (issue #1908): when a slide stages content off-screen for a slide-in animation (its un-clipped box escapes the 1920px slide), Chromium's `page.pdf()` measures that overflow and scales **every** page to ~0.943, anchored top-left. `contain: size` on each section in `paginateForScreenExport` prevents it; this check is the guard that fails the export loudly if a regression lets it back in — otherwise it surfaces only when someone opens the post-talk PDF. Detection is **structural, not rasterised**: a full-bleed page maps CSS px → PDF points at exactly `0.75` (= 72/96 dpi), which is the cumulative scale of the page content stream's leading `cm` matrices; a framed page carries the extra ~0.943 factor (≈0.707). `export:pdf` runs it automatically; standalone:
```bash
npm run test:pdf-frame -- /tmp/devtalks-2026.pdf
```
Backed by `pdf-lib` + Node's built-in `zlib` (no rasteriser, no poppler); logic in `scripts/lib/pdf-frame.js`, unit-tested under `tests/pdf-frame/` (`node --test tests/pdf-frame/*.spec.js`). Like the link check, a repo-level PDF-output concern, **not** a deck-kit one.

**Print fixes in the PDF export.** A deck slide may carry an `@media print` block for static-capture fixes (e.g. cancelling a `filter: drop-shadow` that would rasterise an SVG, or flattening a 3D flip). Because the export renders in *screen* media, `paginateForScreenExport` re-activates these blocks individually. The contract: **a print block is promoted into the export UNLESS it is a "force-reveal"** — a block that un-hides every build step at once via `opacity`/`visibility`/`animation` and is *not* scoped to a `data-step` (those are left print-only so the deck's own `[data-step]` rules govern the per-step build). So: filter/box-shadow/background fixes and `data-step`-scoped fixes are honored; a blanket `opacity:1 !important` reveal is not. Keep a step-reveal force-reveal and a genuine visual fix in *separate* `@media print` blocks so the classifier sees each correctly.

**Step-aware capture**: a `<section>` that publishes `data-step-max="N"` becomes N+1 PDF pages (in `export:pdf`) and N+1 PNGs (in `screenshot:deck` / snapshot scripts), rendered at `data-step="0..N"`. This is the contract `.s-amplifier` uses (3 states per slide); any future stepping slide should follow it and all four scripts will pick it up with no code changes.

`screenshot:deck` and the snapshot scripts walk the deck via **keyboard simulation** (`ArrowRight`) — agnostic of any specific `deck-stage` API, so they keep working as `deck-stage.js` evolves. The walker is step-aware: it discovers `(section, step)` pairs up front from `data-step-max` and presses ArrowRight once per pair, matching the deck's own step-reveal handler. `export:pdf` takes a different path (DOM-clone the step states, paginate one section per page, render once in screen media) because per-slide PNGs can't preserve vector text or compress photos efficiently.

## Font Sizing & Legibility (Static Decks)

Static decks are authored on a monitor at arm's length, so the instinct is to size text like a web page. **Resist it** — these slides get *projected*, and the back row reads them at distance. A deck that looks balanced on your screen is routinely 1.5–2× too small in the room.

**The conversion.** A `<deck-stage>` renders on a fixed **1920×1080 canvas** scaled uniformly to fit the screen, so legibility is governed by *letter height as a fraction of slide height* — invariant of the physical screen. A 16:9 slide in PowerPoint/Keynote/Google Slides is 7.5 in = **540 pt** tall, and 1080px maps onto it, so:

```
presentation-pt-equivalent  =  px ÷ 2          (e.g. 24px = 12pt, 48px = 24pt)
% of slide height            =  px ÷ 1080
```

Published presentation guidance (24pt minimum body, 30pt "ideal", 18pt hard floor; corroborated by Extron's videowall rule and DIN 1450's visual-angle method) translates to these **authoring floors in deck-px**:

| Role | Floor (px) | ≈pt | Notes |
|---|---|---|---|
| Slide title / hero numeral | **≥ 72** | ≥ 36 | display tier; bigger is fine |
| Body the audience must read | **≥ 48** ideal, **36 hard floor** | 24 / 18 | never put must-read prose/labels below 36px |
| Code / console / mono content | **≥ 28** | ≥ 14 | the speaker walks through it — it's must-read |
| Decorative chrome only | 20–24 | 10–12 | rails, eyebrows, non-informational pills |

**Rules of thumb:**

- **Nothing the audience must read goes below ~28px (14pt).** If content only fits at a smaller size, the slide is **over-stuffed** — cut rows, split it, or summarize a UI mockup instead of reproducing it pixel-for-pixel. Shrinking the font is not the fix.
- The "decorative chrome only" tier is for text that carries **no information the audience needs**. A status pill reading `Open`/`Merged`, an issue number, or an axis value is *not* decorative — size it as content.
- This supersedes the older informal "console/terminal ≥ 20px" floor; 20px is 10pt, already below the research minimum. Use **≥ 28px** for mono content the speaker reads aloud.
- Verify in the room's terms, not the editor's: capture with `screenshot:deck` and check whether body text clears ~36px / titles ~72px. The default type scale in `tokens.css` (`--type-body: 32px`, `--type-small/mono/eyebrow: 24px`) sits *below* these floors — treat it as a starting point to push up, not a target.

Full research, per-slide findings, and source citations live in each deck's `FONT-AUDIT.md` when one exists (e.g. `static/presentations/2026-devtalks-romania/FONT-AUDIT.md`).

## Snapshot Regression Tests

Pixel-diff guard against unintended visual changes during a work session. Backed by `pixelmatch` with anti-aliasing tolerance (real changes flagged, sub-pixel font noise ignored).

**Baselines are session-scoped, not committed.** The entire `snapshots/` directory is gitignored. The pattern is always:

1. `npm run snapshot:baseline -- <url> <deck-name>` — capture the "before" state, **before touching anything**
2. Do the work (edits, refactor, content change, image swap…)
3. `npm run snapshot:diff -- <url> <deck-name>` — capture "after" and overlay onto the session baseline
4. Eyeball each diff PNG under `snapshots/<deck-name>/diff/` — confirm every delta is intended
5. Move on. No `git add` of snapshots ever — they're disposable reference points.

```bash
npm run snapshot:baseline -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ <deck-name>
# … do your work …
npm run snapshot:diff -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ <deck-name>
```

Layout (all gitignored):
```
snapshots/<deck-name>/
  baseline/   the "before" capture for this session
  current/    the "after" capture from the most recent diff run
  diff/       red-overlay PNGs for changed slides only
```

Per-slide console report shows pixel-diff count + %. Exit code: 0 if all slides identical, 1 if any differ. New or removed slides count as changes.

**Why session-scoped**: decks evolve — new slides, content tweaks, design refreshes. A long-lived committed baseline would drift and force constant re-promotion churn, and the value of the diff is "before-vs-after this change", not "drift from some historic snapshot". The discipline that matters is *always capturing baseline first*; the storage is throwaway.

## Fit & Legibility Audit

`npm run audit:fit` walks every `(section, step)` of a deck and measures the **active** section in its native 1920×1080 canvas — no screenshots, pure DOM measurement, so it is fast and deterministic. It prints one progress line per state as it walks (tagged with the section's class / `data-label`, e.g. `slide 22 step 0 [s-blackbox]: ✓ fit · 103 below 28px (min 18px)`), writes the full findings to `screenshots/<name>.fit.json` (gitignored, each state carrying `cls`/`dataLabel` plus the lists below and a `belowFloorByPx` histogram in the summary), and ends with a one-line totals summary. Each state reports two things:

- **overflow** — content being cut off: a clipping container whose own content is larger than its box (`scroll > client`), or a text run whose box escapes the 1920×1080 slide. Horizontal clipping is reported only on a *text run* (a truncated label, annotated `ellipsis` when deliberate) — a pure-layout track that clips wider children (conveyor belt, marquee, terminal-log texture) is a deliberate window, not cut-off prose. Vertical clipping is reported for any container (content taller than its box is a real fit failure).
- **belowFloor** — every visible text run rendered below the legibility floor (`--floor`, default **28px = 14pt**, the FONT-AUDIT must-read hard floor). Each carries `px`, `pt` (px/2), `pctHeight` (px/1080) and `mono`, so decorative chrome (20–24px, acceptable) is easy to tell from must-read content. Faint decorative text (effective opacity < 0.25 — ghost watermarks, un-revealed step layers) is excluded from both checks.

It is **batch-safe**: report mode always exits 0, so a stalled stdout never cancels a batch — just `Read` the JSON when the drain lands. `--ci` makes it exit 1 on any overflow or sub-floor run (scope `--floor` to your gate, e.g. `--floor 20` for the absolute project minimum). Same no-`networkidle` navigation as the capture scripts, so point it straight at `serve:static`.

```bash
# whole deck, default 28px floor
npm run audit:fit -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/
# one slide (all steps) against the stricter 36px must-read target
npm run audit:fit -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ s22 --slide 22 --floor 36
# CI gate at the absolute minimum
npm run audit:fit -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ <slug> --floor 20 --ci
```

This is the first-class replacement for hand-rolled overflow/font-size probe scripts — see the FONT-AUDIT floors (px÷2 = pt on a 1080px canvas) it encodes.

## Image Optimization

`npm run optimize:images -- <input> <output.webp>` converts any raster source (JPEG, PNG, TIFF, HEIC, WebP) into a WebP at the destination path. Use this as a **pre-pass before committing image assets** — the original raster is never stored in the repo, only the `.webp` output.

- PNG / GIF / TIFF inputs → **lossless** WebP (preserves transparency + crisp logo edges)
- JPEG / WebP inputs → **lossy** WebP at quality 80
- `--lossy` flag → force lossy WebP regardless of source format. Use for **photographic content stored as PNG** (e.g. AI-generated scene art, screenshots of dashboards) where the default lossless behavior balloons output to multiple megabytes for no perceptual gain.
- Resolution preserved unless the long side exceeds 3840px (4K UHD), in which case the image is downscaled (aspect preserved, lanczos3)
- SVG and animated images are refused — use `svgo` for SVG; the deck doesn't need animated rasters
- EXIF metadata is stripped by default

```bash
npm run optimize:images -- ~/Downloads/conference-hero.jpg \
  static/presentations/2026-devtalks-romania/assets/photos/hero.webp

# AI-generated PNG scene → small lossy WebP
npm run optimize:images -- ~/Downloads/ai-scene.png \
  static/presentations/<slug>/assets/scene.webp --lossy
```

Backed by `sharp` (libvips); no system dependencies beyond `npm install`.

## PPTX / Google Slides decks (external & private talks)

Not every talk is a web deck. **Internal/private talks** are authored as **Google Slides** and live *outside this repo* (a `presentations-private` sibling repo and/or a Google Workspace Drive folder), so they are never published to the public site. This repo carries no `.pptx` decks but does carry the reusable **tooling** for that workflow.

- **Author** with PptxGenJS (in the private deck repo — intentionally *not* a dependency here) → `.pptx` → **drag into the Drive folder** → Google converts it to an editable Slides deck. Fidelity is high even for complex slides (Gantts, connector diagrams, terminal/monospace + diff, chrome bars). Use **Arial** / **Courier New** for clean conversion.
- **Inspect** with `npm run pptx:render -- <deck.pptx> [--engine libreoffice|powerpoint] [--dpi 150]` → one PNG per slide under `screenshots/pptx-render/<deck>/` (gitignored). LibreOffice by default (fast, headless); PowerPoint for exact fidelity. Needs LibreOffice (`brew install --cask libreoffice`) + poppler; both engines run **outside** the sandbox (registered in `.claude/settings.json`, like `screenshot`/`export:pdf`).

Full workflow, fidelity notes, caveats, and the iteration loop: **`docs/pptx-decks.md`**.

## Workflows

Canonical sequences for deck work. Tools (above) tell you *what* each script does; this section tells you *when* and *in what order*.

### 1. Onboarding a new upstream deck (e.g., Claude Design handoff)

The handoff bundle (the zip from Claude Design) is the upstream reference — **keep the original zip somewhere recoverable; do not commit it.** Pristine bundles are bloated (inline base64 megabytes, alternate module forms, design-canvas internals, exploration scratch slides, source uploads) and offer no diffing value, because the zip is always recoverable.

1. **Identify the runtime files.** The bundle's own README usually names the master deck HTML. Follow its imports. Many bundled JS files turn out to already be inlined in the HTML; lots of others are design-canvas internals, screenshots, or alternate-form modules not loaded at runtime.
2. Copy only those runtime files into `static/presentations/<slug>/`.
3. `npm run serve:static` and open http://localhost:$(cat .live-server.port)/presentations/<slug>/ to verify it boots.
4. **Clean it up before the first commit**, following workflow #2 for each pass: extract inline data URLs to external assets, `optimize:images --lossy` for AI-generated photographic PNGs, replace upstream placeholders with real assets, drop bundle dupes. Use the `snapshot:baseline` → edit → `snapshot:diff` dance to keep each pass honest.
5. When the deck is in shape, commit the cleaned state. Add an *"Already refactored from the upstream bundle"* section to the deck-local `README.md` listing what was changed from the zip — that section is the diffing record for future readers, replacing the role a pristine commit would have played.

**Why no pristine commit**: bundles are ~10–15 MB of mostly junk (screenshots, design-canvas state, source uploads, inline base64 that we immediately externalize). Committing them adds permanent repo bloat for ~zero value — the zip is the only reference anyone would ever want, and we already have it. The "what changed from upstream" record lives in the deck README, not in git history.

### 2. Any edit pass (refactor, content change, visual tweak, image swap)

Same pattern whether the change is supposed to be invisible (refactor) or very visible (new slide, color tweak, logo swap).

1. `npm run serve:static` running in one terminal.
2. **Before editing**: `npm run snapshot:baseline -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ <deck-name>` to capture the "before" state.
3. Edit files. Browser auto-reloads.
4. `npm run snapshot:diff -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ <deck-name>`.
5. Review every flagged capture under `snapshots/<deck-name>/diff/slide-NN[-step-K].png`. Confirm each delta matches intent:
   - Refactor: expect 0 diffs. Any diff is a regression — investigate, don't shrug.
   - Visual change: expect diffs only on the slides you touched. Anything else is collateral damage.
6. Commit code changes only. `snapshots/` is gitignored — nothing to add there.

**Gotcha**: forgetting step 2 (the pre-edit baseline) is the cardinal sin — without it, step 4 has nothing to compare against and you lose the safety net entirely.

### 3. Pre-talk deliverables

1. `npm run snapshot:baseline` then load the deck and click through it visually as a sanity pass.
2. `npm run export:pdf -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ /tmp/<talk-name>.pdf` for the conference PDF handover.
3. Cut the release. Bump `package.json` version and push — that publishes `@marcnuri/presentations@<v>` with the final deck baked into `public/`. Then create the GitHub release carrying the deck PDF: `gh release create v<v> /tmp/<talk-name>.pdf --target $(git rev-parse HEAD) --latest` (tags use a `v` prefix). When a companion links page links straight to the PDF, the **asset filename is load-bearing** — name it exactly what the page hardcodes (the 2026 Romania links page expects `devtalks-romania-2026.pdf`). Re-cut after later deck edits with `gh release upload v<v> <pdf> --clobber`, keeping the same filename.

**Gotcha — smoke-testing the published package**: `npx -y @marcnuri/presentations@<v>` run **from inside this repo** fails with `sh: mn-presentations: command not found` whenever `<v>` equals the local `package.json` version. npx satisfies the spec from the local project instead of the registry, then tries to exec the bin from the project's own `node_modules/.bin/` — where a package never symlinks its own bin. It is **not** a packaging bug. Verify from a neutral directory (`cd ~ && npx -y @marcnuri/presentations@<v>`) or with the heuristic-proof explicit-bin form `npx -y -p @marcnuri/presentations@<v> mn-presentations`. The bin (`mn-presentations` → `index.js`) serves `public/` via Express on `:8000`.

## Deploy

Two channels publish on every push to `main`, plus a separate per-PR preview environment on a different vendor.

| Channel | Trigger | Workflow / Vendor | Notes |
|---|---|---|---|
| **Production** → `presentations.marcnuri.com` | push to `main` | `.github/workflows/publish-gh-pages.yml` (GitHub Pages) | Always runs. CNAME comes from `static/CNAME`. |
| **NPM** `@marcnuri/presentations` | push to `main` | `.github/workflows/publish-npm.yml` | Requires a `version` bump in `package.json` to publish a new release. Uses OIDC Trusted Publisher (no `NPM_TOKEN`). The `bin: mn-presentations` (`index.js`) serves `public/` via Express. |
| **Per-PR preview** → `*.presentations-a7o.pages.dev` | push to any non-main branch / PR | Cloudflare Pages (separate vendor) | Static decks only (`static/` is the published output dir, no build command). Production branch in Cloudflare is `main` so a mirror at `presentations-a7o.pages.dev` exists; previews land at `<commit-sha>.presentations-a7o.pages.dev`. Cloudflare posts a sticky PR comment with the URL. |

The NPM workflow runs `replaceDependencies.sh` before publish — it rewrites `dependencies` down to `express` only, so the installed package is a tiny static-server runtime, not a full Gatsby build.

### Production isolation

The three channels are configured so that **only `publish-gh-pages.yml` can affect `presentations.marcnuri.com`**:

- Cloudflare Pages and the NPM publish workflow have no write access to the `gh-pages` branch, `static/CNAME`, or DNS for `marcnuri.com`.
- A bug or misconfiguration in the Cloudflare project — or the loss of the Cloudflare account — can't take the production deck domain down. The blast radius is bounded to the `.pages.dev` mirror and the per-PR preview URLs.
- This was the load-bearing requirement when picking Cloudflare Pages over a same-branch path-scoped approach on `gh-pages` (see manusa/com.marcnuri.automated-tasks#1819).

### Preview access control

All `*.presentations-a7o.pages.dev` URLs (the production mirror and every per-PR preview) are gated by **Cloudflare Access**. Authentication is via **GitHub OAuth** with a policy of `login is manusa` — drafts and PR previews are visible only to the repo owner. The production deck at `presentations.marcnuri.com` is unaffected and stays publicly served by GitHub Pages.

### Preview landing page

Cloudflare Pages comments on PRs with the deployment's **root URL** (e.g. `https://<commit>.presentations-a7o.pages.dev/`). The root serves `static/index.html`, a generated listing of every deck under `static/presentations/`, **newest first**. Generate or refresh it with `npm run gen:landing` (idempotent; chained into `npm run serve:static` for local dev). Per-deck metadata comes from a `meta.json` next to the deck's `README.md`; see "Adding a New Deck" below.

## Adding a New Deck

- **Gatsby deck**: follow the pattern of `src/pages/presentations/2025-devbcn-model-context-protocol-servers/` and its sibling `src/components/2025-devbcn-model-context-protocol-servers/`.
- **Static deck**: drop a self-contained directory at `static/presentations/<deck-slug>/`, include a directory-local `README.md` capturing decisions, and link it from `src/components/landing-page/index.jsx` if you want it listed on the front page. Load `<deck-stage>` and `<image-slot>` from `static/deck-kit/` (`<script src="../../deck-kit/deck-stage.js" defer>` from the deck's `index.html`) — do **not** copy them inline. The deck-kit append-only contract is described in `static/deck-kit/README.md` and pinned by `npm run test:deck-kit`. Reference: `static/presentations/2026-devtalks-romania/`.
  - Add a `meta.json` next to the deck's `README.md` with `{ "title": "...", "subtitle": "...", "date": "YYYY-MM-DD" }` — this populates the Cloudflare-Pages preview landing (`static/index.html`). `date` (the talk date, ISO) is the landing's sort key: decks are listed **newest first**, and any deck missing a `date` falls to the end. Title fallback chain is `meta.json` → first H1 of `README.md` → slug.
  - After adding (or renaming, or removing) a deck, run `npm run gen:landing` to regenerate `static/index.html` and commit the regenerated file alongside the deck change. The script is idempotent — re-runs only touch the file if its content would change, so it's safe to run anytime. The dev middleware (`scripts/serve-static-middleware.js`) auto-discovers decks at request time during `npm run serve:static`, so the regen step is only required for production (Cloudflare Pages serves the file directly).

## Repo Conventions

- Commit messages use **gitmoji** (`✨` feature, `🐛` fix, `♻️` refactor, `👷` CI, etc.) plus a short imperative subject (see `git log`).
- **Cross-repo issue references** — tracker issues for this repo live in `manusa/com.marcnuri.automated-tasks`, not in `manusa/presentations`. A bare `Fixes #1234` in a commit or PR body resolves against the *current* repo and silently does nothing for tracker issues. Always use the full `owner/repo#N` coordinate: `Fixes manusa/com.marcnuri.automated-tasks#1234`. Without it the tracker issue stays open after merge.
- Per-deck SCSS variables and mixins live under `src/components/<deck-slug>/styles/` (Gatsby decks only).
- Custom-domain config: `static/CNAME` — do not move.
- PRs to `main` cannot merge while the `deck-kit tests / test` check is red. The contract is enforced mechanically, not on the honor system — investigate the failure, do not bypass.
