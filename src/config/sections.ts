/**
 * Site sections.
 *
 * - `enabled: true`  → the section gets a page, appears in the nav/footer and
 *                      its card on the home page links to it.
 * - `enabled: false` → no page is generated (the URL 404s), it is hidden from
 *                      the nav, and the home page shows it as "Coming soon".
 *
 * To launch Novels or Ebooks, flip `enabled` to true. See README.md.
 */
export interface Section {
  id: string;
  /** Label used in navigation. */
  label: string;
  /** URL path, e.g. '/games'. */
  href: string;
  enabled: boolean;
  /** Shown on the home page "What we make" row. */
  showInWhatWeMake: boolean;
  /** Short line for cards and page intros. */
  blurb: string;
  /** Eyebrow/intro text used on the generic section page. */
  intro?: string;
  icon: 'gamepad' | 'book' | 'tablet';
}

export const sections: Section[] = [
  {
    id: 'games',
    label: 'Games',
    href: '/games',
    enabled: true,
    showInWhatWeMake: true,
    blurb: 'Pocket-sized mobile games with simple controls and a gentle twist.',
    icon: 'gamepad',
  },
  {
    id: 'novels',
    label: 'Novels',
    href: '/novels',
    enabled: false,
    showInWhatWeMake: true,
    blurb: 'Long-form stories with a touch of wonder, written slowly and with care.',
    intro: 'Our first novels are being written. Check back soon, or get in touch to hear when they arrive.',
    icon: 'book',
  },
  {
    id: 'ebooks',
    label: 'Ebooks',
    href: '/ebooks',
    enabled: false,
    showInWhatWeMake: true,
    blurb: 'Beautifully typeset digital editions, ready for any reader.',
    intro: 'Digital editions are on the way. Check back soon, or get in touch to hear when they arrive.',
    icon: 'tablet',
  },
];

/** Sections with real pages. */
export const liveSections = sections.filter((s) => s.enabled);

/** Navigation = Home + live sections + Contact. */
export const navItems = [
  { label: 'Home', href: '/' },
  ...liveSections.map((s) => ({ label: s.label, href: s.href })),
  { label: 'Contact', href: '/contact' },
];

/** Sections other than games are rendered by the generic `src/pages/[section].astro` page. */
export const genericSectionIds = ['novels', 'ebooks'];
