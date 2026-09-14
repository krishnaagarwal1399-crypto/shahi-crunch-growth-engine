const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, 'dist');
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist, { recursive: true });
}

// 1. Copy public directory assets into dist if present
const publicDir = path.resolve(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  for (const file of fs.readdirSync(publicDir)) {
    const src = path.resolve(publicDir, file);
    try {
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, path.resolve(dist, file));
        console.log(`[OK] Copied public/${file} -> dist/${file}`);
      }
    } catch (e) {
      console.warn(`Could not copy public/${file}:`, e.message);
    }
  }
}

// 2. Copy root assets into dist
const filesToCopy = [
  'index.html',
  'about.html',
  'products.html',
  'distributor.html',
  'testimonials.html',
  'blog.html',
  'contact.html',
  'admin.html',
  'admin-seo.html',
  'admin-cms.css',
  'admin-seo.css',
  'globals-CHjMRFUR.css',
  'seo-crm.css',
  'cms-engine.js',
  'cms-public-client.js',
  'seo-core.js',
  'seo-crm.js',
  'hero.jpg',
  'kesar-pista.jpg',
  'chocolive.jpg',
  'double-crunch.jpg',
  'dry-fruit-raita.jpg',
  'robots.txt',
  'sitemap.xml'
];

let copied = 0;
for (const file of filesToCopy) {
  const src = path.resolve(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.resolve(dist, file));
    copied++;
    console.log(`[OK] Copied root ${file} -> dist/${file}`);
  }
}

console.log(`Static site build complete! Bundled ${copied} primary assets into dist/.`);
