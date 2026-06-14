#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * generate-landing.js — emit static/index.html, the Cloudflare-Pages
 * landing that lists every static deck.
 *
 * Why this exists:
 *   Cloudflare Pages comments on PRs with the deployment's root URL
 *   (e.g. https://<commit>.<project>.pages.dev/). Without an index at
 *   the root, the link lands on a directory listing that's not useful
 *   to a reviewer. This script generates a real index that lists every
 *   deck under static/presentations/ with title + subtitle.
 *
 * Why a generator (vs the live serve-static-middleware):
 *   The middleware renders the index at request time during local dev,
 *   reading the directory dynamically. Cloudflare Pages serves static/
 *   verbatim — no server-side JS — so the index must exist as a real
 *   file in the repo. Running this script before commit is the manual
 *   step that produces that file. The middleware still steps aside
 *   when static/index.html exists (see its line 126), so it remains a
 *   useful fallback for sessions where the file is missing or stale.
 *
 * Run it:
 *   npm run gen:landing
 *
 * Idempotent: writes only when the rendered output differs from the
 * current file, so re-runs don't pollute `git status` with mtime diffs.
 *
 * Metadata source per deck (most specific wins):
 *   1. <deck>/meta.json with { title, subtitle? }
 *   2. <deck>/README.md first-level H1   (matches the middleware)
 *   3. the deck slug                     (last-resort fallback)
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const STATIC_ROOT = path.join(REPO_ROOT, 'static');
const PRESENTATIONS_ROOT = path.join(STATIC_ROOT, 'presentations');
const OUT_PATH = path.join(STATIC_ROOT, 'index.html');

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

function readMeta(slug) {
  const metaPath = path.join(PRESENTATIONS_ROOT, slug, 'meta.json');
  try {
    const json = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    if (json && typeof json.title === 'string') {
      return {
        title: json.title.trim(),
        subtitle: typeof json.subtitle === 'string' ? json.subtitle.trim() : null,
        date: typeof json.date === 'string' ? json.date.trim() : null
      };
    }
  } catch {}
  return null;
}

function readReadmeH1(slug) {
  const readmePath = path.join(PRESENTATIONS_ROOT, slug, 'README.md');
  try {
    const md = fs.readFileSync(readmePath, 'utf8');
    const m = md.match(/^#\s+(.+?)\s*$/m);
    if (m) return { title: m[1].trim(), subtitle: null };
  } catch {}
  return null;
}

function describeDeck(slug) {
  return readMeta(slug)
      || readReadmeH1(slug)
      || { title: slug, subtitle: null };
}

function listDecks() {
  if (!fs.existsSync(PRESENTATIONS_ROOT)) return [];
  return fs.readdirSync(PRESENTATIONS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => ({ slug: e.name, date: readMeta(e.name)?.date || '' }))
    // Newest first: sort by meta.json `date` (ISO yyyy-mm-dd) descending. Decks
    // without a date fall to the end, then slug-ordered for a stable tiebreak.
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .map((d) => d.slug);
}

function renderItem(slug) {
  const { title, subtitle } = describeDeck(slug);
  const slugSafe = escapeHtml(slug);
  const titleSafe = escapeHtml(title);
  const subtitleHtml = subtitle
    ? `\n          <span class="subtitle">${escapeHtml(subtitle)}</span>`
    : '';
  return `    <li>
      <a href="/presentations/${slugSafe}/">
        <span class="slug">${slugSafe}</span>
        <span class="title">
          ${titleSafe}${subtitleHtml}
        </span>
      </a>
    </li>`;
}

function renderEmpty() {
  return `    <li class="empty">No decks under <code>static/presentations/</code> yet.</li>`;
}

function render(decks) {
  const items = decks.length
    ? decks.map(renderItem).join('\n')
    : renderEmpty();

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Marc Nuri — Presentations (preview)</title>
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
<style>
  :root {
    --bg: #F4F1E8;
    --bg-card: #FFFFFF;
    --fg: #0A1554;
    --fg-dim: #4B548A;
    --fg-mute: #6F7AA4;
    --accent: #B81742;
    --line: rgba(10, 21, 84, 0.10);
    --line-strong: rgba(10, 21, 84, 0.22);
    --grid: rgba(10, 21, 84, 0.06);
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--fg);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle, var(--grid) 1.2px, transparent 1.4px);
    background-size: 44px 44px;
    pointer-events: none;
    z-index: 0;
  }
  main { position: relative; z-index: 1; max-width: 720px; margin: 96px auto; padding: 0 32px; }
  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.18em;
    text-transform: lowercase;
    color: var(--accent);
    margin-bottom: 12px;
  }
  h1 { margin: 0 0 16px; font-size: 40px; font-weight: 700; letter-spacing: -0.02em; }
  .note { color: var(--fg-dim); font-size: 16px; margin: 0 0 56px; }
  .note a { color: var(--accent); text-decoration: none; border-bottom: 1px solid currentColor; }
  .note a:hover { color: var(--fg); border-bottom-color: var(--fg); }
  ul { list-style: none; padding: 0; margin: 0; }
  li { background: var(--bg-card); border: 1px solid var(--line); border-radius: 10px; margin-bottom: 12px; transition: border-color 200ms ease, transform 200ms ease; }
  li:hover { border-color: var(--line-strong); transform: translateX(2px); }
  li.empty { padding: 20px 24px; color: var(--fg-mute); font-style: italic; }
  li.empty code { font-family: 'JetBrains Mono', monospace; font-size: 13px; background: var(--line); padding: 1px 6px; border-radius: 4px; color: var(--fg-dim); font-style: normal; }
  li a { display: block; padding: 20px 24px; color: var(--fg); text-decoration: none; }
  .slug { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--fg-mute); display: block; margin-bottom: 6px; }
  .title { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
  .subtitle { display: block; margin-top: 4px; font-size: 14px; font-weight: 400; color: var(--fg-dim); }
  footer {
    margin-top: 96px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--fg-mute);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }
  footer .left { color: var(--fg-dim); }
  footer .right code { color: var(--accent); }
</style>
</head>
<body>
<main>
  <div class="eyebrow">// preview environment</div>
  <h1>Marc Nuri — Presentations</h1>
  <p class="note">
    Drafts and PR previews live here. Production decks are published at
    <a href="https://presentations.marcnuri.com">presentations.marcnuri.com</a>.
  </p>

  <ul>
${items}
  </ul>

  <footer>
    <span class="left">cloudflare pages · access-gated</span>
    <span class="right">generated by <code>npm run gen:landing</code></span>
  </footer>
</main>
</body>
</html>
`;
}

function main() {
  const decks = listDecks();
  const newContent = render(decks);
  const existing = fs.existsSync(OUT_PATH) ? fs.readFileSync(OUT_PATH, 'utf8') : null;

  if (newContent === existing) {
    console.log(`= ${path.relative(REPO_ROOT, OUT_PATH)} is up to date (${decks.length} deck${decks.length === 1 ? '' : 's'})`);
    return;
  }

  fs.writeFileSync(OUT_PATH, newContent);
  console.log(`✓ wrote ${path.relative(REPO_ROOT, OUT_PATH)} (${decks.length} deck${decks.length === 1 ? '' : 's'})`);
  for (const slug of decks) {
    const { title } = describeDeck(slug);
    console.log(`    ${slug}  →  ${title}`);
  }
}

main();
