// src/hooks/useGuestbook.ts — Hook to fetch and manage Guestbook entries from Sanity CMS
// spec/REQUIREMENTS.md §FR-06, DEC-19
import { useState, useEffect, useCallback } from 'react';
import type { GuestbookEntry } from '../types';
import { mockGuestbookEntries } from '../data/mockArtworks';
import { fetchGuestbookEntries, createGuestbookEntry, isSanityConfigured } from '../lib/sanity';

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(mockGuestbookEntries);
  const [loading, setLoading] = useState<boolean>(isSanityConfigured);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(!isSanityConfigured);

  useEffect(() => {
    if (!isSanityConfigured) return;

    let isCancelled = false;

    fetchGuestbookEntries()
      .then((res) => {
        if (!isCancelled) {
          setEntries(res.entries);
          setIsFallback(res.isFallback);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setEntries(mockGuestbookEntries);
          setIsFallback(true);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const postEntry = useCallback(
    async (entryData: { authorName: string; message: string; badgeIcon: string }) => {
      const optimisticEntry: GuestbookEntry = {
        id: `gb-opt-${Date.now()}`,
        authorName: entryData.authorName,
        message: entryData.message,
        badgeIcon: entryData.badgeIcon,
        createdAt: new Date().toISOString().split('T')[0],
      };

      // Optimistically prepend to list immediately
      setEntries((prev) => [optimisticEntry, ...prev]);

      try {
        const savedDoc = await createGuestbookEntry(entryData);
        // Replace optimistic entry with the real document from Sanity
        setEntries((prev) => prev.map((item) => (item.id === optimisticEntry.id ? savedDoc : item)));
        return savedDoc;
      } catch (err) {
        console.error('[Sanity] Error submitting guestbook entry:', err);
        return optimisticEntry;
      }
    },
    []
  );

  return {
    entries,
    loading,
    error,
    isFallback,
    postEntry,
  };
}
