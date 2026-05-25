/* eslint-disable no-console */
/*
 * serve-static-middleware.js — live-server middleware that renders a dev-only
 * index at `/`, listing every deck under `static/presentations/`.
 *
 * Why this exists:
 *   live-server serves `static/` at the random port chosen by serve-static.js.
 *   Without an index, `/` is a useless directory listing of root assets (CNAME,
 *   jquery, …) and the user has to remember deck slugs. This middleware
 *   intercepts `/` and `/index.html` and synthesizes a clickable list.
 *
 * Why a middleware (vs a committed `static/index.html`):
 *   - Always fresh: scans the directory at request time, so new decks appear
 *     on refresh without restarting the server.
 *   - No build collision: nothing is written to `static/`, so `gatsby build`
 *     can't see this file and won't conflict with the Gatsby landing page
 *     generated from `src/pages/index.jsx`.
 *   - No cleanup state: there is no sidecar file to leak if the server is
 *     killed hard.
 *
 * If a real `static/index.html` ever exists, this middleware steps aside.
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const STATIC_ROOT = path.join(REPO_ROOT, 'static');
const PRESENTATIONS_ROOT = path.join(STATIC_ROOT, 'presentations');
const LIVE_RELOAD_PATH = path.join(
  REPO_ROOT, 'node_modules', 'live-server', 'injected.html'
);

let liveReloadScript = '';
try {
  liveReloadScript = fs.readFileSync(LIVE_RELOAD_PATH, 'utf8');
} catch {
  // live-server not installed in the expected location — index still works,
  // it just won't auto-reload itself when decks are added.
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

function deckLabel(slug) {
  try {
    const md = fs.readFileSync(
      path.join(PRESENTATIONS_ROOT, slug, 'README.md'), 'utf8'
    );
    const m = md.match(/^#\s+(.+?)\s*$/m);
    if (m) return m[1].trim();
  } catch {}
  return slug;
}

function listDecks() {
  try {
    return fs.readdirSync(PRESENTATIONS_ROOT, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

function renderIndex() {
  const decks = listDecks().map((slug) => ({ slug, label: deckLabel(slug) }));
  const rows = decks.length
    ? decks.map(({ slug, label }) => {
        const labelHtml = escapeHtml(label);
        const slugHtml = escapeHtml(slug);
        const sub = label === slug
          ? ''
          : `\n        <span class="slug">${slugHtml}</span>`;
        return `      <li><a href="/presentations/${slugHtml}/">\n        <span class="label">${labelHtml}</span>${sub}\n      </a></li>`;
      }).join('\n')
    : '      <li class="empty">No decks under <code>static/presentations/</code> yet.</li>';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Static decks — dev index</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 760px; margin: 4rem auto; padding: 0 1.25rem; line-height: 1.5; color: #1d1d1f; background: #fafafa; }
  h1 { font-size: 1.4rem; margin: 0 0 0.25rem; }
  p.note { color: #6e6e73; margin: 0 0 2rem; font-size: 0.875rem; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { margin: 0 0 0.5rem; }
  li a { display: block; padding: 0.9rem 1rem; border: 1px solid #e5e5ea; border-radius: 10px; background: #fff; text-decoration: none; color: inherit; transition: border-color 0.15s, background 0.15s; }
  li a:hover { border-color: #007aff; background: #f0f7ff; }
  .label { display: block; font-weight: 600; color: #1d1d1f; }
  .slug { display: block; margin-top: 0.2rem; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.8rem; color: #8e8e93; }
  .empty { padding: 1rem; color: #8e8e93; font-style: italic; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #f0f0f5; padding: 0.1rem 0.35rem; border-radius: 4px; font-size: 0.85em; }
  @media (prefers-color-scheme: dark) {
    body { background: #1c1c1e; color: #f2f2f7; }
    p.note { color: #98989d; }
    li a { background: #2c2c2e; border-color: #3a3a3c; }
    li a:hover { background: #1f2a3a; border-color: #0a84ff; }
    .label { color: #f2f2f7; }
    .slug { color: #8e8e93; }
    code { background: #2c2c2e; }
  }
</style>
</head>
<body>
  <h1>Static decks</h1>
  <p class="note">Local dev index from <code>npm run serve:static</code>. Scans <code>static/presentations/</code> at request time.</p>
  <ul>
${rows}
  </ul>
${liveReloadScript}
</body>
</html>`;
}

module.exports = function devIndex(req, res, next) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  const pathname = (req.url || '/').split('?')[0];
  if (pathname !== '/' && pathname !== '/index.html') return next();
  if (fs.existsSync(path.join(STATIC_ROOT, 'index.html'))) return next();

  const html = renderIndex();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'HEAD') return res.end();
  res.end(html);
};
