'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const target = path.normalize(path.join(REPO_ROOT, urlPath));
      if (!target.startsWith(REPO_ROOT)) {
        res.statusCode = 403;
        res.end('forbidden');
        return;
      }
      fs.stat(target, (err, stat) => {
        if (err || stat.isDirectory()) {
          res.statusCode = 404;
          res.end('not found');
          return;
        }
        res.setHeader('Content-Type', MIME[path.extname(target).toLowerCase()] || 'application/octet-stream');
        fs.createReadStream(target).pipe(res);
      });
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({
        url: `http://127.0.0.1:${port}`,
        fixture: (name) => `http://127.0.0.1:${port}/tests/deck-kit/fixtures/${name}`,
        close: () => new Promise((r) => server.close(() => r())),
      });
    });
  });
}

async function bootDeck(page, url, { storage } = {}) {
  await page.addInitScript(() => {
    window.__slidechangeLog = [];
    window.__deckchangeLog = [];
    // Capture events as early as possible so 'init' fires aren't missed.
    document.addEventListener('slidechange', (e) => {
      const d = e.detail || {};
      window.__slidechangeLog.push({
        index: d.index,
        previousIndex: d.previousIndex,
        total: d.total,
        slideTag: d.slide && d.slide.tagName,
        previousSlideTag: d.previousSlide && d.previousSlide.tagName,
        reason: d.reason,
      });
    });
    document.addEventListener('deckchange', (e) => {
      const d = e.detail || {};
      window.__deckchangeLog.push({
        action: d.action,
        from: d.from,
        to: d.to,
        slideTag: d.slide && d.slide.tagName,
      });
    });
  });
  if (storage) {
    // Seed localStorage before navigation. Need an in-origin page first.
    const u = new URL(url);
    await page.goto(`${u.origin}/tests/deck-kit/fixtures/_blank.html`).catch(() => {});
    await page.evaluate((entries) => {
      for (const [k, v] of entries) localStorage.setItem(k, v);
    }, Object.entries(storage));
  }
  await page.goto(url);
  await page.waitForFunction(() => !!customElements.get('deck-stage') && !!document.querySelector('deck-stage'));
  await page.waitForFunction(() => window.__slidechangeLog && window.__slidechangeLog.some((e) => e.reason === 'init'));
}

module.exports = { startServer, bootDeck, REPO_ROOT };
