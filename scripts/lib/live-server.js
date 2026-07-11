/* eslint-disable no-console */
/*
 * live-server.js — shared helpers for the worktree-scoped static dev server.
 *
 * serve-static.js (start) and serve-static-stop.js (stop) both need to reason
 * about which `live-server` processes belong to THIS worktree, so the detection
 * lives here once and the two stay in agreement.
 *
 * Worktree scoping is by the absolute `--middleware` path: each worktree spawns
 * live-server with `--middleware=<worktree>/scripts/serve-static-middleware.js`,
 * which is unique per checkout, so matching on it never touches another
 * worktree's server.
 *
 * Sidecar files (all gitignored). Their directory is the "state dir": by
 * default the process cwd — so a plain `serve:static` in a worktree writes them
 * to that worktree root, unchanged — but overridable via `--state-dir <dir>` (or
 * $MN_SERVE_STATE_DIR). The override exists so a deck served from OUTSIDE this
 * repo (serve:static --deck <external>) can track its server next to that deck
 * instead of here, giving external/private decks the same per-checkout isolation
 * worktrees already get. See resolveStateDir() / sidecarPaths().
 *   .live-server.port     the port the running server bound (tooling reads this)
 *   .live-server.pid      the live-server child PID (the stop target)
 */
const { execSync } = require('child_process');
const path = require('path');

const PORT_FILE = '.live-server.port';
const PID_FILE = '.live-server.pid';

// Absolute path to THIS worktree's middleware — the per-worktree scope key.
const MIDDLEWARE = path.resolve(__dirname, '..', 'serve-static-middleware.js');

// Directory the sidecar files live in. Precedence: `--state-dir <dir>` /
// `--state-dir=<dir>` on argv, then $MN_SERVE_STATE_DIR, then process.cwd()
// (the historical default — keeps every existing invocation byte-for-byte the
// same). Always returned absolute. serve-static.js (start) and
// serve-static-stop.js (stop) both call this so they agree on where to look.
function resolveStateDir(argv = []) {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--state-dir') { if (argv[i + 1]) return path.resolve(argv[i + 1]); }
    else if (argv[i].startsWith('--state-dir=')) return path.resolve(argv[i].slice('--state-dir='.length));
  }
  if (process.env.MN_SERVE_STATE_DIR) return path.resolve(process.env.MN_SERVE_STATE_DIR);
  return process.cwd();
}

// Absolute { portFile, pidFile } under a state dir.
function sidecarPaths(stateDir) {
  return {
    portFile: path.join(stateDir, PORT_FILE),
    pidFile: path.join(stateDir, PID_FILE),
  };
}

// Running live-server processes for THIS worktree, as [{ pid, port }].
// Empty array on any failure (e.g. ps unavailable) — callers treat that as
// "nothing running" and start fresh.
function findWorktreeServers() {
  let out;
  try {
    out = execSync('ps -A -o pid=,command=', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return [];
  }
  const servers = [];
  for (const line of out.split('\n')) {
    if (!line.includes(`--middleware=${MIDDLEWARE}`)) continue;
    const pidMatch = line.match(/^\s*(\d+)\s/);
    const portMatch = line.match(/--port=(\d+)/);
    if (pidMatch && portMatch) {
      servers.push({
        pid: parseInt(pidMatch[1], 10),
        port: parseInt(portMatch[1], 10),
        cmd: line, // full command line, so callers can check --mount= args
      });
    }
  }
  return servers;
}

// True if `pid` is currently a live-server process (recycled-PID guard).
function processIsLiveServer(pid) {
  try {
    const cmd = execSync(`ps -p ${pid} -o command=`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return /live-server/.test(cmd);
  } catch {
    return false;
  }
}

module.exports = {
  // PORT_FILE / PID_FILE are intentionally NOT exported: consumers must go
  // through resolveStateDir + sidecarPaths so they honor --state-dir. Exporting
  // the bare basenames would invite a caller to join them against cwd and
  // silently bypass the override.
  MIDDLEWARE,
  findWorktreeServers,
  processIsLiveServer,
  resolveStateDir,
  sidecarPaths,
};
