#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * serve-static-stop.js — stop the worktree's `serve:static` process.
 *
 * Reads .live-server.pid (written by serve-static.js) from the current
 * worktree root, verifies the PID still belongs to a `live-server` process
 * (so a recycled PID can't be killed accidentally), terminates it, and
 * removes both .live-server.pid and .live-server.port.
 *
 * Always exits 0 — invoked by both `npm run serve:static:stop` (user) and
 * the Stop hook in .claude/settings.json (automatic at Claude session end).
 * Best-effort cleanup; missing files are fine.
 */
const fs = require('fs');
const { execSync } = require('child_process');

const PORT_FILE = '.live-server.port';
const PID_FILE = '.live-server.pid';

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

function unlinkQuiet(path) {
  try { fs.unlinkSync(path); } catch {}
}

if (fs.existsSync(PID_FILE)) {
  const raw = fs.readFileSync(PID_FILE, 'utf8').trim();
  if (/^\d+$/.test(raw)) {
    const pid = parseInt(raw, 10);
    if (processIsLiveServer(pid)) {
      try {
        process.kill(pid, 'SIGTERM');
        console.log(`Stopped live-server (PID ${pid}).`);
      } catch {}
    }
  }
}

unlinkQuiet(PORT_FILE);
unlinkQuiet(PID_FILE);
