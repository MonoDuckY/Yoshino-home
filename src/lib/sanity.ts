import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Artwork, ArtworkCategory, GuestbookEntry } from '../types';
import { mockArtworks, mockGuestbookEntries } from '../data/mockArtworks';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01';
const writeToken = import.meta.env.VITE_SANITY_WRITE_TOKEN;

export const isSanityConfigured = Boolean(projectId && projectId.trim() !== '');

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // set false so newly submitted wishes appear immediately without CDN edge cache delay
    })
  : null;

export const sanityWriteClient = isSanityConfigured && writeToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // write mutations must never use CDN
      token: writeToken,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

// Helper to generate optimized image URLs with Sanity CDN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder || !source) return '';
  return builder.image(source).auto('format').fit('max').url();
}

export interface SanityArtworkDoc {
  _id: string;
  _createdAt: string;
  title: string;
  category: ArtworkCategory;
  imageUrl?: string;
  blurDataUrl?: string;
  width?: number;
  height?: number;
  artistName: string;
  sourceUrl: string;
  curatorNote?: string;
}

export interface SanityGuestbookDoc {
  _id: string;
  _createdAt: string;
  authorName: string;
  message: string;
  badgeIcon?: string;
  approved?: boolean;
  createdAt?: string;
}

/** Infer platform automatically from source URL */
function inferPlatform(url: string): 'pixiv' | 'twitter' | 'artstation' | 'official' {
  if (!url) return 'official';
  const lower = url.toLowerCase();
  if (lower.includes('pixiv.net')) return 'pixiv';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter';
  if (lower.includes('artstation.com')) return 'artstation';
  return 'official';
}

const ARTWORKS_QUERY = `*[_type == "artwork"] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
  category,
  "imageUrl": image.asset->url,
  "blurDataUrl": image.asset->metadata.lqip,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  artistName,
  sourceUrl,
  curatorNote
}`;

const GUESTBOOK_QUERY = `*[_type == "guestbook" && approved != false] | order(coalesce(createdAt, _createdAt) desc) {
  _id,
  _createdAt,
  authorName,
  message,
  badgeIcon,
  approved,
  createdAt
}`;

/**
 * Fetch artworks from Sanity CMS with graceful fallback to mockArtworks
 */
export async function fetchArtworks(): Promise<{ artworks: Artwork[]; isFallback: boolean }> {
  if (!sanityClient || !isSanityConfigured) {
    console.info('[Sanity] VITE_SANITY_PROJECT_ID not configured. Using mockArtworks data.');
    return { artworks: mockArtworks, isFallback: true };
  }

  try {
    const rawDocs = await sanityClient.fetch<SanityArtworkDoc[]>(ARTWORKS_QUERY);

    if (!rawDocs || rawDocs.length === 0) {
      console.warn('[Sanity] No artworks found in Sanity dataset. Falling back to mockArtworks.');
      return { artworks: mockArtworks, isFallback: true };
    }

    const mappedArtworks: Artwork[] = rawDocs.map((doc) => ({
      id: doc._id,
      title: doc.title,
      category: doc.category,
      imageUrl: doc.imageUrl || 'https://placehold.co/400x560/0B1325/7DD3FC?text=Art',
      blurDataUrl: doc.blurDataUrl,
      width: doc.width || 400,
      height: doc.height || 560,
      credit: {
        name: doc.artistName,
        platform: inferPlatform(doc.sourceUrl),
        sourceUrl: doc.sourceUrl,
      },
      curatorNote: doc.curatorNote,
    }));

    return { artworks: mappedArtworks, isFallback: false };
  } catch (error) {
    console.error('[Sanity] Failed to fetch artworks from Sanity:', error);
    console.info('[Sanity] Graceful fallback activated: serving mockArtworks.');
    return { artworks: mockArtworks, isFallback: true };
  }
}

/**
 * Fetch guestbook entries from Sanity CMS with graceful fallback to mockGuestbookEntries
 */
export async function fetchGuestbookEntries(): Promise<{ entries: GuestbookEntry[]; isFallback: boolean }> {
  if (!sanityClient || !isSanityConfigured) {
    console.info('[Sanity] VITE_SANITY_PROJECT_ID not configured. Using mockGuestbookEntries.');
    return { entries: mockGuestbookEntries, isFallback: true };
  }

  try {
    const rawDocs = await sanityClient.fetch<SanityGuestbookDoc[]>(GUESTBOOK_QUERY);

    if (!rawDocs || rawDocs.length === 0) {
      console.warn('[Sanity] No guestbook entries found in Sanity dataset. Falling back to mockGuestbookEntries.');
      return { entries: mockGuestbookEntries, isFallback: true };
    }

    const mappedEntries: GuestbookEntry[] = rawDocs.map((doc) => ({
      id: doc._id,
      authorName: doc.authorName,
      message: doc.message,
      createdAt: (doc.createdAt || doc._createdAt || new Date().toISOString()).split('T')[0],
      badgeIcon: doc.badgeIcon || '❄️',
    }));

    return { entries: mappedEntries, isFallback: false };
  } catch (error) {
    console.error('[Sanity] Failed to fetch guestbook entries from Sanity:', error);
    console.info('[Sanity] Graceful fallback activated: serving mockGuestbookEntries.');
    return { entries: mockGuestbookEntries, isFallback: true };
  }
}

/**
 * Create a new guestbook entry in Sanity CMS
 */
export async function createGuestbookEntry(entry: {
  authorName: string;
  message: string;
  badgeIcon: string;
}): Promise<GuestbookEntry> {
  if (!sanityWriteClient) {
    console.info('[Sanity] No write client available (missing VITE_SANITY_WRITE_TOKEN). Entry saved locally.');
    return {
      id: `gb-local-${Date.now()}`,
      authorName: entry.authorName,
      message: entry.message,
      badgeIcon: entry.badgeIcon,
      createdAt: new Date().toISOString().split('T')[0],
    };
  }

  const doc = await sanityWriteClient.create({
    _type: 'guestbook',
    authorName: entry.authorName,
    message: entry.message,
    badgeIcon: entry.badgeIcon,
    approved: true,
    createdAt: new Date().toISOString(),
  });

  return {
    id: doc._id,
    authorName: doc.authorName,
    message: doc.message,
    badgeIcon: doc.badgeIcon,
    createdAt: (doc.createdAt || doc._createdAt).split('T')[0],
  };
}

