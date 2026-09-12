// ─────────────────────────────────────────────
// Mock Artwork Data — Sprint 1 & 2
// Strategy: Mock Data First (DEC-03)
// Replace with Sanity client.fetch() in Sprint 3
// ─────────────────────────────────────────────
import type { Artwork, CharacterDossier } from '../types';

export const mockArtworks: Artwork[] = [
  {
    id: 'aw-001',
    title: 'Winter Spirit',
    category: 'official',
    imageUrl: 'https://placehold.co/450x600/0B1325/7DD3FC?text=Official+Art+1+(3:4)',
    width: 450,
    height: 600,
    credit: {
      name: 'Tsunako',
      platform: 'official',
      handle: '@tsunako_official',
      sourceUrl: 'https://twitter.com',
    },
    publishedDate: '2024-01-15',
    curatorNote: 'Light Novel Volume 1 color illustration — the poignant first moment Shido meets Yoshino in the pouring rain.',
  },
  {
    id: 'aw-002',
    title: 'Zadkiel\'s Embrace',
    category: 'official',
    imageUrl: 'https://placehold.co/640x360/0B1325/7DD3FC?text=Official+Art+2+(16:9)',
    width: 640,
    height: 360,
    credit: {
      name: 'Tsunako',
      platform: 'official',
      sourceUrl: 'https://twitter.com',
    },
    publishedDate: '2024-03-20',
    curatorNote: 'Wide-angle key visual of the frozen wonderland, with Zadkiel unfurling majestic ice wings.',
  },
  {
    id: 'aw-003',
    title: 'Snowflakes Whisper',
    category: 'fanart',
    imageUrl: 'https://placehold.co/640x480/0B1325/6EE7B7?text=Fanart+1+(4:3)',
    width: 640,
    height: 480,
    credit: {
      name: 'Haruki_Art',
      platform: 'pixiv',
      handle: '@haruki_art',
      sourceUrl: 'https://pixiv.net',
    },
    publishedDate: '2024-05-10',
    curatorNote: 'Delicate pastel tones — the artist gracefully wove miniature snowflakes into the rabbit hoodie.',
  },
  {
    id: 'aw-004',
    title: 'Blue Rabbit Dream',
    category: 'fanart',
    imageUrl: 'https://placehold.co/450x800/0B1325/6EE7B7?text=Fanart+2+(9:16)',
    width: 450,
    height: 800,
    credit: {
      name: 'neko_draws',
      platform: 'twitter',
      handle: '@neko_draws',
      sourceUrl: 'https://x.com',
    },
    publishedDate: '2024-07-02',
    curatorNote: 'Vertical phone wallpaper — Yoshino gently clutching Yoshinon beneath glistening frosted boughs.',
  },
  {
    id: 'aw-005',
    title: 'Compile♥ Summer Collab',
    category: 'collab',
    imageUrl: 'https://placehold.co/500x500/0B1325/94A3B8?text=Collab+1+(1:1)',
    width: 500,
    height: 500,
    credit: {
      name: 'Compile Heart',
      platform: 'official',
      sourceUrl: 'https://www.compileheart.com',
    },
    publishedDate: '2024-06-15',
    curatorNote: 'Neptunia crossover celebration event — limited edition Astral Dress collaboration skin.',
  },
  {
    id: 'aw-006',
    title: 'Yoshino\'s Tea Time',
    category: 'fanart',
    imageUrl: 'https://placehold.co/450x600/0B1325/6EE7B7?text=Fanart+3+(3:4)',
    width: 450,
    height: 600,
    credit: {
      name: 'winterpetal',
      platform: 'pixiv',
      handle: '@winterpetal_art',
      sourceUrl: 'https://pixiv.net',
    },
    publishedDate: '2024-08-18',
  },
  {
    id: 'aw-007',
    title: 'Café Pop-up Promo',
    category: 'collab',
    imageUrl: 'https://placehold.co/640x400/0B1325/94A3B8?text=Collab+2+(16:10)',
    width: 640,
    height: 400,
    credit: {
      name: 'Kadokawa × animate café',
      platform: 'official',
      sourceUrl: 'https://kadokawa.co.jp',
    },
    publishedDate: '2023-12-01',
    curatorNote: 'Winter 2023 animate Café pop-up collaboration artwork under Kadokawa copyright.',
  },
  {
    id: 'aw-008',
    title: 'Frozen Puppet Dance',
    category: 'fanart',
    imageUrl: 'https://placehold.co/400x600/0B1325/6EE7B7?text=Fanart+4+(2:3)',
    width: 400,
    height: 600,
    credit: {
      name: 'icecrystal_art',
      platform: 'twitter',
      handle: '@icecrystal_art',
      sourceUrl: 'https://x.com',
    },
    publishedDate: '2024-09-05',
  },
];

// ─────────────────────────────────────────────
// Character Dossier — Static data (FR-01, DEC-13)
// ─────────────────────────────────────────────
export const characterDossier: CharacterDossier = {
  codename: 'The Hermit',
  spiritNumber: '02',
  nameRomanized: 'Himekawa Yoshino',
  nameKanji: '氷芽川 四糸乃',
  astralDress: 'Zadkiel Coat',
  angelName: 'Zadkiel',
  personalitySummary: 'Shy, gentle, and deeply caring — yet wielding the absolute power of freezing ice.',
  keyQuoteJp: '私……誰も傷つけたくないんです……',
  keyQuoteEn: "I... don't want to hurt anyone...",
  keyQuote: "I... don't want to hurt anyone...",
};
