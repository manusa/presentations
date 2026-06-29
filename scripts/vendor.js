'use strict';

/**
 * Manifest-driven vendoring CLI (issue #68). One command re-vendors every
 * library declared in `scripts/vendor.manifest.js`, or verifies the committed
 * copies offline:
 *
 *   npm run vendor                    # re-vendor every manifest entry
 *   npm run vendor -- <name> [name…]  # re-vendor just the named entries
 *   npm run vendor -- --verify        # check all committed files, no network
 *   npm run vendor -- <name> --verify # check one entry's committed files
 *
 * Thin `vendor:<name>` aliases delegate here (see package.json). The engine and
 * its pluggable sources live in scripts/lib/vendor.js; this file is just the
 * CLI: argument parsing, console formatting, and the exit code.
 */

const path = require('node:path');
const { vendorEntry, REPO_ROOT } = require('./lib/vendor');
const manifest = require('./vendor.manifest');

async function main() {
  const args = process.argv.slice(2);
  const verifyOnly = args.includes('--verify') || args.includes('--verify-only');
  const names = args.filter((a) => !a.startsWith('-'));

  const unknown = names.filter((n) => !manifest.some((e) => e.name === n));
  if (unknown.length) {
    console.error(`unknown manifest entr${unknown.length === 1 ? 'y' : 'ies'}: ${unknown.join(', ')}`);
    console.error(`known: ${manifest.map((e) => e.name).join(', ')}`);
    process.exit(1);
  }

  const entries = names.length ? manifest.filter((e) => names.includes(e.name)) : manifest;
  let failures = 0;

  for (const entry of entries) {
    const results = await vendorEntry(entry, { verifyOnly });
    for (const r of results) {
      if (r.error) {
        console.error(`✗ ${entry.name}/${r.rel}: ${r.error}`);
        failures++;
        continue;
      }
      const note = r.pinned ? '' : '  (no pinned hash — paste this back into the manifest)';
      const label = verifyOnly ? 'checked' : 'wrote  ';
      console.log(`${label} ${`${entry.name}/${r.rel}`.padEnd(48)} ${String(r.bytes).padStart(8)} bytes  sha256:${r.hash}${note}`);
    }
    const where = path.relative(process.cwd(), path.resolve(REPO_ROOT, entry.dest));
    console.log(`${entry.name} ${verifyOnly ? 'verified in' : 'vendored to'} ${where}\n`);
  }

  if (failures) {
    console.error(`${failures} file(s) failed`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
