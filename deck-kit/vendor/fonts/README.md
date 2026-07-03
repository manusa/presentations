# Vendored Web Fonts (self-hosted Google Fonts)

Build-less, self-hosted web fonts for deck-kit static decks. These woff2 files
and their `@font-face` CSS are committed as-is — no transpile, bundle, or minify
of anything we ship, matching the repo's "No build step for static decks"
posture (`AGENTS.md`). A vendored third-party library is acceptable here the
same way the vendored Font Awesome and highlight.js are.

They replace the per-deck Google Fonts `<link>` + the two `preconnect`s, so
text renders with **no runtime CDN dependency** (offline, and behind Cloudflare
Access). `fonts.gstatic.com` is not reachable from CI's sandbox, so the woff2 are
acquired from the `@fontsource` npm tarballs on `registry.npmjs.org` instead —
the same upstream font binaries Google serves.

## How a deck loads them

Each family is one stylesheet; a deck links only the families it uses (the
legacy Oswald/Montserrat/Roboto decks and the 2026 Inter/JetBrains·Mono/Caveat
decks use disjoint sets, so nothing ships an unused face):

```html
<link rel="stylesheet" href="../../deck-kit/vendor/fonts/inter/inter.css" />
<link rel="stylesheet" href="../../deck-kit/vendor/fonts/jetbrains-mono/jetbrains-mono.css" />
<link rel="stylesheet" href="../../deck-kit/vendor/fonts/caveat/caveat.css" />
```

The `<family>.css` carries one `@font-face` per (weight × subset) with
`font-display: swap` and the subset's `unicode-range`, and `src: url(./files/…woff2)`
resolving against `vendor/fonts/<family>/files/`.

## Layout

```
vendor/fonts/<family>/
  <family>.css        normalized @font-face CSS (woff2-only), generated
  LICENSE             the family's SIL OFL 1.1
  files/<id>-<subset>-<weight>-normal.woff2
```

## Version & provenance

| Family | `@fontsource` package | Version | Weights vendored | License |
|---|---|---|---|---|
| Inter | `@fontsource/inter` | **5.2.8** | 300, 400, 500, 600, 700, 800, 900 | SIL OFL 1.1 |
| JetBrains Mono | `@fontsource/jetbrains-mono` | **5.2.8** | 300, 400, 500, 600, 700 | SIL OFL 1.1 |
| Caveat | `@fontsource/caveat` | **5.2.8** | 500, 600, 700 | SIL OFL 1.1 |
| Oswald | `@fontsource/oswald` | **5.2.8** | **400 only** | SIL OFL 1.1 |
| Montserrat | `@fontsource/montserrat` | **5.2.8** | **400 only** | SIL OFL 1.1 |
| Roboto | `@fontsource/roboto` | **5.2.10** | **400 only** | SIL OFL 1.1 |
| Red Hat Display | `@fontsource/red-hat-display` | **5.2.8** | 400, 500, 700, 900 | SIL OFL 1.1 |
| Red Hat Text | `@fontsource/red-hat-text` | **5.2.8** | 400, 500, 700 | SIL OFL 1.1 |

Versions are exact pins (deps in this repo are never `^`/`~`). Each family's
license travels with it as `LICENSE`.

> **Faithful weights (playbook gotcha).** The legacy Oswald/Montserrat/Roboto
> decks (`isotope-introduction`, `eclipse-jkube-2021-cloud-tool-time`,
> `mock-mvc-in-action`) load **weight 400 only** on purpose: their cover
> `<h1>`/`<h2>` request bold and get the browser's *faux-bold of the 400 face*.
> Vendoring a real 700 would make those headings heavier than the original, so
> only 400 is vendored for them. The 2026 decks request specific weight ranges;
> exactly those are vendored, no more.

### Subsets

`latin` **and** `latin-ext`, per face. This preserves what Google served (it
emitted both via `unicode-range`, fetched on demand), so any accented term —
`kölsch`, `Östia`, future Czech/Polish/etc. names across the decks still being
ported — renders from a vendored file rather than a system-font fallback. Every
other Google subset (cyrillic, greek, vietnamese…) is dropped. The two ranges
overlap on the combining marks U+0304/0308/0329, where the last matching
`@font-face` wins; the generated CSS keeps `@fontsource`'s order (latin last) so
glyph selection matches Google exactly.

### Size budget

**woff2 only** (no ttf — woff2 covers every target browser, and we control the
`@font-face` CSS). 50 woff2 across the eight families (each weight × {latin,
latin-ext}) + 8 generated CSS files, ≈ **1.15 MB** committed total:

| Family | woff2 | size |
|---|---|---|
| Inter (7 wght × 2) | 14 | ~436 KB |
| Caveat (3 × 2) | 6 | ~228 KB |
| JetBrains Mono (5 × 2) | 10 | ~176 KB |
| Montserrat (1 × 2) | 2 | ~64 KB |
| Roboto (1 × 2) | 2 | ~52 KB |
| Oswald (1 × 2) | 2 | ~36 KB |
| Red Hat Display (4 × 2) | 8 | ~84 KB |
| Red Hat Text (3 × 2) | 6 | ~63 KB |

### sha256

Every committed file's sha256 is pinned in
[`scripts/vendor.manifest.js`](../../../../scripts/vendor.manifest.js) — the
integrity anchor `npm run vendor -- --verify` checks offline. The eight generated
CSS files:

```
a9eaca8c5c75e8904fc3e70d3ff8c1d53afb3d6ab870c5c28f9d9df36f487588  inter/inter.css
408d44ce6e9aeebd6855f11c0a05555cdc8ff6fdcd31e292ea46d3631438a0e2  jetbrains-mono/jetbrains-mono.css
33ff5ef8d69181ab09c0e705d230aeea314886a71f098784ce361589938d9680  caveat/caveat.css
db3da0e8659df666bf20fcfcdd0c96b214d76d70bf666514f15c131c07f48fab  oswald/oswald.css
9150a545a7517f7c0766904388b1bdb9804b44b4e0154dda6e9c751efe96c4db  montserrat/montserrat.css
c4d10f464c1ddfac39a4cf087dd5933ab12f004092439591df243371be7b483e  roboto/roboto.css
c26f8f4b93572cbcff218dba2b949cafd0e17fb7336ea9c70ddf747bb5457307  red-hat-display/red-hat-display.css
0423e15ec72c9f8bddecb563d5d291a45c4f5b6e23931436906d49f541c371e3  red-hat-text/red-hat-text.css
```

## How the CSS is generated

We do **not** ship `@fontsource`'s CSS verbatim (its `index.css` pulls every
weight and every subset). `scripts/lib/fontsource-css.js` reads the package's
own per-weight CSS from the tarball, keeps only the latin / latin-ext
`@font-face` blocks for the requested weights — reusing upstream's exact
`font-family` / `font-weight` / `font-display` / `unicode-range` — and drops the
`.woff` fallback (woff2-only). The result is deterministic, so its sha256 is a
stable pin like any other vendored file.

## Refreshing (deliberate updates only)

```bash
npm run vendor -- <family>            # e.g. inter — re-download + write + integrity-check
npm run vendor                        # re-vendor every library (FA, highlight, all fonts)
npm run vendor -- --verify            # check committed files against pinned hashes, no network
```

To bump a family, edit its `version` (and re-record the printed `sha256` pins)
in `scripts/vendor.manifest.js`, re-run, eyeball the diff (a `snapshot:diff` on
each consuming deck catches a rendering change), and commit. `npm run
test:vendor` additionally asserts every `@font-face url()` resolves on disk and
that no deck has re-introduced the Google Fonts CDN.
