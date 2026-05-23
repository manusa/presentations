# AGENTS.md

Self-contained slide deck for **DevTalks Romania 2026** ("Turning Your Java Project Into an AI-Ready Codebase").

This deck is plain HTML / CSS / vanilla-JS — **not** the React/Gatsby slide framework used by other decks under `src/pages/presentations/*`. Do not port it into the Gatsby pipeline.

**Before editing, read [`README.md`](./README.md) in this directory.** It covers placement, slide model, deploy paths, and tradeoffs.

## Quick rules

- Slides are `<section>` blocks under `<deck-stage>` in `index.html`. Edit text in HTML directly.
- Theme via the `:root` CSS custom properties in the same `<style>` block (e.g. `--bg`, `--accent`, `--pink`).
- `deck-stage.js` is a vanilla-JS web component (nav, scaling, print, rail). Don't touch it for content or cosmetic changes — only for structural behavior.
- This directory ships verbatim through both deploy paths (GH Pages + NPM) because it lives under `static/`. No Gatsby integration is needed or wanted.
- Bumping the root `package.json` `version` is required for the NPM publish workflow to push a new tag; the GH Pages publish runs regardless.
