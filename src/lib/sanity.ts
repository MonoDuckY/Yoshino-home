// src/lib/sanity.ts — Sanity CMS Client & Fetch Service
// spec/REQUIREMENTS.md §FR-02, §7.2, DEC-02, DEC-03
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Artwork, ArtworkCategory } from '../types';
import { mockArtworks } from '../data/mockArtworks';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01';

export const isSanityConfigured = Boolean(projectId && projectId.trim() !== '');

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
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
  title: string;
  category: ArtworkCategory;
  imageUrl?: string;
  blurDataUrl?: string;
  width?: number;
  height?: number;
  artistName: string;
  artistHandle?: string;
  platform: 'official' | 'pixiv' | 'twitter' | 'artstation';
  sourceUrl: string;
  publishedDate?: string;
  curatorNote?: string;
}

const ARTWORKS_QUERY = `*[_type == "artwork"] | order(publishedDate desc) {
  _id,
  title,
  category,
  "imageUrl": image.asset->url,
  "blurDataUrl": image.asset->metadata.lqip,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  artistName,
  artistHandle,
  platform,
  sourceUrl,
  publishedDate,
  curatorNote
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
        platform: doc.platform,
        handle: doc.artistHandle,
        sourceUrl: doc.sourceUrl,
      },
      publishedDate: doc.publishedDate,
      curatorNote: doc.curatorNote,
    }));

    return { artworks: mappedArtworks, isFallback: false };
  } catch (error) {
    console.error('[Sanity] Failed to fetch artworks from Sanity:', error);
    console.info('[Sanity] Graceful fallback activated: serving mockArtworks.');
    return { artworks: mockArtworks, isFallback: true };
  }
}
