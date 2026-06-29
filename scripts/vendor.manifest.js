'use strict';

/**
 * Declarative manifest of every vendored third-party library (issue #68). One
 * entry per library; `npm run vendor` (scripts/vendor.js) and the
 * tests/vendor/ spec both loop over this list, so adding a library — or a new
 * font — is a data change here, not a new script + spec + CI block.
 *
 * Entry shape:
 *   name     — CLI selector + log label (`npm run vendor -- <name>`).
 *   source   — acquisition mode (see scripts/lib/vendor.js → makeSource):
 *                { type: 'github-raw', repo, tag }
 *                { type: 'npm-tarball', pkg, version }
 *   dest     — committed output dir, relative to the repo root.
 *   files    — [{ path, sha256, dest?, bytes? }]. `path` is the logical source
 *              path; `dest` (default `path`) is where it lands under `dest`.
 *              `bytes(source)` overrides the source fetch for a generated file
 *              (used by the normalized font CSS). `sha256` is the integrity
 *              anchor — empty means "print the computed hash, fail --verify".
 *   license  — a path under `dest` the spec presence-checks.
 *   cssEntry — (optional) a vendored CSS whose url()s the spec resolves on disk
 *              and asserts carry no absolute http(s) URL.
 *   cdnLeak  — (optional) a regex no deck index.html / CSS may match, so a
 *              re-introduced runtime CDN reference fails the spec.
 *
 * Pinned versions follow the repo rule: exact, never ^/~ (see the per-library
 * provenance README under each `dest`).
 */

const { buildFontCss, fontFiles } = require('./lib/fontsource-css');

