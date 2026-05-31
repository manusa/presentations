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
const { PORT_FILE, PID_FILE, processIsLiveServer } = require('./lib/live-server');

function unlinkQuiet(p) { try { fs.unlinkSync(p); } catch {} }
function readQuiet(p) { try { return fs.readFileSync(p, 'utf8').trim(); } catch { return ''; } }

const raw = readQuiet(PID_FILE);
if (/^\d+$/.test(raw)) {
  const pid = parseInt(raw, 10);
  if (processIsLiveServer(pid)) {
    try {
      process.kill(pid, 'SIGTERM');
      console.log(`Stopped live-server (PID ${pid}).`);
    } catch {}
  }
}

unlinkQuiet(PORT_FILE);
unlinkQuiet(PID_FILE);
