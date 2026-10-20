# FairyPrisme Website

A fast, static website for **FairyPrisme** — an independent studio creating mobile games, apps, and stories.

Designed with a boutique perfume-house / literary publisher aesthetic: calm, midnight plum tones, champagne gold hairlines, subtle prism accents, Cormorant Garamond headings, and Inter body text.

---

## Tech Stack

- **Framework**: [Astro](https://astro.build) (Static output, zero heavy client runtime)
- **Styling**: Tailwind CSS v4 with custom brand tokens and CSS variables
- **Content Collections**: Fully typed Markdown-driven games catalog (`src/content/games/`)
- **Typography**: Self-hosted via Fontsource (`@fontsource/cormorant-garamond`, `@fontsource-variable/inter`)
- **Icons**: Lightweight inline SVGs (`src/components/Icon.astro`) — zero external font or CDN downloads
- **SEO**: Dynamic sitemap (`@astrojs/sitemap`), Open Graph images, JSON-LD structured data (`SoftwareApplication` / `VideoGame`), and `robots.txt`

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Inside `.env`:
```ini
# Canonical URL for SEO & sitemap
SITE_URL=https://fairyprisme.pages.dev

# Web3Forms API Key (free from https://web3forms.com)
# If empty, the form gracefully falls back to opening the visitor's mail client.
PUBLIC_WEB3FORMS_KEY=your_key_here
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 4. Build for Production & Type Check
```bash
npm run build
```
This runs `astro check` for strict TypeScript verification and compiles static HTML into `dist/`.

### 5. Preview the Production Build Locally
```bash
npm run preview
```

---

## How-To Guides

### How to Add a New Game

Every game is defined as a Markdown file in `src/content/games/<slug>.md`. The page code is completely generic — you never need to edit `.astro` templates to add new games.

1. Create a new file, e.g. `src/content/games/my-new-game.md`.
2. Add the frontmatter matching `src/content.config.ts`:
   ```markdown
   ---
   title: My New Game
   tagline: A short, poetic one-line hook.
   summary: A 1-2 sentence description for cards and search snippets.
   status: live
   featured: false
   order: 2

   icon: ../../assets/games/my-new-game/icon.png
   iconAlt: My New Game app icon
   screenshots:
     - src: ../../assets/games/my-new-game/screenshot-1.png
       alt: Main gameplay screen

   genre: Arcade
   contentRating: Everyone
   containsAds: true
   inAppPurchases: false
   platforms: [Android]
   price: Free
   stores:
     googlePlay: https://play.google.com/store/apps/details?id=com.fairyprisme.mynewgame

   details:
     version: 1.0.0
     updated: 2026-11-01
     requires: Android 8.0 and up
     developer: FairyPrisme

   links:
     guide: https://...
     privacy: https://...

   modes:
     - name: Classic
       description: How this mode works.

   features:
     - Feature highlight 1
     - Feature highlight 2

   howToPlay:
     - title: Tap to play
       text: Step 1 instructions.

   unlockables:
     title: Unlockables
     intro: How to earn coins and unlock skins.
     items:
       - name: Golden Hawk
         description: Unlocked with 500 coins.

   adsNote: Optional transparency note explaining ads.
   ---

   Long-form about text written in Markdown. This will appear under "About the Game".
   ```
3. Place screenshots and icon in `src/assets/games/my-new-game/`.
4. Run `npm run build` — the game will automatically appear on the home page, in `/games`, and at `/games/my-new-game` with its own screenshot lightbox, details table, and structured data!

---

### How to Launch a New Section (Novels / Ebooks)

Sections are managed centrally in `src/config/sections.ts`.

Currently, `novels` and `ebooks` have `enabled: false`. They appear on the home page as **"Coming Soon"** and their URLs 404 so visitors don't encounter unfinished sections.

To launch **Novels**:
1. Open `src/config/sections.ts`.
2. Find `id: 'novels'`.
3. Change `enabled: false` to `enabled: true`:
   ```ts
   {
     id: 'novels',
     label: 'Novels',
     href: '/novels',
     enabled: true,
     showInWhatWeMake: true,
     blurb: 'Long-form stories with a touch of wonder, written slowly and with care.',
     intro: 'Explore our latest novel releases and stories.',
     icon: 'book',
   }
   ```
4. Astro will automatically:
   - Add "Novels" to the header and mobile navigation.
   - Add "Novels" to the footer link list.
   - Change the home page card badge from "Coming Soon" to "Live Now" with a direct link.
   - Generate the `/novels` page via `src/pages/[section].astro`!

---

### How to Configure Social Links

Open `src/config/site.ts`:
```ts
const socialConfig: SocialLink[] = [
  { key: 'googlePlay', label: 'Google Play', url: 'https://play.google.com/store/apps/developer?id=FairyPrisme' },
  { key: 'x', label: 'X (Twitter)', url: 'https://x.com/fairyprisme' },
  { key: 'instagram', label: 'Instagram', url: '' }, // empty strings are automatically hidden
];
```
Any social item with an empty `url` is automatically filtered out from the header, footer, and contact page.

---

### How to Re-generate Brand Assets

The brand logo was vectorized from `Assets/LOGO.png` into clean SVGs:
- `public/brand/logo-gold.svg` (Champagne Gold `#C9A96E`)
- `public/brand/logo-pearl.svg` (Pearl `#F4F1EA`)
- `public/favicon.svg` (Prism geometric glyph)
- `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png`
- `public/og-default.png` (1200×630 Open Graph card)

If you update `Assets/LOGO.png`, regenerate the assets by running:
```bash
npm run logo
```

---

## Deployment

### Cloudflare Pages (Recommended)
1. Push your repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select the repository and use these build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. In **Environment variables**, add:
   - `SITE_URL`: `https://fairyprisme.pages.dev` (or your custom domain)
   - `PUBLIC_WEB3FORMS_KEY`: your Web3Forms access key
5. Click **Save and Deploy**.

### Netlify
1. Connect your repository in the [Netlify Dashboard](https://app.netlify.com/).
2. Netlify will auto-detect Astro:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. In **Site configuration** → **Environment variables**, add `SITE_URL` and `PUBLIC_WEB3FORMS_KEY`.
4. Deploy!

---

## Project Structure

```
FairyPrisme/
├── Assets/
│   └── LOGO.png                     # Original raster logo
├── public/
│   ├── brand/
│   │   ├── logo-gold.svg            # Vector gold wordmark
│   │   └── logo-pearl.svg           # Vector pearl wordmark
│   ├── favicon.svg                  # Vector prism favicon
│   ├── apple-touch-icon.png         # iOS icon
│   ├── icon-192.png / icon-512.png  # PWA app icons
│   ├── og-default.png               # 1200×630 social share card
│   ├── robots.txt                   # Search crawler directives
│   └── site.webmanifest             # PWA manifest
├── scripts/
│   ├── build-logo.mjs               # SVG tracer & icon generator
│   └── fetch-play-assets.mjs        # Play Store screenshot downloader
├── src/
│   ├── assets/games/
│   │   └── floaty-bird-reverse/     # Downloaded store icon & 7 screenshots
│   ├── components/
│   │   ├── ContactForm.astro        # Accessible form with mailto fallback
│   │   ├── Footer.astro             # Boutique footer with dynamic live links
│   │   ├── GameCard.astro           # Reusable game showcase card
│   │   ├── Header.astro             # Sticky header + accessible mobile drawer
│   │   ├── Icon.astro               # Inline SVG icon set
│   │   ├── Lightbox.astro           # Vanilla JS screenshot lightbox modal
│   │   └── SEO.astro                # Metadata, OpenGraph & JSON-LD schema
│   ├── config/
│   │   ├── sections.ts              # Section switchboard (Games, Novels, Ebooks)
│   │   └── site.ts                  # Brand info, email, and social profiles
│   ├── content/games/
│   │   └── floaty-bird-reverse.md   # Floaty Bird Reverse content entry
│   ├── layouts/
│   │   └── BaseLayout.astro         # Shell with skip link, fonts & observer
│   ├── pages/
│   │   ├── [section].astro          # Dynamic handler for future sections
│   │   ├── 404.astro                # Classy not found page
│   │   ├── contact.astro            # Contact page
│   │   ├── index.astro              # Home page
│   │   └── games/
│   │       ├── index.astro          # Games catalog
│   │       └── [...slug].astro      # Rich dynamic game page template
│   ├── styles/
│   │   └── global.css               # Brand CSS variables & Tailwind v4 theme
│   └── content.config.ts            # Astro Content Collections schema
├── astro.config.mjs                 # Static Astro configuration
├── package.json
└── tsconfig.json
```
