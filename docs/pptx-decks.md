# PPTX / Google Slides decks (external & private talks)

Most decks in this repo are HTML/Gatsby web decks published to
`presentations.marcnuri.com`. Some talks are **internal or private** and are
authored as **Google Slides** instead, so they are never published to the public
site. Those decks live **outside this repo** (a `presentations-private` sibling
repo and/or a Google Workspace Drive folder).

This repo carries no `.pptx` decks, but it does carry the reusable **tooling** for
that workflow, because the render/inspect step benefits from living alongside the
other capture scripts. This document is the reference for that workflow.

## Why this route

- Internal slides should not be published publicly. Hosting them in a Google
  **Workspace** Drive folder makes them shareable with colleagues (a
  domain-scoped "anyone at the org with the link" share) with zero public
  exposure.
- Google Slides is collaborative and editable, native to Workspace.

## Authoring: PptxGenJS → editable Google Slides

Author the deck as data-driven JavaScript with
[**PptxGenJS**](https://gitbrent.github.io/PptxGenJS/) (kept in the private deck
repo — it is intentionally **not** a dependency of this repo). It emits a `.pptx`.

Get it into Drive by **dragging the `.pptx` into the Google Drive folder** — Google
auto-converts it to an editable Google Slides deck. (Programmatic upload through the
Drive API requires the whole binary inlined as base64, which is impractical for a
real deck, so drag-to-convert is the pragmatic path. Text files like an outline
*can* be created directly as a Google Doc.)

**Conversion fidelity is high** and has been validated end-to-end on: simple
title/bullet slides, a dense Gantt (30+ absolutely-positioned blocks), a
hub-and-spoke diagram with connector **lines** (Google does *not* re-route them), a
terminal window with **monospace + a colored diff**, and header/footer **chrome**
bars. Each shape becomes a separately editable Slides object.

Authoring tips for clean conversion:

- Use widely-available fonts: **Arial** for text, **Courier New** for
  monospace/terminal. Mac-only fonts (Menlo, SF Mono) risk substitution in Google.
- Very narrow shapes can wrap their text — give them a little more width.
- Author at **13.333 × 7.5 in** (16:9); `1 in = 72 pt = 96 px`.

## Visual inspection: `npm run pptx:render`

Render a `.pptx` to one PNG per slide, so the deck can be eyeballed (by a person, or
by an agent via image tools) without opening an app.

```bash
npm run pptx:render -- <deck.pptx> [--engine libreoffice|powerpoint] [--dpi 150] [--out <dir>]
```

- **Output:** `screenshots/pptx-render/<deck>/slide-N.png` (gitignored), or `--out`.
- **`--engine libreoffice`** (default) — LibreOffice headless. Fast (~5 s), no GUI,
  no focus-steal, reads/writes any path. Fidelity matches PowerPoint.
- **`--engine powerpoint`** (macOS) — drives installed Microsoft PowerPoint via
  AppleScript for exact PowerPoint fidelity. Slower (launches the app), and because
  PowerPoint is itself App-Sandboxed it stages files under `~/Downloads`.
- Backed by `soffice` / `osascript` + `pdftoppm` (poppler). No npm dependencies.

For a zero-install single-slide glance, `qlmanage -t -s 1600 -o <dir> deck.pptx`
renders slide 1 via built-in QuickLook.

### Prerequisites (macOS)

```bash
brew install --cask libreoffice   # default render engine
brew install poppler              # pdftoppm
# PowerPoint engine additionally needs Microsoft PowerPoint installed
```

### Sandbox note

Both render engines must run **outside** the Claude Code sandbox: headless
`soffice` needs a macOS XPC service and PowerPoint uses Apple events, both blocked
in-sandbox (soffice hangs; PowerPoint silently no-ops writing to `/tmp`). The tool
is registered in `.claude/settings.json` (`sandbox.excludedCommands` +
`permissions.allow`) so `npm run pptx:render` runs unsandboxed and prompt-free —
the same pattern used by `screenshot` / `export:pdf`.

## The iteration loop

```
edit generator.js  →  node generator.js  (PptxGenJS → deck.pptx)
                    →  npm run pptx:render -- deck.pptx
                    →  inspect the PNGs  →  adjust
```

When the deck looks right, drag the `.pptx` into the Drive folder to refresh the
Google Slides version, then re-check in Google. The **chrome bars**, **connector
lines**, and **monospace/diff** are the elements most worth a final look, since they
are the ones most likely to shift in any pptx→Slides conversion.
