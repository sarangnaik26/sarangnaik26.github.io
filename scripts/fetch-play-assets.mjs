// Downloads the Floaty Bird Reverse icon + screenshots from Google Play
// into src/assets/games/floaty-bird-reverse so Astro can optimise them.
// Usage: npm run fetch:assets
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('src/assets/games/floaty-bird-reverse');
const BASE = 'https://play-lh.googleusercontent.com/';

const files = {
  'icon.png': 'S_GdOLrFP56jeNPH6OjV008RvE4zXY8Nmto6oxiTt6A48VliObpFR6gaZmNWbHKCELmDMYiHxk96HIwx7z_4D2c=s512',
  'screenshot-1.png': 'MpT3xRoePpKXycLFCrPiQrnqyoXTm4V0la9YWaOLh_TD8gbMTp__y4s-dndiYaI-FDkqgPUM_Q7CqHSpeZgXgg=h1600',
  'screenshot-2.png': 'CXPJPYFy2FTcF6-VDrlgt2h62qC3mTgqSOcUChdHySei6OK6o3HXaKu5QrHR-E6s-Wpgx4XFftCr8B2jiGYpE-U=h1600',
  'screenshot-3.png': 'yrs97_WESyGnjQJEV-tGd3FCA-NspuOl3vYas_TH_ne7C_hStDSmXcadiTjRpbf_D2UM5HJ29aKf2_yXkoF9=h1600',
  'screenshot-4.png': 'JkhhD95jISLX-n5ZJpF1TIUJMnrp7M6HyhOeoFs7JLKtqcfy1V9zFYzXGg-78VBmgw7MyN5ug8T0Lme6W2Ak=h1600',
  'screenshot-5.png': 'OWdxvl0gI9m2B89EHFFAlqOGPyogmC9XJ_J9M104_-dyiUsIJlq9UNdhW6lFeub5ts-ClhZ5-KUdqEEm9zCr=h1600',
  'screenshot-6.png': 'TrpKBDPxvJj4Kjf1KWGye2gl3UTWp08Si3NS5Gc9x_FVqb5d3iFr4yutoL5EugYi6zoj_-qpW_roTYLRHWy3pg=h1600',
  'screenshot-7.png': '6dTu1GsiCjaFvumfGGbju5X13lqEw0oSstLrYx-6cBtT7vyNM_J0w3rtcWPxrd0t7Np6hm1bEwk4saSMfnCs9w=h1600',
};

await fs.mkdir(OUT, { recursive: true });
for (const [name, id] of Object.entries(files)) {
  const res = await fetch(BASE + id);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(path.join(OUT, name), buf);
  console.log(`saved ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
}
