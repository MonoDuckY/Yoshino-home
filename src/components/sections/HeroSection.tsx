// HeroSection — 100vh opening screen
// DEC-07: English | DEC-09: Light theme | DEC-14: WebP standee for LCP < 2.0s | spec/REQUIREMENTS.md §FR-01, §5.1
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DossierCard } from '../ui/DossierCard';
import { characterDossier, mockCostumes } from '../../data/mockArtworks';

interface HeroSectionProps {
  onCallYoshinon: () => void;
}

const scrollToGallery = () => {
  const el = document.querySelector('#gallery');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const standeeVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export function HeroSection({ onCallYoshinon }: HeroSectionProps) {
  const [selectedCostumeId, setSelectedCostumeId] = useState<string>(mockCostumes[0].id);
  const activeCostume = mockCostumes.find((c) => c.id === selectedCostumeId) || mockCostumes[0];

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen w-full overflow-hidden"
      style={{ paddingTop: 'var(--spacing-navbar)' }}
      aria-label="Character profile — Yoshino Himekawa"
    >
      {/* Warm winter daylight ambient gradient — DEC-09 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 25% 60%, rgba(59,157,210,0.07) 0%, transparent 65%),' +
            'radial-gradient(ellipse 40% 40% at 75% 40%, rgba(16,184,126,0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(253,246,236,0.6) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Content grid */}
      <div
        className="relative w-full max-w-7xl mx-auto px-8 md:px-14 lg:px-20 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24 py-16"
        style={{ zIndex: 2 }}
      >
        {/* ── Left: Standee & Costume Switcher ── */}
        <motion.div
          className="relative flex-shrink-0 flex flex-col items-center justify-center w-full md:w-auto"
          variants={standeeVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Soft glow ring — adapted for light bg */}
          <div
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '380px',
              height: '380px',
              top: '15%',
              background:
                'radial-gradient(circle, rgba(59,157,210,0.12) 0%, rgba(16,184,126,0.06) 40%, transparent 70%)',
              filter: 'blur(36px)',
            }}
          />

          {/* Breathing float — FR-01
              overflow-hidden crops the DATE A LIVE V logo at bottom */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCostume.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative select-none overflow-hidden"
                style={{
                  height: 'clamp(380px, 58vh, 620px)',
                  width: 'auto',
                  maxWidth: '380px',
                }}
              >
                <img
                  src={activeCostume.imageUrl}
                  alt={`Yoshino Himekawa — ${activeCostume.name}`}
                  width={800}
                  height={1608}
                  fetchPriority="high"
                  style={{
                    height: '125%',           /* push logo ~25% below the clip boundary */
                    width: 'auto',
                    maxWidth: 'none',
                    objectFit: 'contain',
                    objectPosition: 'top center',
                    filter: 'drop-shadow(0 8px 40px rgba(59,157,210,0.18)) drop-shadow(0 2px 12px rgba(30,55,110,0.10))',
                    display: 'block',
                  }}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Costume Switcher Selector (DEC-18) ── */}
          <div
            id="hero-wardrobe"
            className="mt-4 flex flex-col items-center gap-2.5 z-10 w-full max-w-sm"
          >
            <div
              className="flex items-center gap-1.5 p-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(59, 157, 210, 0.2)',
                boxShadow: '0 4px 16px rgba(30, 55, 110, 0.06)',
              }}
              role="tablist"
              aria-label="Costume wardrobe selector"
            >
              {mockCostumes.map((costume) => {
                const isActive = costume.id === selectedCostumeId;
                return (
                  <button
                    key={costume.id}
                    onClick={() => setSelectedCostumeId(costume.id)}
                    role="tab"
                    aria-selected={isActive}
                    className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: isActive
                        ? '#ffffff'
                        : 'var(--color-text-secondary)',
                      backgroundColor: isActive
                        ? 'var(--color-yoshino-green)'
                        : 'transparent',
                      boxShadow: isActive
                        ? '0 2px 10px rgba(16, 184, 126, 0.35)'
                        : 'none',
                    }}
                  >
                    {costume.badge}
                  </button>
                );
              })}
            </div>

            {/* Active costume caption */}
            <p
              className="text-[11px] text-center font-medium tracking-wide max-w-xs px-2"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span className="font-bold text-[var(--color-ice-blue)]">
                {activeCostume.name}:
              </span>{' '}
              {activeCostume.description}
            </p>
          </div>
        </motion.div>

        {/* ── Right: Dossier Card ── */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <DossierCard
            dossier={characterDossier}
            onExploreGallery={scrollToGallery}
            onCallYoshinon={onCallYoshinon}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 2 }}
      >
        <span
          className="text-xs tracking-[0.25em] uppercase font-medium"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-secondary)',
          }}
        >
          scroll down
        </span>
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          style={{ color: 'var(--color-ice-blue)' }}
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