module.exports = [
  {
    name: 'fontawesome',
    source: { type: 'github-raw', repo: 'FortAwesome/Font-Awesome', tag: '6.5.2' },
    dest: 'static/deck-kit/vendor/fontawesome',
    files: [
      { path: 'css/all.min.css', sha256: '5ceaaba22d75b58e04150311f596306562a3e595e27ed4b1dfa451b82dda9e50' },
      { path: 'webfonts/fa-brands-400.woff2', sha256: '255ce3bdbe420b5f6dbaae6649d7d2480dcd8604f64c1d9e33c5d57db0d9edd1' },
      { path: 'webfonts/fa-brands-400.ttf', sha256: 'c4c68e0616fd5eb4369df492af0c55ace43a728744e0e9aa1e50c835dc1ca2d2' },
      { path: 'webfonts/fa-regular-400.woff2', sha256: 'a766b0ec6782888c8a7c3927b9cf25e472953f09dd839bb820354b1591f5c88b' },
      { path: 'webfonts/fa-regular-400.ttf', sha256: 'c7908ae0c2dc972a2cc0f9404ae4b5fd1dc310d4dc2db6bfc9c5fd5faa8819c6' },
      { path: 'webfonts/fa-solid-900.woff2', sha256: '599b18f9b0aa0bd7a76b01e724a7a189422fb20fb233a4586d420c777d3c2c23' },
      { path: 'webfonts/fa-solid-900.ttf', sha256: '4312f534f4fc39b771774db6a5a00e22992437d8707a02ce163b4e47e432e65c' },
      { path: 'webfonts/fa-v4compatibility.woff2', sha256: '0bdc986fd216d3f6b7d7e238bb243edf37631f65cef3fc76a226c15eb4910e71' },
      { path: 'webfonts/fa-v4compatibility.ttf', sha256: 'a519731d4d33c7fdc6a851453545d5038235d0b1b5848f9e1fd95a9ad5ca7275' },
      { path: 'LICENSE.txt', sha256: '9b914eae88817d63b576eab5aafde7068c7a1abae125d7cdfb034f1da43a9afc' },
    ],
    license: 'LICENSE.txt',
    cssEntry: 'css/all.min.css',
    // No deck may load Font Awesome over a remote URL (host-agnostic: matches
    // both `fontawesome` and `font-awesome` spellings).
    cdnLeak: /https?:\/\/[^"'()\s]*font-?awesome/i,
  },

  {
    name: 'highlight',
    source: { type: 'github-raw', repo: 'highlightjs/cdn-release', tag: '11.11.1' },
    dest: 'static/deck-kit/vendor/highlight',
    files: [
      { path: 'build/highlight.js', dest: 'highlight.js', sha256: '2d7d6b7330aad8ced0575badbe69f967e8f87d0cab1edba994e9e4669b5b4f42' },
      { path: 'build/languages/dockerfile.min.js', dest: 'languages/dockerfile.min.js', sha256: '7b11edef6889d2bf9dd30799ce2212bae9b469cbb1793d4d216b65c274c96079' },
      { path: 'build/languages/groovy.min.js', dest: 'languages/groovy.min.js', sha256: '24b7c19c049d99d2cfbdb62fbf1fb5d000e9fe23792b3d807671381897580ecb' },
      { path: 'build/languages/http.min.js', dest: 'languages/http.min.js', sha256: '4696d95ea122429bc8021adaa2d81431d1f93e7ec96ef79d76ccc3c9e48739c0' },
      { path: 'build/languages/properties.min.js', dest: 'languages/properties.min.js', sha256: 'f8cc1a440176673748f145c4346d5e067a2d884fc2e64444229fe8523605507e' },
      { path: 'build/styles/github-dark.css', dest: 'styles/github-dark.css', sha256: '603240e9a7c78cbb006986228155c433b14ac61236805eaa79bfeb96d3c73f75' },
      { path: 'LICENSE', sha256: '5f289f36595e0ef6c53d9f4b4e51d7cc1efc5e2b3ba6130a875d177c54789eaf' },
    ],
    license: 'LICENSE',
    // No vendored CSS the decks <link> (the theme is applied via the engine), so
    // no cssEntry. Still forbid a re-introduced highlight.js CDN asset, scoped
    // to the known delivery CDNs so a deck linking the project homepage/repo in
    // prose can't false-positive.
    cdnLeak: /https?:\/\/(?:cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com)\/[^"'()\s]*(?:highlight|hljs)/i,
  },

  // --- Google Fonts, self-hosted via @fontsource (issue #68 Part B) ----------
  // Each family is one npm-tarball entry: its per-(weight × subset) woff2 plus a
  // generated <name>.css that filters @fontsource's own per-weight CSS down to
  // the latin + latin-ext faces (woff2-only). Legacy Oswald/Montserrat/Roboto
  // decks load weight 400 ONLY on purpose — their bold headings are the
  // browser's faux-bold of 400; vendoring a real 700 would change that.
  ...fontEntry({
    name: 'inter', pkg: '@fontsource/inter', version: '5.2.8', family: 'Inter',
    weights: [300, 400, 500, 600, 700, 800, 900],
    sha: {
      'files/inter-latin-300-normal.woff2': 'be0276550393a72b94d673505567dceba801511d5e1ca5a87793190dc5d5a6ca',
      'files/inter-latin-400-normal.woff2': '8909904ab6c872eb994093482a88a28eca2cd95912d7b6fecd72103b0dc07edc',
      'files/inter-latin-500-normal.woff2': 'f3779f1efccc4bdcdf9c0a02ab95bf6bd092ed09c48c08cedc725889edd1d19f',
      'files/inter-latin-600-normal.woff2': 'f9a06e79cd3a2a20951c0f0e28f66dd0e6d3fda73911d640a2125c8fcb78f21a',
      'files/inter-latin-700-normal.woff2': '6f56409fd3d64bb85f7d070bce20749db2d66b6d63cec586cc22d1c761be2491',
      'files/inter-latin-800-normal.woff2': 'a7d0a50f15d389cad679238466bdb5fc9787aa0715719064ce25abaff042820d',
      'files/inter-latin-900-normal.woff2': 'd5c0ed7b8b5dde97d48b97947d740bbd8ad3ba9f2c5cc6b8280f16acba2d828e',
      'files/inter-latin-ext-300-normal.woff2': 'b11def546ac052fad7993e39c53801b55af99b0fd51a9ac0e72884b5c3fcaa3f',
      'files/inter-latin-ext-400-normal.woff2': '6744a7f509ebc6ab220a6cd4ea77e898adf014f03d88dcda5d45d8a9feefb4e9',
      'files/inter-latin-ext-500-normal.woff2': '2c6fbc42d315528beb06c1096df45487bf4186c4b78b8111d12c9c951f8acca2',
      'files/inter-latin-ext-600-normal.woff2': 'e4bdf67b0cd15ca9e184509275be95db942195d3cc2b17f6a0452f2adf75d0bf',
      'files/inter-latin-ext-700-normal.woff2': '143f9504f1377012aa3e39c90c4354ef429cb0494b9ac0e1437f1a81e5412236',
      'files/inter-latin-ext-800-normal.woff2': 'eade55593308b9e4916dd7f47826929ce3e40cad85a2b338d56e5fd1e7bf8e5e',
      'files/inter-latin-ext-900-normal.woff2': 'de536299a1eeca46fe494787380486ec890627e0d50e1be18ef6001cbd1e5105',
      'inter.css': 'a9eaca8c5c75e8904fc3e70d3ff8c1d53afb3d6ab870c5c28f9d9df36f487588',
      'LICENSE': '3b0a5fca3d17942cde889069889dedbbbd075e9b599968c82a95f4d944e9b345',
    },
  }),
  ...fontEntry({
    name: 'jetbrains-mono', pkg: '@fontsource/jetbrains-mono', version: '5.2.8', family: 'JetBrains Mono',
    weights: [300, 400, 500, 600, 700],
    sha: {
      'files/jetbrains-mono-latin-300-normal.woff2': '722972afda59a9739c5837279d0cc636d179240b3ec9d052b8ef147681874e61',
      'files/jetbrains-mono-latin-400-normal.woff2': '14425ba9c695763c1547f48a206b7aa60350a33ae23de09f0407877f3fcd89eb',
      'files/jetbrains-mono-latin-500-normal.woff2': 'cb182feeed4d798ff6961d3c79f7026279448fca0676438aaecb21f3fc39553a',
      'files/jetbrains-mono-latin-600-normal.woff2': '400c6bfda18d5d14acad1c15d6dcb9f8e13c015e7286317e0b9a482539bef147',
      'files/jetbrains-mono-latin-700-normal.woff2': 'd0d4e818808f2a0ba39b2b09d1989366f63494e295f003c7ef436697378507e8',
      'files/jetbrains-mono-latin-ext-300-normal.woff2': '6eef50c7dd2b114b6486562e8fc2bc9bdefca629ccc42dfce337a943c72dfd8e',
      'files/jetbrains-mono-latin-ext-400-normal.woff2': '505dfba8ecbe77e82765f36d317ed7ef4ac42719dc5f4ae68d1c483fd22d0d14',
      'files/jetbrains-mono-latin-ext-500-normal.woff2': '879df9319f1cbf633bee1dd489e376a9e1e8c458f4abddcfe381cb83b5e6b027',
      'files/jetbrains-mono-latin-ext-600-normal.woff2': '90899aac1c15552c028fd205376bb537a2a5205164fe8626efabad77d7260c20',
      'files/jetbrains-mono-latin-ext-700-normal.woff2': '45a606d88f72bc0afae4d1a6988e3dba3a5e77ee51aa3b550e37c31c728f4d2d',
      'jetbrains-mono.css': '408d44ce6e9aeebd6855f11c0a05555cdc8ff6fdcd31e292ea46d3631438a0e2',
      'LICENSE': '403581b69dac5cff4079205e01c6b467e56af449ecbd7247693ddb1baafa005b',
    },
  }),
  ...fontEntry({
    name: 'caveat', pkg: '@fontsource/caveat', version: '5.2.8', family: 'Caveat',
    weights: [500, 600, 700],
    sha: {
      'files/caveat-latin-500-normal.woff2': 'edbfb1a768829d4e85127cd327e59faaec9701cb043e96430938f1f66acf009f',
      'files/caveat-latin-600-normal.woff2': 'd51e2283010e661d9f3dafdc9ff4b82b2ebcb2f7aa43ca48a105f5f68d46cc32',
      'files/caveat-latin-700-normal.woff2': '15f9638095ad5ec9816f93d66805ca1a87e71dc5a76b596bfce1c78d4704c405',
      'files/caveat-latin-ext-500-normal.woff2': 'ca0bf8aa25f03ca55b29a109e21fa49bfe8ad37a8e86425b0be225acfc956cff',
      'files/caveat-latin-ext-600-normal.woff2': 'ec90c36c3dfe05fca71ab42c5e8d6fcaf21b1363d4b008de3fa0b0d39d7ed34f',
      'files/caveat-latin-ext-700-normal.woff2': 'f97b55783e417e37fce40600ad946b11eb63741a1cfdb2cd3907febc3cd8927f',
      'caveat.css': '33ff5ef8d69181ab09c0e705d230aeea314886a71f098784ce361589938d9680',
      'LICENSE': '163a2b400e16916ad3196296c946c526d0efce6baf22a2164269ffc62fb9f671',
    },
  }),
  ...fontEntry({
    name: 'oswald', pkg: '@fontsource/oswald', version: '5.2.8', family: 'Oswald',
    weights: [400],
    sha: {
      'files/oswald-latin-400-normal.woff2': 'e902b779e43944c300cf8ae5e4a1affa68cb8a823fd263dd2f479c4cdfbd213c',
      'files/oswald-latin-ext-400-normal.woff2': '6d476422160d95b77d171000b7e8cc5cfd42f1dcb8f89b4d6350c8631a5fe0a3',
      'oswald.css': 'db3da0e8659df666bf20fcfcdd0c96b214d76d70bf666514f15c131c07f48fab',
      'LICENSE': '23916cdee678823c3c517c699cb2e043088de0d46c959eeaa168b54bb84534df',
    },
  }),
  ...fontEntry({
    name: 'montserrat', pkg: '@fontsource/montserrat', version: '5.2.8', family: 'Montserrat',
    weights: [400],
    sha: {
      'files/montserrat-latin-400-normal.woff2': 'e66bcd2761ab6924b25ce70dafe10e57a39193c4fea1516730bd9cb5240af6c8',
      'files/montserrat-latin-ext-400-normal.woff2': '30f166cea0894715f7b1342798306dd4206bc1d0331440d543f6e7f7fff04539',
      'montserrat.css': '9150a545a7517f7c0766904388b1bdb9804b44b4e0154dda6e9c751efe96c4db',
      'LICENSE': 'f429f739351287574c0c3175a9222bb3e49c7cad3f568a04f2c08d74c107724e',
    },
  }),
  ...fontEntry({
    name: 'roboto', pkg: '@fontsource/roboto', version: '5.2.10', family: 'Roboto',
    weights: [400],
    sha: {
      'files/roboto-latin-400-normal.woff2': '425c0713a8176f92273d378599c7eac57de7fafabd4bd0ed457b70eb8f80d371',
      'files/roboto-latin-ext-400-normal.woff2': '5725eacca97303d8bce26f76cfcaee4393295bbf93c1eb6c3e5e4f260b2da189',
      'roboto.css': 'c4d10f464c1ddfac39a4cf087dd5933ab12f004092439591df243371be7b483e',
      'LICENSE': '84044c09058803d87a241bd28abb4ce30a433d7db9c27a04da3efad6a0ca539c',
    },
  }),
];

// Build one font manifest entry from a compact spec. Returned as a 1-element
// array so it can be spread into the manifest (keeps the call sites uniform and
// lets a family expand to >1 entry later without touching the spread).
function fontEntry({ name, pkg, version, family, weights, subsets = ['latin', 'latin-ext'], sha }) {
  const id = pkg.replace(/^@[^/]+\//, '');
  const cssName = `${name}.css`;
  return [
    {
      name,
      source: { type: 'npm-tarball', pkg, version },
      dest: `static/deck-kit/vendor/fonts/${name}`,
      files: [
        ...fontFiles(id, weights, subsets).map((rel) => ({ path: rel, sha256: sha[rel] || '' })),
        { path: cssName, sha256: sha[cssName] || '', bytes: (source) => buildFontCss(source, { id, family, weights, subsets }) },
        { path: 'LICENSE', sha256: sha.LICENSE || '' },
      ],
      license: 'LICENSE',
      cssEntry: cssName,
      // No deck may pull these families back from the Google Fonts CDN.
      cdnLeak: /fonts\.(?:googleapis|gstatic)\.com/i,
      // Carried for the provenance README + future re-vendoring; unused by the engine.
      family,
      weights,
      subsets,
    },
  ];
}
