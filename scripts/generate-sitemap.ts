import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://flowlint.dev';
const OUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

const routes = [
  '/',
  '/get-started',
  '/support',
  '/doc',
  '/roadmap',
  '/cli',
  '/chrome-extension',
  '/privacy',
  '/tos',
];

const generateSitemap = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      return `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  await fs.writeFile(OUT_FILE, sitemap.trim(), 'utf-8');
  console.log(`Sitemap generated at ${OUT_FILE}`);
};

generateSitemap().catch(console.error);
