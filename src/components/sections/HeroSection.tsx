// HeroSection — 100vh opening screen
// DEC-07: English | DEC-09: Light theme | spec/REQUIREMENTS.md §FR-01, §5.1
import { motion } from 'framer-motion';
import { DossierCard } from '../ui/DossierCard';
import { characterDossier } from '../../data/mockArtworks';
import yoshinoStandee from '../../assets/hero.png';

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
        {/* ── Left: Standee ── */}
        <motion.div
          className="relative flex-shrink-0 flex items-center justify-center w-full md:w-auto"
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
              background:
                'radial-gradient(circle, rgba(59,157,210,0.10) 0%, rgba(16,184,126,0.05) 40%, transparent 70%)',
              filter: 'blur(36px)',
            }}
          />

          {/* Breathing float — FR-01 */}
          <motion.img
            src={yoshinoStandee}
            alt="Yoshino Himekawa — Spirit No. 02, The Hermit, wearing the Zadkiel Coat Astral Dress"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative select-none"
            style={{
              height: 'clamp(300px, 44vh, 540px)',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: 'drop-shadow(0 8px 32px rgba(59,157,210,0.18)) drop-shadow(0 2px 8px rgba(30,55,110,0.12))',
            }}
            draggable={false}
          />
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
