# Vendored highlight.js

Build-less syntax highlighting for deck-kit static decks (issue
[#59](https://github.com/manusa/presentations/issues/59)). These files are
committed as-is — no transpile, bundle, or minify of anything we ship, matching
the repo's "No build step for static decks" posture (`AGENTS.md`). A vendored
third-party library is acceptable here the way the legacy `jquery*.js` was.

## Version & provenance

| | |
|---|---|
| **Library** | highlight.js |
| **Version** | **11.11.1** (exact pin — deps in this repo are never `^`/`~`) |
| **Theme** | `github-dark` |
| **Source** | [`highlightjs/cdn-release`](https://github.com/highlightjs/cdn-release) @ tag `11.11.1`, `build/` |
| **License** | BSD-3-Clause (highlight.js) — see header in `highlight.js` |

Downloaded from (no CDN at runtime — these are local copies):

```
https://raw.githubusercontent.com/highlightjs/cdn-release/11.11.1/build/highlight.js
https://raw.githubusercontent.com/highlightjs/cdn-release/11.11.1/build/languages/dockerfile.min.js
https://raw.githubusercontent.com/highlightjs/cdn-release/11.11.1/build/languages/groovy.min.js
https://raw.githubusercontent.com/highlightjs/cdn-release/11.11.1/build/languages/http.min.js
https://raw.githubusercontent.com/highlightjs/cdn-release/11.11.1/build/languages/properties.min.js
https://raw.githubusercontent.com/highlightjs/cdn-release/11.11.1/build/styles/github-dark.css
https://raw.githubusercontent.com/highlightjs/cdn-release/11.11.1/LICENSE
```

### sha256

```
2d7d6b7330aad8ced0575badbe69f967e8f87d0cab1edba994e9e4669b5b4f42  highlight.js
7b11edef6889d2bf9dd30799ce2212bae9b469cbb1793d4d216b65c274c96079  languages/dockerfile.min.js
24b7c19c049d99d2cfbdb62fbf1fb5d000e9fe23792b3d807671381897580ecb  languages/groovy.min.js
4696d95ea122429bc8021adaa2d81431d1f93e7ec96ef79d76ccc3c9e48739c0  languages/http.min.js
f8cc1a440176673748f145c4346d5e067a2d884fc2e64444229fe8523605507e  languages/properties.min.js
603240e9a7c78cbb006986228155c433b14ac61236805eaa79bfeb96d3c73f75  styles/github-dark.css
5f289f36595e0ef6c53d9f4b4e51d7cc1efc5e2b3ba6130a875d177c54789eaf  LICENSE
```

The full BSD-3-Clause text travels with the copy as `LICENSE` (the engine
`highlight.js` also retains the short license header in its banner comment).

## Languages

The curated corpus for the migration is: `java, bash, yaml, json, xml,
dockerfile, properties, kotlin, groovy, go, javascript, typescript, sql, http,
plaintext`. No auto-detection — only explicitly `class="language-X"` blocks are
highlighted, so output is deterministic.

- **`highlight.js`** is the **non-minified** engine + the ~37 *common* languages
  (the standard prebuilt bundle; full list:
  [`SUPPORTED_LANGUAGES.md`](https://github.com/highlightjs/highlight.js/blob/11.11.1/SUPPORTED_LANGUAGES.md),
  the "common" column). That already covers **java, bash, yaml, json, xml,
  kotlin, go, javascript, typescript, sql, plaintext** from the corpus.
- **`languages/*.min.js`** — `dockerfile, groovy, http, properties` are the four
  corpus languages *not* in the common set. Upstream ships them only as prebuilt
  self-registering `.min.js` (no non-minified prebuilt exists), so they are
  vendored in that form. They are tiny grammar tables (≤ ~1.7 KB each), loaded
  after the engine; each calls `hljs.registerLanguage(...)` on load.

To add a language later, vendor its `build/languages/<lang>.min.js` from the same
tag and add a `<script>` tag after the engine (see the fixture `index.html`).

## Refreshing (deliberate updates only)

```bash
npm run vendor -- highlight            # re-download the pinned version, write + integrity-check
npm run vendor -- highlight --verify   # check committed files against pinned hashes, no writes/network
```

To bump the version, edit the `highlight` entry's `tag` (and the `sha256` pins)
in `scripts/vendor.manifest.js`, re-run, eyeball the diff, and commit. Pinning
the hashes means a silently changed upstream fails the run loudly. `npm run
test:vendor` additionally guards the vendored artifact's posture (manifest-driven,
the same spec that covers Font Awesome and the fonts).

## Scope (rule #4)

Highlighting ships as **per-deck glue**, not a deck-kit core module
(`static/deck-kit/README.md` rule #4). This vendored copy + the inline init in a
deck's `index.html` live with the consuming deck. **Promotion trigger:** once a
*second* code-bearing deck adopts the same snippet, promote the init to a shared
`static/deck-kit/code-highlight.js` and move this `vendor/` under `deck-kit/`.
See `docs/migration/deck-kit-authoring-improvements.md` item 3.
