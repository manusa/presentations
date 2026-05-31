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
 * Sidecar files (all gitignored, all relative to the worktree root / cwd):
 *   .live-server.port     the port the running server bound (tooling reads this)
 *   .live-server.pid      the live-server child PID (the stop target)
 */
const { execSync } = require('child_process');
const path = require('path');

const PORT_FILE = '.live-server.port';
const PID_FILE = '.live-server.pid';

// Absolute path to THIS worktree's middleware — the per-worktree scope key.
const MIDDLEWARE = path.resolve(__dirname, '..', 'serve-static-middleware.js');

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
  PORT_FILE,
  PID_FILE,
  MIDDLEWARE,
  findWorktreeServers,
  processIsLiveServer,
};
