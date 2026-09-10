// HeroSection - 100vh opening screen
// spec/REQUIREMENTS.md §FR-01, §5.1, §6.3
// Left: Yoshino standee + breathing float | Right: Dossier Card
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
      aria-label="Hồ sơ nhân vật Yoshino Himekawa"
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 55%, rgba(125,211,252,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 40% 40% at 70% 45%, rgba(110,231,183,0.04) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      {/* Content grid */}
      <div
        className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 py-12"
        style={{ zIndex: 2 }}
      >
        {/* ── Left: Standee ── */}
        <motion.div
          className="relative flex-shrink-0 flex items-center justify-center w-full md:w-auto"
          variants={standeeVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Soft glow ring behind image */}
          <div
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '360px',
              height: '360px',
              background:
                'radial-gradient(circle, rgba(125,211,252,0.13) 0%, rgba(110,231,183,0.06) 40%, transparent 70%)',
              filter: 'blur(32px)',
            }}
          />

          {/* Breathing float animation — FR-01 */}
          <motion.img
            src={yoshinoStandee}
            alt="Yoshino Himekawa — Spirit No. 02, The Hermit, trong Astral Dress Zadkiel Coat"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative select-none"
            style={{
              height: 'clamp(300px, 42vh, 520px)',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: 'drop-shadow(0 0 48px rgba(125,211,252,0.22))',
            }}
            draggable={false}
          />

          {/* TODO Sprint 2 note: swap hero.png with actual Yoshino transparent PNG */}
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 2 }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-mist)' }}
        >
          cuộn xuống
        </span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ color: 'var(--color-ice-blue)' }}>
          <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
