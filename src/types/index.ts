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
  platform?: 'pixiv' | 'twitter' | 'artstation' | 'official' | string;
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
  personalitySummary: string; // English summary (DEC-13)
  keyQuoteJp: string;         // Japanese original: 「私……誰も傷つけたくないんです……」 (DEC-13)
  keyQuoteEn: string;         // English subtitle: "I... don't want to hurt anyone..." (DEC-13)
  keyQuote?: string;          // Optional legacy fallback
}

// ---------------------
// Costume Types (DEC-18)
// ---------------------

export interface Costume {
  id: string;
  name: string;
  badge: string;
  description: string;
  imageUrl: string;
  accentColor?: string;
}

// ---------------------
// Archive / Data Types (DEC-17)
// ---------------------

export interface ArchiveRecord {
  id: string;
  tag: string;
  title: string;
  kanji?: string;
  subtitle: string;
  icon: string;
  description: string;
  details: { label: string; value: string }[];
  quote?: string;
}

// ---------------------
// Guestbook Types (DEC-19)
// ---------------------

export interface GuestbookEntry {
  id: string;
  authorName: string;
  message: string;
  createdAt: string;
  badgeIcon?: string;
}

// ---------------------
// Tour Types (Yoshinon)
// ---------------------

/** Finite state machine states for Yoshinon Tour Guide (FR-03) */
export type TourState = 'idle' | 'welcome' | 'touring' | 'completed' | 'dismissed';

export interface TourStep {
  id: number;
  title: string;
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
