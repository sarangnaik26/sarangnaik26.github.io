import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Games — one Markdown file per game in `src/content/games/`.
 * The Markdown body is the long "About" text on the game page.
 * Images live next to the file (or in src/assets) and are referenced relatively.
 */
const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One-line hook used on cards and as the page subtitle. */
      tagline: z.string(),
      /** ~150 characters – used for cards and the meta description. */
      summary: z.string().max(200),
      status: z.enum(['live', 'coming-soon']).default('live'),
      featured: z.boolean().default(false),
      /** Lower numbers appear first. */
      order: z.number().default(100),
      icon: image(),
      iconAlt: z.string(),
      /** Card / hero image. Falls back to the first screenshot. */
      cover: image().optional(),
      screenshots: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),
      genre: z.string(),
      contentRating: z.string(),
      containsAds: z.boolean().default(false),
      inAppPurchases: z.boolean().default(false),
      platforms: z.array(z.enum(['Android', 'iOS', 'Web', 'Windows', 'macOS'])).min(1),
      price: z.string().default('Free'),
      stores: z
        .object({
          googlePlay: z.url().optional(),
          appStore: z.url().optional(),
        })
        .default({}),
      packageId: z.string().optional(),
      details: z.object({
        version: z.string(),
        updated: z.coerce.date(),
        requires: z.string().optional(),
        developer: z.string().default('FairyPrisme'),
      }),
      links: z
        .object({
          guide: z.url().optional(),
          privacy: z.url().optional(),
        })
        .default({}),
      modes: z.array(z.object({ name: z.string(), description: z.string() })).default([]),
      features: z.array(z.string()).default([]),
      howToPlay: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      unlockables: z
        .object({
          title: z.string().default('Unlockable birds'),
          intro: z.string(),
          items: z.array(z.object({ name: z.string(), description: z.string() })),
          note: z.string().optional(),
        })
        .optional(),
      adsNote: z.string().optional(),
    }),
});

export const collections = { games };
