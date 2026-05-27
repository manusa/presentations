'use strict';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { startServer, bootDeck, REPO_ROOT } = require('./_helpers');

// Template-demo stylesheets carried over from the upstream Claude Design
// bundle that are loaded but no <section> consumes their class. Removal
// tracked in manusa/com.marcnuri.automated-tasks#1817; drop this set when
// the trailing <link> tags are gone.
const DEAD_CSS_ALLOWLIST = new Set([
  'styles/s-agenda.css',
]);

function discoverDecks() {
  const root = path.join(REPO_ROOT, 'static', 'presentations');
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((slug) => fs.existsSync(path.join(root, slug, 'index.html')))
    .sort();
}

describe('deck-marker lint', () => {
  let server;
  let browser;
  const decks = discoverDecks();

  before(async () => {
    server = await startServer();
    browser = await chromium.launch();
  });

  after(async () => {
    if (browser) await browser.close();
    if (server) await server.close();
  });

  test('discovers at least one static deck', () => {
    assert.ok(decks.length > 0, 'no static decks found under static/presentations/');
  });

  for (const slug of decks) {
    describe(slug, () => {
      const url = () => `${server.url}/static/presentations/${slug}/index.html`;

      test('every <section> has a data-label', async () => {
        const page = await browser.newPage();
        await bootDeck(page, url());
        const missing = await page.$$eval('deck-stage > section', (sections) =>
          sections
            .filter((s) => !s.getAttribute('data-label'))
            .map((s) => s.className || s.outerHTML.slice(0, 80))
        );
        assert.deepEqual(missing, [], `sections missing data-label: ${JSON.stringify(missing)}`);
        await page.close();
      });

      test('every <image-slot id> resolves to a src', async () => {
        const page = await browser.newPage();
        await bootDeck(page, url());
        const broken = await page.$$eval('image-slot[id]', (slots) =>
          slots
            .filter((s) => !s.getAttribute('src'))
            .map((s) => s.id)
        );
        assert.deepEqual(broken, [], `image-slot[id] without src: ${JSON.stringify(broken)}`);
        await page.close();
      });

      test('every loaded section stylesheet has a consuming class', async () => {
        const page = await browser.newPage();
        await bootDeck(page, url());
        const dead = await page.evaluate((allow) => {
          const ignore = new Set(allow);
          const links = Array.from(document.querySelectorAll('link[rel=stylesheet]'))
            .map((l) => l.getAttribute('href'))
            .filter((h) => h && /styles\/s-[\w-]+\.css$/.test(h))
            .filter((h) => !ignore.has(h));
          const classes = new Set();
          document.querySelectorAll('deck-stage > section').forEach((s) =>
            s.classList.forEach((c) => classes.add(c))
          );
          return links.filter((href) => {
            const m = href.match(/styles\/(s-[\w-]+)\.css$/);
            return m && !classes.has(m[1]);
          });
        }, Array.from(DEAD_CSS_ALLOWLIST));
        assert.deepEqual(dead, [], `stylesheets loaded but unused: ${JSON.stringify(dead)}`);
        await page.close();
      });
    });
  }
});
