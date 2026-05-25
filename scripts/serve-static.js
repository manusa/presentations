#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * serve-static.js — wraps `live-server static` for worktree-safe parallel use.
 *
 * Why this exists:
 *   Multiple worktrees on the same machine all running `npm run serve:static`
 *   used to collide on port 8080. And agents starting `serve:static` in the
 *   background often left it running after their session ended.
 *
 * What it does:
 *   1. Picks a free random port (no hard-coded 8080).
 *   2. Spawns `live-server static --port=<port> --no-browser`.
 *   3. Writes `.live-server.port` and `.live-server.pid` to the worktree root.
 *      Agents read `.live-server.port` to discover the URL; the Stop hook in
 *      .claude/settings.json reads `.live-server.pid` to clean up at session
 *      end (scoped via a `ps` check so it never kills another worktree's
 *      server).
 *   4. On exit / SIGINT / SIGTERM: removes the sidecar files and terminates
 *      the live-server child.
 */
const fs = require('fs');
const net = require('net');
const { spawn } = require('child_process');

const PORT_FILE = '.live-server.port';
const PID_FILE = '.live-server.pid';

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

async function main() {
  const port = await freePort();

  const child = spawn(
    'live-server',
    ['static', `--port=${port}`, '--no-browser'],
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
