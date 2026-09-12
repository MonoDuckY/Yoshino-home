// useTourGuide.ts — Yoshinon Tour Guide FSM Hook
// spec/REQUIREMENTS.md §FR-03, §2.2 US-04, DEC-06
import { useState, useEffect, useCallback, useRef } from 'react';
import type { TourState, TourStep } from '../types';

export const TOUR_STEPS: TourStep[] = [
  {
    id: 0,
    title: "Welcome to Yoshino's Home",
    targetId: 'hero',
    message:
      "Yahoo! I'm Yoshinon, Yoshino's best friend! Welcome to our cozy winter room. Yoshino is Spirit No. 02 — The Hermit. She's gentle, kind, and loves peaceful days!",
  },
  {
    id: 1,
    title: 'Wardrobe & Outfits',
    targetId: 'hero-wardrobe',
    message:
      "Take a look here! You can switch Yoshino's attire between her iconic Zadkiel Coat Astral Dress, cozy Winter Casual knit, and Raizen High uniform!",
  },
  {
    id: 2,
    title: 'Spirit Chronicle & Lore',
    targetId: 'data',
    message:
      "Down here is the Ratatoskr Archive Dossier! Discover Yoshino's origins, physical traits, her sub-zero angel Zadkiel, and of course, yours truly — Yoshinon!",
  },
  {
    id: 3,
    title: 'The Gallery Wall',
    targetId: 'gallery',
    message:
      "Down here is our curated art gallery! You can filter artworks across Official Art, Community Fanart, or Collaborations. Hover on any card to view original source and artist details!",
  },
  {
    id: 4,
    title: 'Winter Hearth Wishes',
    targetId: 'guestbook',
    message:
      "Warm your hands by our guestbook hearth! You can leave a sweet note and a stamp for Yoshino to keep her cozy through the winter chill!",
  },
  {
    id: 5,
    title: 'Enjoy Your Sanctuary!',
    targetId: 'footer',
    message:
      "That wraps up our tour! Relax and enjoy the soft falling snow. Feel free to call me anytime whenever you need a companion!",
  },
];

const STORAGE_KEY = 'yoshino_tour_seen';

export function useTourGuide() {
  const [tourState, setTourState] = useState<TourState>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const highlightedElRef = useRef<HTMLElement | null>(null);

  // Clear highlight helper
  const clearHighlight = useCallback(() => {
    if (highlightedElRef.current) {
      highlightedElRef.current.classList.remove('tour-highlight-target');
      highlightedElRef.current = null;
    }
  }, []);

  // 2-second initial auto-trigger (US-04)
  useEffect(() => {
    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    if (hasSeen) return;

    const timer = setTimeout(() => {
      setTourState((prev) => (prev === 'idle' ? 'welcome' : prev));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle highlight & smooth scroll when touring
  useEffect(() => {
    if (tourState !== 'touring') {
      clearHighlight();
      return;
    }

    const step = TOUR_STEPS[currentStepIndex];
    if (!step) return;

    clearHighlight();

    // Small delay to allow layout/render settling
    const timer = setTimeout(() => {
      const el = document.getElementById(step.targetId);
      if (el) {
        el.classList.add('tour-highlight-target');
        highlightedElRef.current = el;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearHighlight();
    };
  }, [tourState, currentStepIndex, clearHighlight]);

  const openWelcome = useCallback(() => {
    clearHighlight();
    setTourState('welcome');
  }, [clearHighlight]);

  const startTour = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setCurrentStepIndex(0);
    setTourState('touring');
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      clearHighlight();
      setTourState('completed');
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
  }, [currentStepIndex, clearHighlight]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const dismissTour = useCallback(() => {
    clearHighlight();
    setTourState('dismissed');
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }, [clearHighlight]);

  const completeTour = useCallback(() => {
    clearHighlight();
    setTourState('completed');
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }, [clearHighlight]);

  return {
    tourState,
    currentStep: TOUR_STEPS[currentStepIndex],
    currentStepIndex,
    totalSteps: TOUR_STEPS.length,
    openWelcome,
    startTour,
    nextStep,
    prevStep,
    dismissTour,
    completeTour,
  };
}
