#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * serve-static-stop.js — stop this worktree's `serve:static` server.
 *
 * Reads .live-server.pid (written by serve-static.js), verifies the PID still
 * belongs to a `live-server` process (recycled-PID guard), terminates it, and
 * removes the sidecar files. Unconditional: whoever started the server, this
 * stops it — the caller has decided it should go. Two callers:
 *   • manual `npm run serve:static:stop`
 *   • the SessionEnd hook in .claude/settings.json, which fires when the Claude
 *     session CLOSES (not per turn, and excludes /clear — see the hook matcher).
 *
 * Always exits 0. Best-effort; missing files are fine.
 */
const fs = require('fs');
const { processIsLiveServer, resolveStateDir, sidecarPaths } = require('./lib/live-server');

// Same resolution as serve-static.js: stop the server tracked in the state dir
// (cwd by default, or --state-dir <dir> / $MN_SERVE_STATE_DIR), so an external
// deck's `--state-dir`-tracked server is stopped where it was started.
const { portFile: PORT_PATH, pidFile: PID_PATH } = sidecarPaths(resolveStateDir(process.argv.slice(2)));

function unlinkQuiet(p) { try { fs.unlinkSync(p); } catch {} }
function readQuiet(p) { try { return fs.readFileSync(p, 'utf8').trim(); } catch { return ''; } }

const raw = readQuiet(PID_PATH);
if (/^\d+$/.test(raw)) {
  const pid = parseInt(raw, 10);
  if (processIsLiveServer(pid)) {
    try {
      process.kill(pid, 'SIGTERM');
      console.log(`Stopped live-server (PID ${pid}).`);
    } catch {}
  }
}

unlinkQuiet(PORT_PATH);
unlinkQuiet(PID_PATH);
