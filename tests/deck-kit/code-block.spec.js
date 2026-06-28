'use strict';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { startServer } = require('./_helpers');

describe('code-block', () => {
  let server;
  let browser;

  before(async () => {
    server = await startServer();
    browser = await chromium.launch();
  });

  after(async () => {
    if (browser) await browser.close();
    if (server) await server.close();
  });

  async function loadFixture() {
    const page = await browser.newPage();
    await page.goto(server.fixture('code-block.html'));
    await page.waitForFunction(() => !!customElements.get('code-block')
      && document.querySelectorAll('code-block[data-rendered]').length >= 5);
    return page;
  }

  test('renders into <pre><code class="language-X"> and dedents to column 0', async () => {
    const page = await loadFixture();
    const r = await page.evaluate(() => {
      const el = document.getElementById('indented');
      const code = el.querySelector('pre > code');
      return { hasPre: !!el.querySelector('pre'), cls: code.className, text: code.textContent };
    });
    assert.ok(r.hasPre, 'renders a <pre>');
    assert.match(r.cls, /language-java/);
    const lines = r.text.split('\n');
    assert.equal(lines[0], '@Test', 'first line is flush-left (common indent stripped)');
    // Relative indentation is preserved (the nested call keeps its 4-space indent).
    assert.ok(lines.some((l) => l === '      doThing();'.slice(0)) || r.text.includes('    doThing();'),
      `relative indent preserved: ${JSON.stringify(r.text)}`);
    assert.ok(!/^\s/.test(lines[0]), 'no leading blank line / indent on first line');
    await page.close();
  });

  test('applies highlight.js (adds .hljs + token spans)', async () => {
    const page = await loadFixture();
    const r = await page.evaluate(() => {
      const code = document.getElementById('single').querySelector('code');
      return { isHljs: code.classList.contains('hljs'), spans: code.querySelectorAll('span[class^="hljs-"]').length };
    });
    assert.ok(r.isHljs, 'code carries the .hljs class');
    assert.ok(r.spans > 0, 'produced highlight token spans');
    await page.close();
  });

  test('cov-lines wraps every line and flags the covered ones', async () => {
    const page = await loadFixture();
    const r = await page.evaluate(() => {
      const code = document.getElementById('cov').querySelector('code');
      return {
        lines: code.querySelectorAll('.hl-line').length,
        covered: code.querySelectorAll('.hl-line.cov').length,
      };
    });
    assert.equal(r.lines, 3, 'one .hl-line per source line');
    assert.equal(r.covered, 2, 'lines 1 and 3 flagged covered');
    await page.close();
  });

  test('accepts the language via a language-X class', async () => {
    const page = await loadFixture();
    const r = await page.evaluate(() => {
      const code = document.getElementById('viaclass').querySelector('code');
      return { cls: code.className, isHljs: code.classList.contains('hljs') };
    });
    assert.match(r.cls, /language-java/);
    assert.ok(r.isHljs, 'highlighted from class-derived language');
    await page.close();
  });

  test('no language → plain dedented code, not highlighted', async () => {
    const page = await loadFixture();
    const r = await page.evaluate(() => {
      const code = document.getElementById('nolang').querySelector('code');
      return { isHljs: code.classList.contains('hljs'), text: code.textContent };
    });
    assert.ok(!r.isHljs, 'left un-highlighted');
    assert.equal(r.text.split('\n')[0], 'just plain text', 'still dedented');
    await page.close();
  });

  test('is idempotent and clone-safe (cloneNode does not re-transform)', async () => {
    const page = await loadFixture();
    const r = await page.evaluate(() => {
      const el = document.getElementById('indented');
      const before = el.innerHTML;
      // A rail/PDF-export clone: fresh element instance, reconnected to the DOM.
      const clone = el.cloneNode(true);
      document.body.appendChild(clone);
      return {
        rendered: clone.dataset.rendered != null,
        preCount: clone.querySelectorAll('pre').length,
        unchanged: clone.innerHTML === before,
      };
    });
    assert.ok(r.rendered, 'clone keeps the data-rendered guard');
    assert.equal(r.preCount, 1, 'clone is not double-wrapped');
    assert.ok(r.unchanged, 'clone HTML identical to the rendered original');
    await page.close();
  });
});
