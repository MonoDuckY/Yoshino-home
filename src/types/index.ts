// ─────────────────────────────────────────────
// Yoshino's Home — TypeScript Data Contracts
// Source of truth: spec/REQUIREMENTS.md §7.1
// ─────────────────────────────────────────────

// ---------------------
// Gallery Domain Types
// ---------------------

/** Domain entity — the actual category stored in CMS/DB. Never 'all'. */
export type ArtworkCategory = 'official' | 'fanart' | 'collab';

/** UI Filter State — 'all' means no filter applied (show everything). */
export type GalleryFilter = 'all' | ArtworkCategory;

export interface ArtistCredit {
  name: string;
  platform: 'pixiv' | 'twitter' | 'artstation' | 'official';
  handle?: string;    // e.g. "@tsunako_official"
  sourceUrl: string;
}

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;  // Never 'all'
  imageUrl: string;
  blurDataUrl?: string;       // From Sanity asset->metadata.lqip (auto, not manual)
  width: number;
  height: number;
  credit: ArtistCredit;
  publishedDate?: string;     // ISO date string "YYYY-MM-DD"
  curatorNote?: string;       // Personal note from curator — entered manually in Sanity Studio
}

// ---------------------
// Character Types
// ---------------------

export interface CharacterDossier {
  codename: string;           // "The Hermit"
  spiritNumber: string;       // "02"
  nameRomanized: string;      // "Himekawa Yoshino"
  nameKanji: string;          // "氷芽川 四糸乃"
  astralDress: string;        // "Zadkiel Coat"
  angelName: string;          // "Zadkiel"
  personalitySummary: string;
  keyQuote: string;           // Displayed in Dossier Card below stats, above CTAs (DEC-05)
}

// ---------------------
// Tour Types (Yoshinon)
// ---------------------

/** Finite state machine states for Yoshinon Tour Guide (FR-03) */
export type TourState = 'idle' | 'welcome' | 'touring' | 'completed' | 'dismissed';

export interface TourStep {
  id: number;
  targetId: string;  // DOM element ID to scroll to and highlight
  message: string;
}

// ---------------------
// Utility Helpers
// ---------------------

/** Filter artworks by gallery UI state (DEC-01) */
export const filterArtworks = (artworks: Artwork[], filter: GalleryFilter): Artwork[] => {
  if (filter === 'all') return artworks;
  return artworks.filter((art) => art.category === filter);
};
