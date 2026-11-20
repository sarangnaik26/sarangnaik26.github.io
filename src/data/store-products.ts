/**
 * Fairyprisme Store: product list (the single source of truth).
 *
 * To add a product:
 *   1. Drop its cover image into `public/assets/ebook/` (e.g. `my-new-ebook.jpg`).
 *   2. Add one entry below. Cards are generated automatically from this list,
 *      so no HTML needs to change.
 *
 * Fields
 *   id     – unique, lowercase, dash-separated (used for HTML ids).
 *   name   – shown under the cover.
 *   status – 'active' (green "More Details" button, "Active" tab) or
 *            'coming-soon' (blue button, "Coming Soon" tab).
 *   image  – path inside `public/`, starting with `assets/ebook/`.
 *            If the file is missing, a neutral placeholder is shown instead.
 *   link   – the product's Superprofile page (opens in the same tab).
 *
 * Products appear in the order they are listed here.
 */

export type ProductStatus = 'active' | 'coming-soon';

export interface StoreProduct {
  id: string;
  name: string;
  status: ProductStatus;
  image: string;
  link: string;
}

export const products: StoreProduct[] = [
  // ── Active ────────────────────────────────────────────────────────────
  {
    id: 'the-goan-compass',
    name: 'The Goan Compass',
    status: 'active',
    image: 'assets/ebook/the-goan-compass.jpg',
    link: 'https://superprofile.bio/vp/the-goan-compass',
  },
  {
    id: '50-quick-veg-tiffin-recipes',
    name: '50 Quick Veg Tiffin Recipes for School Kids',
    status: 'active',
    image: 'assets/ebook/50-quick-veg-tiffin-recipes.jpg',
    link: 'https://superprofile.bio/vp/50-quick-veg-tiffin-recipes-for-school-kids',
  },
  {
    id: 'the-hairstyle-atlas',
    name: 'The Hairstyle Atlas',
    status: 'active',
    image: 'assets/ebook/the-hairstyle-atlas.jpg',
    link: 'https://superprofile.bio/vp/the-hairstyle-atlas',
  },

  // ── Coming soon ───────────────────────────────────────────────────────
  {
    id: 'radha-krishna-chronicles',
    name: 'Radha Krishna Chronicles',
    status: 'coming-soon',
    image: 'assets/ebook/radha-krishna-chronicles.jpg',
    link: 'https://superprofile.bio/vp/radha-krishna-chronicles',
  },
  {
    id: '50-quick-non-veg-tiffin-recipes',
    name: '50 Quick Non-Veg Tiffin Recipes for School Kids',
    status: 'coming-soon',
    image: 'assets/ebook/50-quick-non-veg-tiffin-recipes.jpg',
    link: 'https://superprofile.bio/vp/50-quick-non-veg-tiffin-recipes-for-school-kids',
  },
  {
    id: '100-quick-veg-and-non-veg-tiffin-recipes',
    name: '100 Quick Veg and Non-Veg Tiffin Recipes',
    status: 'coming-soon',
    image: 'assets/ebook/100-quick-veg-and-non-veg-tiffin-recipes.jpg',
    link: 'https://superprofile.bio/vp/100-quick-veg-and-non-veg-tiffin-recipes',
  },
];

/** Store social links (shown in the store footer). */
export const storeSocials = [
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/fairyprisme?bqrl=Z2VvcXF0ajR3MHRl',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/share/1E7aLYQ9Lp/',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Channel',
    url: 'https://whatsapp.com/channel/0029Vb9M8du9Gv7VM9cXG533',
  },
] as const;
