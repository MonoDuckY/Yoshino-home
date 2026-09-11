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
    title: 'Character Profile',
    targetId: 'dossier-card',
    message:
      "Here is her official Spirit profile! Her Astral Dress is the Zadkiel Coat, and her Angel is Zadkiel — a giant icy puppet who protects her from any danger!",
  },
  {
    id: 2,
    title: 'The Gallery Wall',
    targetId: 'gallery',
    message:
      "Down here is our curated art gallery! You can filter artworks by Official Art, Community Fanart, or Collaborations. Hover on any card to view the original source!",
  },
  {
    id: 3,
    title: 'Enjoy Your Stay!',
    targetId: 'footer',
    message:
      "That's all for the tour! Feel free to explore and enjoy the falling snow. You can call me anytime by clicking 'Ask Yoshinon' or tapping my icon below!",
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
