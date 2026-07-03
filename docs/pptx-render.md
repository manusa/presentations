# `pptx:render` — render a `.pptx` to per-slide PNGs

A small utility to rasterize a PowerPoint `.pptx` into one PNG per slide, so a deck
can be eyeballed without opening an app. **This repo has no `.pptx` decks of its own**
(all decks here are HTML/Gatsby web decks) — the tool is kept as a generic
convenience, e.g. to inspect a `.pptx` you've been handed.

```bash
npm run pptx:render -- <deck.pptx> [--engine libreoffice|powerpoint] [--dpi 150] [--out <dir>]
```

- **Output:** `screenshots/pptx-render/<deck>/slide-N.png` (gitignored), or `--out`.
- **`--engine libreoffice`** (default) — LibreOffice headless: fast (~5 s), no GUI.
- **`--engine powerpoint`** (macOS) — drives installed Microsoft PowerPoint via
  AppleScript for exact PowerPoint fidelity; slower (launches the app), and because
  PowerPoint is itself App-Sandboxed it stages files under `~/Downloads`.
- Backed by `soffice` / `osascript` + `pdftoppm` (poppler). No npm dependencies.

For a zero-install single-slide glance, `qlmanage -t -s 1600 -o <dir> deck.pptx`
renders slide 1 via built-in QuickLook.

## Prerequisites (macOS)

```bash
brew install --cask libreoffice   # default engine
brew install poppler              # pdftoppm
# the PowerPoint engine additionally needs Microsoft PowerPoint installed
```

## Sandbox note

Both engines must run **outside** the Claude Code sandbox: headless `soffice` needs a
macOS XPC service and PowerPoint uses Apple events, both blocked in-sandbox
(soffice hangs; PowerPoint silently no-ops writing to `/tmp`). The tool is registered
in `.claude/settings.json` (`sandbox.excludedCommands` + `permissions.allow`) so
`npm run pptx:render` runs unsandboxed and prompt-free — the same pattern used by
`screenshot` / `export:pdf`.
