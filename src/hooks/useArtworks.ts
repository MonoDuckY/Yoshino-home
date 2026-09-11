// src/hooks/useArtworks.ts — Hook to fetch artworks from Sanity CMS
// spec/REQUIREMENTS.md §FR-02, DEC-03
import { useState, useEffect } from 'react';
import type { Artwork } from '../types';
import { mockArtworks } from '../data/mockArtworks';
import { fetchArtworks, isSanityConfigured } from '../lib/sanity';

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>(mockArtworks);
  const [loading, setLoading] = useState<boolean>(isSanityConfigured);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(!isSanityConfigured);

  useEffect(() => {
    if (!isSanityConfigured) {
      return;
    }

    let isCancelled = false;

    fetchArtworks()
      .then((result) => {
        if (!isCancelled) {
          setArtworks(result.artworks);
          setIsFallback(result.isFallback);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setArtworks(mockArtworks);
          setIsFallback(true);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    artworks,
    loading,
    error,
    isFallback,
  };
}
