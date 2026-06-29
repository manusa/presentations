# Vendored Font Awesome Free

Build-less icon font for deck-kit static decks. These files are committed as-is —
no transpile, bundle, or minify of anything we ship, matching the repo's "No
build step for static decks" posture (`AGENTS.md`). A vendored third-party
library is acceptable here the same way the vendored highlight.js is.

Decks load it with a single relative `<link>`; the `url(../webfonts/…)` rules in
the CSS resolve against it:

```html
<link rel="stylesheet" href="../../deck-kit/vendor/fontawesome/css/all.min.css" />
```

This replaces the per-deck jsDelivr CDN `<link>` the 2026 decks used to carry, so
icons render with no runtime CDN dependency (and offline / behind Cloudflare
Access). Consumers: `2026-devtalks-romania`, `2026-valenciajug`,
`eclipse-jkube-2021-cloud-tool-time`.

## Version & provenance

| | |
|---|---|
| **Library** | Font Awesome Free |
| **Version** | **6.5.2** (exact pin — deps in this repo are never `^`/`~`) |
| **Source** | [`FortAwesome/Font-Awesome`](https://github.com/FortAwesome/Font-Awesome) @ tag `6.5.2` |
| **License** | Icons CC BY 4.0, Fonts SIL OFL 1.1, Code MIT — see `LICENSE.txt` |

Pinned at **6.5.2** deliberately: it is the version the shipped 2026 decks were
authored and delivered against (they loaded `@fortawesome/fontawesome-free@6.5.2`
from jsDelivr), so vendoring that exact version avoids any glyph drift on talks
already given. (The repo's Gatsby stack pins `@fortawesome/fontawesome-free@7.2.0`
in `package.json` for its own `_fonts.scss` import; that is independent of this
vendored copy and is being removed with the Gatsby migration.)

Downloaded from (no CDN at runtime — these are local copies):

```
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/css/all.min.css
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-brands-400.woff2
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-brands-400.ttf
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-regular-400.woff2
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-regular-400.ttf
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-solid-900.woff2
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-solid-900.ttf
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-v4compatibility.woff2
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/webfonts/fa-v4compatibility.ttf
https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.5.2/LICENSE.txt
```

### sha256

```
5ceaaba22d75b58e04150311f596306562a3e595e27ed4b1dfa451b82dda9e50  css/all.min.css
255ce3bdbe420b5f6dbaae6649d7d2480dcd8604f64c1d9e33c5d57db0d9edd1  webfonts/fa-brands-400.woff2
c4c68e0616fd5eb4369df492af0c55ace43a728744e0e9aa1e50c835dc1ca2d2  webfonts/fa-brands-400.ttf
a766b0ec6782888c8a7c3927b9cf25e472953f09dd839bb820354b1591f5c88b  webfonts/fa-regular-400.woff2
c7908ae0c2dc972a2cc0f9404ae4b5fd1dc310d4dc2db6bfc9c5fd5faa8819c6  webfonts/fa-regular-400.ttf
599b18f9b0aa0bd7a76b01e724a7a189422fb20fb233a4586d420c777d3c2c23  webfonts/fa-solid-900.woff2
4312f534f4fc39b771774db6a5a00e22992437d8707a02ce163b4e47e432e65c  webfonts/fa-solid-900.ttf
0bdc986fd216d3f6b7d7e238bb243edf37631f65cef3fc76a226c15eb4910e71  webfonts/fa-v4compatibility.woff2
a519731d4d33c7fdc6a851453545d5038235d0b1b5848f9e1fd95a9ad5ca7275  webfonts/fa-v4compatibility.ttf
9b914eae88817d63b576eab5aafde7068c7a1abae125d7cdfb034f1da43a9afc  LICENSE.txt
```

## Scope (vendored families)

The full unedited `all.min.css` is vendored along with **every** webfont its
`@font-face` rules reference (brands / solid / regular / v4-compatibility, woff2
+ ttf). Keeping the CSS byte-identical to upstream means zero dead/404 references
and any deck can use any FA6-free glyph without re-vendoring. The browser only
fetches a webfont when a glyph from that family is actually rendered, so unused
families cost nothing at runtime.

## Refreshing (deliberate updates only)

```bash
npm run vendor:fontawesome              # re-download the pinned version, write + integrity-check
npm run vendor:fontawesome -- --verify  # check committed files against pinned hashes, no writes/network
```

To bump the version, edit `VERSION` (and the `sha256` pins) in
`scripts/vendor-fontawesome.js`, re-run, eyeball the diff, and commit. Pinning the
hashes means a silently changed upstream fails the run loudly. `npm run
test:fontawesome` additionally asserts every webfont the CSS references is present
and that no deck has re-introduced a CDN `<link>`.
