// Builds the brand assets from Assets/LOGO.png:
//   public/brand/logo-gold.svg, public/brand/logo-pearl.svg  (vector-traced wordmark)
//   public/favicon.svg, public/apple-touch-icon.png, public/icon-192.png, public/icon-512.png
//   public/og-default.png (1200×630 social share image)
// Usage: npm run logo   (only needed again if the logo changes)
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import potrace from 'potrace';

const SRC = path.resolve('Assets/LOGO.png');
const PUB = path.resolve('public');
const GOLD = '#C9A96E';
const PEARL = '#F4F1EA';
const INK = '#14121F';

await fs.mkdir(path.join(PUB, 'brand'), { recursive: true });

// 1) Clean up the raster: flatten on white, grayscale, upscale for smoother curves, trim.
const prepared = await sharp(SRC)
  .flatten({ background: '#ffffff' })
  .grayscale()
  .resize({ width: 1600 })
  .normalise()
  .trim({ threshold: 20 })
  .png()
  .toBuffer();

const meta = await sharp(prepared).metadata();

// 2) Trace to a single SVG path.
const svg = await new Promise((resolve, reject) =>
  potrace.trace(
    prepared,
    { threshold: 170, turdSize: 12, optCurve: true, optTolerance: 0.8, color: GOLD, background: 'transparent' },
    (err, out) => (err ? reject(err) : resolve(out)),
  ),
);

const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ');
// round coordinates to keep the file small
const dSmall = d
  .replace(/(\d+\.\d+)/g, (n) => String(Math.round(+n)))
  .replace(/\s+/g, ' ')
  .replace(/ ?([MCLZ]) ?/g, '$1')
  .replace(/, /g, ',');
const pad = 20;
const vb = `${-pad} ${-pad} ${meta.width + pad * 2} ${meta.height + pad * 2}`;
const makeLogo = (fill) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="FairyPrisme"><title>FairyPrisme</title><path fill="${fill}" fill-rule="evenodd" d="${dSmall}"/></svg>\n`;

await fs.writeFile(path.join(PUB, 'brand/logo-gold.svg'), makeLogo(GOLD));
await fs.writeFile(path.join(PUB, 'brand/logo-pearl.svg'), makeLogo(PEARL));
console.log(`logo: ${meta.width}×${meta.height}, ${(makeLogo(GOLD).length / 1024).toFixed(1)} KB`);

// 3) Favicon: the prism from the logo, redrawn as a crisp geometric mark.
const prism = (stroke, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${
  bg ? `<rect width="64" height="64" rx="14" fill="${bg}"/>` : ''
}<g fill="none" stroke="${stroke}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M32 8 8 44l24 10 24-10Z"/><path d="M32 8v46M8 44l24-7 24 7"/></g></svg>`;

await fs.writeFile(
  path.join(PUB, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>path{stroke:${GOLD}}</style><rect width="64" height="64" rx="14" fill="${INK}"/><g fill="none" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M32 9 9 44l23 10 23-10Z"/><path d="M32 9v45M9 44l23-7 23 7"/></g></svg>\n`,
);
for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(prism(GOLD, INK)), { density: 600 }).resize(size, size).png().toFile(path.join(PUB, name));
}

// 4) Default Open Graph image.
const W = 1200;
const H = 630;
const logoW = 760;
const logoPng = await sharp(Buffer.from(makeLogo(GOLD)), { density: 300 }).resize({ width: logoW }).png().toBuffer();
const logoMeta = await sharp(logoPng).metadata();
const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="80%" cy="0%" r="80%"><stop offset="0" stop-color="#A78BDA" stop-opacity=".14"/><stop offset="1" stop-color="#A78BDA" stop-opacity="0"/></radialGradient>
    <linearGradient id="p" x1="0" x2="1"><stop offset="0" stop-color="#A78BDA" stop-opacity="0"/><stop offset=".25" stop-color="#A78BDA"/><stop offset=".5" stop-color="#7FC8C2"/><stop offset=".75" stop-color="#C9A96E"/><stop offset="1" stop-color="#C9A96E" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${INK}"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="36" y="36" width="${W - 72}" height="${H - 72}" rx="28" fill="none" stroke="${GOLD}" stroke-opacity=".35"/>
  <rect x="${(W - 420) / 2}" y="${H - 150}" width="420" height="1.5" fill="url(#p)"/>
</svg>`;
await sharp(Buffer.from(bg))
  .composite([{ input: logoPng, left: Math.round((W - logoW) / 2), top: Math.round((H - logoMeta.height) / 2) - 30 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUB, 'og-default.png'));

console.log('brand assets written to /public');
