/**
 * <code-block> — build-less syntax-highlighted code block for deck-kit decks.
 *
 * Authoring convenience over the raw `<pre><code class="language-X">` contract
 * (issue #59): you write the snippet **indented to match the surrounding HTML**,
 * and the element strips the common leading indentation (and leading/trailing
 * blank lines) before rendering — so the source file stays readable and the
 * rendered code still starts at column 0. It then runs highlight.js over the
 * block and, optionally, paints a per-line coverage stripe.
 *
 * It renders into light DOM as `<pre><code class="language-X">…</code></pre>`, so
 * the deck's own `pre code` card styling and the vendored highlight theme apply
 * unchanged. The element is a plain block; decks style the card and the coverage
 * colour (`.hl-line.cov`) themselves.
 *
 * Requires the highlight.js engine to be loaded BEFORE this script (both via
 * `defer`, in order). With no engine it renders plain (dedented) code + warns.
 *
 * Attributes:
 *   language     Grammar id (e.g. "java"). Falls back to a `language-X` class on
 *                the element. No language / unregistered grammar → no highlight.
 *   cov-lines    Comma-separated 1-based line numbers to flag as "covered". Each
 *                source line is wrapped in `<span class="hl-line">`; covered ones
 *                also get `.cov`. Dedent preserves the line count, so the numbers
 *                line up with the authored source.
 *
 * Step reveals (`data-reveal` / `-only` / `-until`) go on the element like any
 * other deck-stage descendant; deck-stage drives them.
 *
 * Usage:
 *   <script src="../../deck-kit/vendor/highlight/highlight.js" defer></script>
 *   <script src="../../deck-kit/code-block.js" defer></script>
 *   <script src="../../deck-kit/deck-stage.js" defer></script>
 *   …
 *   <code-block language="java" data-reveal="1">
 *     @Test
 *     void worksWithNaturalIndentation() { … }
 *   </code-block>
 */
(() => {
  if (customElements.get('code-block')) return;

  // Base layout: the element is a block (so it fills a grid/flex cell and a
  // translateX reveal behaves), and coverage lines stack. Injected once; decks
  // override freely. Card styling (border/padding/background) stays per-deck.
  const base = document.createElement('style');
  base.textContent = 'code-block{display:block}code-block .hl-line{display:block}';
  (document.head || document.documentElement).appendChild(base);

  // Strip the common leading indent + leading/trailing blank lines. Blank lines
  // in the middle are kept, so the line count (and thus cov-lines) is preserved.
  const dedent = (text) => {
    const lines = text.replace(/\t/g, '    ').split('\n');
    while (lines.length && lines[0].trim() === '') lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
    const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return lines.map((l) => l.slice(min)).join('\n');
  };

  // highlight.js groups multi-line constructs (Java annotations, parameter lists)
  // into single token spans that contain newlines, so the highlighted HTML cannot
  // be split on '\n' directly. linesOf walks the DOM and re-opens each straddling
  // token span on every line it crosses, so every per-line wrapper stays balanced.
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const linesOf = (node) => {
    const lines = [''];
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.data.split('\n').forEach((part, i) => {
          if (i > 0) lines.push('');
          lines[lines.length - 1] += esc(part);
        });
      } else {
        const open = `<span class="${child.className}">`;
        linesOf(child).forEach((html, i) => {
          if (i > 0) lines.push('');
          lines[lines.length - 1] += open + html + '</span>';
        });
      }
    });
    return lines;
  };

  class CodeBlock extends HTMLElement {
    connectedCallback() {
      // Idempotent and clone-safe: the rendered markup carries data-rendered,
      // which cloneNode copies — so deck-stage's rail / PDF-export clones (a fresh
      // element instance whose JS state is reset) skip the transform and keep the
      // already-rendered, already-highlighted HTML.
      if (this.dataset.rendered != null) return;

      const lang = this.getAttribute('language')
        || (this.className.match(/(?:^|\s)language-([\w-]+)/) || [])[1]
        || '';
      const cov = this.getAttribute('cov-lines');

      const pre = document.createElement('pre');
      const codeEl = document.createElement('code');
      if (lang) codeEl.className = 'language-' + lang;
      codeEl.textContent = dedent(this.textContent);
      pre.appendChild(codeEl);
      this.replaceChildren(pre);

      if (window.hljs && lang && hljs.getLanguage(lang)) {
        hljs.highlightElement(codeEl);
      } else if (!window.hljs) {
        console.warn('<code-block>: highlight.js not loaded — rendering plain code');
      }

      if (cov != null) {
        const covered = new Set(cov.split(',').map((n) => parseInt(n, 10)));
        codeEl.innerHTML = linesOf(codeEl)
          .map((html, i) => `<span class="hl-line${covered.has(i + 1) ? ' cov' : ''}">${html || ' '}</span>`)
          .join('');
      }

      this.dataset.rendered = '';
    }
  }

  customElements.define('code-block', CodeBlock);
})();
