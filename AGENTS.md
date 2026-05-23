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
