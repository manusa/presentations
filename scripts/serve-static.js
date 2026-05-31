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
 *   3. Writes .live-server.port and .live-server.pid to the worktree root.
 *      Teardown is handled out-of-band: a SessionEnd hook (.claude/settings.json)
 *      runs `serve:static:stop` when the Claude session CLOSES — not per turn —
 *      and `npm run serve:static:stop` stops it manually. Either way it kills
 *      whatever is tracked, regardless of who started it.
 *   4. On exit / SIGINT / SIGTERM of this wrapper: removes the sidecar files and
 *      terminates the live-server child. (Reuse path does none of this — it
 *      never owned the server, so it must not tear it down.)
 */
const fs = require('fs');
const net = require('net');
const { spawn } = require('child_process');
const {
  PORT_FILE,
  PID_FILE,
  MIDDLEWARE,
  findWorktreeServers,
} = require('./lib/live-server');

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

// If a live-server is already serving this worktree, adopt it and return true.
function reuseExisting() {
  const servers = findWorktreeServers();
  if (servers.length === 0) return false;

  // Prefer the PID already recorded in the sidecar, if it is still among the
  // running servers; otherwise adopt the first one found.
  let chosen = servers[0];
  try {
    const trackedPid = parseInt(fs.readFileSync(PID_FILE, 'utf8').trim(), 10);
    const match = servers.find((s) => s.pid === trackedPid);
    if (match) chosen = match;
  } catch {}

  // Point both sidecars at the adopted server: .live-server.port so tooling
  // (`cat .live-server.port`, screenshot/snapshot scripts) resolves the URL,
  // and .live-server.pid so `serve:static:stop` targets the server that is
  // actually running. Without the PID write, a stale/dead PID file (server
  // started outside the wrapper, or a PID file that went stale while the
  // process lived) would make stop no-op and leak the adopted server.
  writeQuiet(PORT_FILE, String(chosen.port));
  writeQuiet(PID_FILE, String(chosen.pid));

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
  // Idempotent: reuse a running server instead of spawning a duplicate.
  if (reuseExisting()) return;

  const port = await freePort();

  const child = spawn(
    'live-server',
    ['static', `--port=${port}`, '--no-browser', `--middleware=${MIDDLEWARE}`],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  fs.writeFileSync(PORT_FILE, String(port));
  fs.writeFileSync(PID_FILE, String(child.pid));

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    try { fs.unlinkSync(PORT_FILE); } catch {}
    try { fs.unlinkSync(PID_FILE); } catch {}
    if (child.exitCode === null && !child.killed) {
      try { child.kill('SIGTERM'); } catch {}
    }
  };

  console.log(`→ http://localhost:${port}/`);
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
