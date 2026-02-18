#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Claude Agent Dashboard...\n');

const server = spawn('node', [path.join(__dirname, 'server.js')], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

process.on('SIGINT', () => {
  console.log('\nShutting down...');
  server.kill();
  process.exit();
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

console.log('Dashboard starting on http://localhost:3001');
console.log('\nPress Ctrl+C to stop\n');
