#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * serve-static.js — wraps `live-server static` for worktree-safe parallel use.
 *
 * Why this exists:
 *   Multiple worktrees on the same machine all running `npm run serve:static`
 *   used to collide on port 8080. And every invocation used to spawn a fresh
 *   live-server, so agents piled up orphaned servers and clobbered the sidecar
 *   tracking of whoever was already serving.
 *
 * What it does:
 *   1. IDEMPOTENT REUSE — if a live-server is already running for THIS worktree,
 *      reuse it: print its URL, point .live-server.port at it, and exit. No
 *      duplicate spawned, no existing server killed. This is what makes it safe
 *      for an agent to call while the user has their own server running.
 *   2. Otherwise picks a free random port (no hard-coded 8080) and spawns
 *      `live-server static --port=<port> --no-browser`.
 *   3. Writes .live-server.port and .live-server.pid to the state dir (the
 *      worktree root by default; --state-dir <dir> relocates them, e.g. next to
 *      an external deck served with --deck).
 *      Teardown is handled out-of-band: a SessionEnd hook (.claude/settings.json)
 *      runs `serve:static:stop` when the Claude session CLOSES — not per turn —
 *      and `npm run serve:static:stop` stops it manually. Either way it kills
 *      whatever is tracked, regardless of who started it. NOTE: the hook runs
 *      stop WITHOUT --state-dir, so it only reaps the cwd sidecar; a server
 *      started with --state-dir must be stopped with the SAME --state-dir (its
 *      launcher owns that lifecycle — the hook won't auto-clean it).
 *   4. On exit / SIGINT / SIGTERM of this wrapper: removes the sidecar files and
 *      terminates the live-server child. (Reuse path does none of this — it
 *      never owned the server, so it must not tear it down.)
 */
const fs = require('fs');
const path = require('path');
const net = require('net');
const { spawn } = require('child_process');
const {
  MIDDLEWARE,
  findWorktreeServers,
  resolveStateDir,
  sidecarPaths,
} = require('./lib/live-server');

// Where .live-server.{port,pid} live for this run: the cwd by default, or the
// dir passed via --state-dir / $MN_SERVE_STATE_DIR. Resolved once so every
// read/write below agrees. (--state-dir is consumed here and never forwarded to
// live-server, which only receives the args we construct in main().)
const { portFile: PORT_PATH, pidFile: PID_PATH } = sidecarPaths(resolveStateDir(process.argv.slice(2)));

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

function writeQuiet(file, contents) {
  try { fs.writeFileSync(file, contents); } catch {}
}

// A deck dir's URL slug: its own name, or its parent's when it is literally
// "deck" (so `.../2026-foo/deck` mounts at /presentations/2026-foo/).
function slugFor(dir) {
  const abs = path.resolve(dir);
  return path.basename(abs) === 'deck' ? path.basename(path.dirname(abs)) : path.basename(abs);
}

// `--deck <dir>` (repeatable): decks that live OUTSIDE static/ (e.g. a private
// deck in a sibling repo). Each is mounted at /presentations/<slug>/ so its
// ../../deck-kit/ + ../../deck-kit/vendor/fonts/ references resolve from the
// public static/deck-kit. Nothing is written under static/ → never hits a build.
function parseDecks(argv) {
  const dirs = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--deck') { if (argv[i + 1]) dirs.push(argv[++i]); }
    else if (argv[i].startsWith('--deck=')) dirs.push(argv[i].slice('--deck='.length));
  }
  return dirs.map((d) => ({ route: `/presentations/${slugFor(d)}`, dir: path.resolve(d) }));
}

function logMounts(mounts) {
  let port = '';
  try { port = fs.readFileSync(PORT_PATH, 'utf8').trim(); } catch {}
  for (const m of mounts) {
    console.log(`  ↳ deck ${m.dir}  →  http://localhost:${port}${m.route}/`);
  }
}

// If a live-server is already serving this worktree, adopt it and return true.
function reuseExisting(mountArgs = []) {
  let servers = findWorktreeServers();
  // Only adopt a running server that already carries the requested private-deck
  // mounts; otherwise fall through and spawn a fresh one that does.
  if (mountArgs.length) servers = servers.filter((s) => mountArgs.every((a) => (s.cmd || '').includes(a)));
  if (servers.length === 0) return false;

  // Prefer the PID already recorded in the sidecar, if it is still among the
  // running servers; otherwise adopt the first one found.
  let chosen = servers[0];
  try {
    const trackedPid = parseInt(fs.readFileSync(PID_PATH, 'utf8').trim(), 10);
    const match = servers.find((s) => s.pid === trackedPid);
    if (match) chosen = match;
  } catch {}

  // Point both sidecars at the adopted server: .live-server.port so tooling
  // (`cat .live-server.port`, screenshot/snapshot scripts) resolves the URL,
  // and .live-server.pid so `serve:static:stop` targets the server that is
  // actually running. Without the PID write, a stale/dead PID file (server
  // started outside the wrapper, or a PID file that went stale while the
  // process lived) would make stop no-op and leak the adopted server.
  writeQuiet(PORT_PATH, String(chosen.port));
  writeQuiet(PID_PATH, String(chosen.pid));

  console.log(`→ http://localhost:${chosen.port}/  (reusing running server, PID ${chosen.pid})`);
  if (servers.length > 1) {
    console.log(
      `  note: ${servers.length} live-server processes are serving this worktree; ` +
      "reusing one. Tidy the extras with `pkill -f 'live-server static'`.",
    );
  }
  return true;
}

async function main() {
  const mounts = parseDecks(process.argv.slice(2));
  const mountArgs = mounts.map((m) => `--mount=${m.route}:${m.dir}`);
  for (const m of mounts) {
    if (!fs.existsSync(path.join(m.dir, 'index.html'))) {
      console.warn(`⚠ --deck ${m.dir}: no index.html found (mounting ${m.route}/ anyway)`);
    }
  }

  // Idempotent: reuse a running server (with the same mounts) instead of a dup.
  if (reuseExisting(mountArgs)) { logMounts(mounts); return; }

  const port = await freePort();

  const child = spawn(
    'live-server',
    ['static', `--port=${port}`, '--no-browser', `--middleware=${MIDDLEWARE}`, ...mountArgs],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  fs.writeFileSync(PORT_PATH, String(port));
  fs.writeFileSync(PID_PATH, String(child.pid));

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    try { fs.unlinkSync(PORT_PATH); } catch {}
    try { fs.unlinkSync(PID_PATH); } catch {}
    if (child.exitCode === null && !child.killed) {
      try { child.kill('SIGTERM'); } catch {}
    }
  };

  console.log(`→ http://localhost:${port}/`);
  logMounts(mounts);
  child.stdout.on('data', (b) => process.stdout.write(b));
  child.stderr.on('data', (b) => process.stderr.write(b));

  child.on('exit', (code) => {
    cleanup();
    process.exit(code ?? 0);
  });

  ['SIGINT', 'SIGTERM', 'SIGHUP'].forEach((sig) => {
    process.on(sig, () => { cleanup(); process.exit(0); });
  });
  process.on('exit', cleanup);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
