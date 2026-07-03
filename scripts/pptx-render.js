#!/usr/bin/env node
/*
 * Render a .pptx to one PNG per slide so a deck can be visually inspected.
 *
 * Default engine: LibreOffice headless (fast ~5s, no GUI/focus-steal).
 * Fallback engine: Microsoft PowerPoint via AppleScript (macOS, exact fidelity).
 * No npm dependencies — shells out to `soffice`/`osascript` + `pdftoppm` (poppler).
 *
 * Usage:
 *   npm run pptx:render -- <deck.pptx> [--engine libreoffice|powerpoint] [--dpi 150] [--out <dir>]
 *
 * Output: PNGs at screenshots/pptx-render/<deck>/slide-N.png (screenshots/ is gitignored),
 * or under --out.
 *
 * macOS note: BOTH engines must run OUTSIDE the Claude Code sandbox (Apple events / XPC
 * are blocked in-sandbox — soffice hangs, PowerPoint no-ops). This script is registered in
 * .claude/settings.json (sandbox.excludedCommands + permissions.allow) so it runs unsandboxed
 * and prompt-free. There are no .pptx decks in this repo; this tool serves external/Drive decks.
 */
'use strict';
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function parseArgs(argv) {
  const a = { engine: 'libreoffice', dpi: 150, out: null, src: null };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--engine') a.engine = argv[++i];
    else if (t === '--dpi') a.dpi = parseInt(argv[++i], 10);
    else if (t === '--out') a.out = argv[++i];
    else if (!t.startsWith('--') && !a.src) a.src = t;
  }
  return a;
}

function findSoffice() {
  const mac = '/Applications/LibreOffice.app/Contents/MacOS/soffice';
  return fs.existsSync(mac) ? mac : 'soffice';
}

// LibreOffice: fresh -env profile per run avoids a lock left by a killed run.
function renderLibreOffice(src, pdfDir) {
  const profile = path.join(os.tmpdir(), `lo_profile_${process.pid}`);
  execFileSync(findSoffice(), [
    '--headless', `-env:UserInstallation=file://${profile}`,
    '--convert-to', 'pdf', '--outdir', pdfDir, src,
  ], { stdio: 'inherit' });
  return path.join(pdfDir, path.basename(src).replace(/\.pptx$/i, '.pdf'));
}

// PowerPoint is App-Sandboxed and only writes user folders -> stage under ~/Downloads.
function renderPowerPoint(src, pdfDir) {
  const stage = path.join(os.homedir(), 'Downloads', '.pptx-render');
  fs.mkdirSync(stage, { recursive: true });
  const inPptx = path.join(stage, 'in.pptx');
  const outPdf = path.join(stage, 'out.pdf');
  fs.copyFileSync(src, inPptx);
  try { fs.unlinkSync(outPdf); } catch { /* first run */ }
  const lines = [
    'tell application "Microsoft PowerPoint"',
    `open (POSIX file "${inPptx}" as string)`,
    'delay 1',
    'set thePres to active presentation',
    `save thePres in (POSIX file "${outPdf}" as string) as save as PDF`,
    'close thePres saving no',
    'end tell',
  ];
  execFileSync('osascript', lines.flatMap((l) => ['-e', l]), { stdio: 'inherit' });
  const dest = path.join(pdfDir, 'pp.pdf');
  fs.copyFileSync(outPdf, dest);
  return dest;
}

function main() {
  const a = parseArgs(process.argv.slice(2));
  if (!a.src) {
    console.error('usage: npm run pptx:render -- <deck.pptx> [--engine libreoffice|powerpoint] [--dpi 150] [--out <dir>]');
    process.exit(2);
  }
  const src = path.resolve(a.src);
  if (!fs.existsSync(src)) { console.error(`not found: ${src}`); process.exit(2); }
  const base = path.basename(src).replace(/\.pptx$/i, '');
  const outDir = path.resolve(a.out || path.join('screenshots', 'pptx-render', base));
  const pdfDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pptx-pdf-'));
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) if (f.endsWith('.png')) fs.unlinkSync(path.join(outDir, f));

  console.log(`rendering ${base}.pptx via ${a.engine} @ ${a.dpi}dpi`);
  const pdf = a.engine === 'powerpoint' ? renderPowerPoint(src, pdfDir) : renderLibreOffice(src, pdfDir);
  if (!fs.existsSync(pdf)) {
    console.error('PDF export produced no file. On macOS this usually means the sandbox was ON — run via `npm run pptx:render` (it is excluded from the sandbox).');
    process.exit(1);
  }
  execFileSync('pdftoppm', ['-png', '-r', String(a.dpi), pdf, path.join(outDir, 'slide')], { stdio: 'inherit' });
  const pngs = fs.readdirSync(outDir).filter((f) => f.endsWith('.png')).sort();
  console.log(`\n${pngs.length} slide(s) -> ${outDir}`);
  for (const p of pngs) console.log(path.join(outDir, p));
}

main();
