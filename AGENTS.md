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

## Local Preview (Static Decks)

`npm run serve:static` runs live-server on `static/` with WebSocket-based hot reload — connected browsers refresh automatically whenever any file under `static/` changes. Use this when iterating on a static deck under `static/presentations/<slug>/`; for Gatsby decks, use `npm run develop` instead (port 8000, React HMR).

Visiting `/` shows a dev-only index of every deck under `static/presentations/`, rendered on the fly by `scripts/serve-static-middleware.js` (no file written to `static/`, so it never lands in `public/` or collides with the Gatsby landing). Labels come from each deck's `README.md` first H1, falling back to the slug.

**Port is random**, not fixed. Each invocation binds a free port (so multiple worktrees on the same machine can run their own `serve:static` in parallel without colliding). On startup the wrapper prints `→ http://localhost:NNNNN/` and writes the port to `.live-server.port` (gitignored) in the worktree root. Read either source to get the URL — e.g. `cat .live-server.port`, then pass `http://localhost:$(cat .live-server.port)/presentations/<slug>/` to `screenshot:deck`, `snapshot:diff`, etc.

**Cleanup is automatic** for Claude Code sessions. The wrapper also writes `.live-server.pid`; the Stop hook in `.claude/settings.json` runs `npm run --silent serve:static:stop` when the session ends, which reads the PID, verifies it still belongs to a `live-server` process (scoped check so it never kills another worktree's server), terminates it, and removes both sidecar files. Outside a Claude session, run the same command manually: `npm run serve:static:stop`.

## Visual Review (Screenshots + PDF)

Four Playwright-backed scripts produce visual artifacts. All output goes under `./screenshots/` (gitignored). All capture at 1920×1080.

**First-time setup** (downloads Chromium ~150MB):
```bash
npm run screenshot:setup
```

**Single URL → PNG** — `screenshot`. For verifying one page (a Gatsby slide, a static deck URL, the landing page). By default waits for non-looping CSS animations to finish before capturing (the slide's "final" state). Pass `--delay <ms>` to capture mid-animation instead.
```bash
npm run screenshot -- http://localhost:8000/ landing
npm run screenshot -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ early-state --delay 200
```

**Whole deck → PNG per slide** — `screenshot:deck`. Walks a `<deck-stage>`-style deck via `ArrowRight` keypress, captures each slide after animations settle. Outputs `screenshots/<name>/slide-NN.png`.
```bash
npm run screenshot:deck -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ devtalks-current
```

**Whole deck → multi-page PDF** — `export:pdf`. Renders straight to a 1920×1080 vector PDF via Chromium's `page.pdf()` against the deck's `@media print` rule — text remains selectable, file size stays small (no rasterised slides). Photographic WebP `<image-slot>` sources are transcoded to JPEG just-in-time before render, because PDF doesn't support WebP and would otherwise embed each one as a multi-megabyte FlateDecode bitmap. Hand the output to conference organizers who require PDF.
```bash
npm run export:pdf -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ /tmp/devtalks-2026.pdf
```

**Step-aware capture**: a `<section>` that publishes `data-step-max="N"` becomes N+1 PDF pages, rendered at `data-step="0..N"`. This is the contract `.s-amplifier` uses (3 states per slide); any future stepping slide should follow it and `export:pdf` will pick it up with no code changes.

`screenshot:deck` and the snapshot scripts walk the deck via **keyboard simulation** (`ArrowRight`) — agnostic of any specific `deck-stage` API, so they keep working as `deck-stage.js` evolves. `export:pdf` takes a different path (DOM-clone the step states, render once in print media) because per-slide PNGs can't preserve vector text or compress photos efficiently.

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
5. Review every flagged slide under `snapshots/<deck-name>/diff/slide-NN.png`. Confirm each delta matches intent:
   - Refactor: expect 0 diffs. Any diff is a regression — investigate, don't shrug.
   - Visual change: expect diffs only on the slides you touched. Anything else is collateral damage.
6. Commit code changes only. `snapshots/` is gitignored — nothing to add there.

**Gotcha**: forgetting step 2 (the pre-edit baseline) is the cardinal sin — without it, step 4 has nothing to compare against and you lose the safety net entirely.

### 3. Pre-talk deliverables

1. `npm run snapshot:baseline` then load the deck and click through it visually as a sanity pass.
2. `npm run export:pdf -- http://localhost:$(cat .live-server.port)/presentations/<slug>/ /tmp/<talk-name>.pdf` for the conference PDF handover.
3. Optionally bump `package.json` version → next push releases a fresh `@marcnuri/presentations` tag with the final deck baked into `public/`.

## Deploy

Two GitHub Actions publish on every push to `main`:

| Channel | Workflow | Notes |
|---|---|---|
| GitHub Pages → `presentations.marcnuri.com` | `.github/workflows/publish-gh-pages.yml` | Always runs. CNAME comes from `static/CNAME`. |
| NPM `@marcnuri/presentations` | `.github/workflows/publish-npm.yml` | Requires a `version` bump in `package.json` to publish a new release. Uses OIDC Trusted Publisher (no `NPM_TOKEN`). The `bin: mn-presentations` (`index.js`) serves `public/` via Express. |

The NPM workflow runs `replaceDependencies.sh` before publish — it rewrites `dependencies` down to `express` only, so the installed package is a tiny static-server runtime, not a full Gatsby build.

## Adding a New Deck

- **Gatsby deck**: follow the pattern of `src/pages/presentations/2025-devbcn-model-context-protocol-servers/` and its sibling `src/components/2025-devbcn-model-context-protocol-servers/`.
- **Static deck**: drop a self-contained directory at `static/presentations/<deck-slug>/`, include a directory-local `README.md` capturing decisions, and link it from `src/components/landing-page/index.jsx` if you want it listed on the front page. Reference: `static/presentations/2026-devtalks-romania/`.

## Repo Conventions

- Commit messages use **gitmoji** (`✨` feature, `🐛` fix, `♻️` refactor, `👷` CI, etc.) plus a short imperative subject (see `git log`).
- Per-deck SCSS variables and mixins live under `src/components/<deck-slug>/styles/` (Gatsby decks only).
- Custom-domain config: `static/CNAME` — do not move.
