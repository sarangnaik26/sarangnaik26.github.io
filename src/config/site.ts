/**
 * Global brand settings.
 * Social links: fill in a URL to show that icon in the header/footer/contact page.
 * Leave a value as an empty string ('') to hide it.
 */
export const site = {
  name: 'FairyPrisme',
  tagline: 'Small worlds, crafted with quiet magic.',
  description:
    'FairyPrisme is a small independent studio crafting elegant mobile games and apps, with novels and ebooks on the horizon.',
  email: 'fairyprisme@gmail.com',
  locale: 'en',
  /** Default social share image (in /public). */
  ogImage: '/og-default.png',
  /** Privacy policy shown in the footer. */
  privacyUrl: 'https://sarangnaik26.github.io/FairyPrisme-docs/Privacy-Policy/Game/FloatyBirdReverse/',
  foundedYear: 2026,
} as const;

export type SocialKey = 'instagram' | 'x' | 'youtube' | 'tiktok' | 'threads' | 'facebook' | 'discord' | 'github' | 'googlePlay';

export interface SocialLink {
  key: SocialKey;
  label: string;
  url: string;
}

/** TODO: replace the empty strings with your real profile URLs. */
const socialConfig: SocialLink[] = [
  { key: 'googlePlay', label: 'Google Play', url: '' },
  { key: 'instagram', label: 'Instagram', url: '' },
  { key: 'x', label: 'X (Twitter)', url: '' },
  { key: 'youtube', label: 'YouTube', url: '' },
  { key: 'tiktok', label: 'TikTok', url: '' },
  { key: 'threads', label: 'Threads', url: '' },
  { key: 'facebook', label: 'Facebook', url: '' },
  { key: 'discord', label: 'Discord', url: '' },
  { key: 'github', label: 'GitHub', url: '' },
];

/** Only socials with a URL are rendered anywhere on the site. */
export const socials = socialConfig.filter((s) => s.url.trim().length > 0);
