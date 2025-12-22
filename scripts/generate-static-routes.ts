import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ESM compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  'privacy',
  'support',
  'configuration',
  'chrome',
  'cli',
  'github',
  'rules'
];

const distDir = path.resolve(__dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtml)) {
  console.error('dist/index.html not found. Run build first.');
  process.exit(1);
}

// 1. Create 404.html for generic fallback
fs.copyFileSync(indexHtml, path.join(distDir, '404.html'));
console.log('Created 404.html');

// 2. Create static directories for key routes to ensure HTTP 200
routes.forEach(route => {
  const dir = path.join(distDir, route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(indexHtml, path.join(dir, 'index.html'));
  console.log(`Created static entry for /${route} -> HTTP 200`);
});