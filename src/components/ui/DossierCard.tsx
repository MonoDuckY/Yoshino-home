// DossierCard — Glassmorphism character info card
// DEC-07: English UI | DEC-08: Spacious layout | DEC-09: Light theme
// spec/REQUIREMENTS.md §FR-01, §6.3, DEC-05
import { motion } from 'framer-motion';
import type { CharacterDossier } from '../../types';

interface DossierCardProps {
  dossier: CharacterDossier;
  onExploreGallery: () => void;
  onCallYoshinon: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const, delay: 0.3 },
  },
};

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function DossierCard({ dossier, onExploreGallery, onCallYoshinon }: DossierCardProps) {
  return (
    <motion.div
      id="dossier-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      // DEC-08: p-10 md:p-12 | max-w-lg for breathing room
      className="relative rounded-2xl p-10 md:p-12 w-full max-w-lg"
      style={{
        backgroundColor: 'var(--color-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow:
          '0 4px 6px rgba(30,55,110,0.04), 0 16px 48px rgba(30,55,110,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* Spirit classification tag */}
      <motion.div variants={itemVariants} className="mb-6">
        <span
          className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-ice-blue)',
            backgroundColor: 'rgba(59, 157, 210, 0.08)',
            border: '1px solid rgba(59, 157, 210, 0.25)',
          }}
        >
          Spirit No.{dossier.spiritNumber} &bull; {dossier.codename}
        </span>
      </motion.div>

      {/* Name — Display Serif */}
      <motion.div variants={itemVariants} className="mb-2">
        <h1
          className="text-4xl md:text-5xl font-bold uppercase leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.1em',
          }}
        >
          {dossier.nameRomanized.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h1>
      </motion.div>

      {/* Kanji subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-lg mb-8"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.06em',
        }}
      >
        {dossier.nameKanji}
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={itemVariants}
        className="mb-7"
        style={{
          height: '1px',
          background:
            'linear-gradient(to right, rgba(59,157,210,0.35), rgba(59,157,210,0.05))',
        }}
      />

      {/* Stats grid — 2×2 */}
      <motion.dl
        variants={staggerChildren}
        className="grid grid-cols-2 gap-x-8 gap-y-5 mb-7"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <dt
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ice-blue)' }}
          >
            ✦ Astral Dress
          </dt>
          <dd
            className="text-sm font-medium"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}
          >
            {dossier.astralDress}
          </dd>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <dt
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ice-blue)' }}
          >
            ❅ Angel
          </dt>
          <dd
            className="text-sm font-medium"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}
          >
            {dossier.angelName}
          </dd>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-1.5 col-span-2">
          <dt
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ice-blue)' }}
          >
            ♡ Personality
          </dt>
          <dd
            className="text-sm font-medium leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}
          >
            {dossier.personalitySummary}
          </dd>
        </motion.div>
      </motion.dl>

      {/* keyQuote — DEC-05: italic serif, border-left ice-blue, above CTAs */}
      <motion.blockquote
        variants={itemVariants}
        className="mb-9 pl-4"
        style={{ borderLeft: '2px solid rgba(59, 157, 210, 0.4)' }}
      >
        <p
          style={{
            fontFamily: 'Georgia, "Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            lineHeight: '1.65',
            color: 'var(--color-ice-blue)',
            letterSpacing: '0.01em',
          }}
        >
          &ldquo;{dossier.keyQuote}&rdquo;
        </p>
      </motion.blockquote>

      {/* CTA buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {/* Primary — yoshino-green */}
        <button
          onClick={onExploreGallery}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: 'var(--color-yoshino-green)',
            color: '#ffffff',
            border: '1px solid var(--color-yoshino-green)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(16,184,126,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Explore Gallery ↓
        </button>

        {/* Secondary — ice blue ghost */}
        <button
          onClick={onCallYoshinon}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-ice-blue)';
            e.currentTarget.style.color = 'var(--color-ice-blue)';
            e.currentTarget.style.backgroundColor = 'rgba(59,157,210,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.color = 'var(--color-text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          🐰 Ask Yoshinon
        </button>
      </motion.div>
    </motion.div>
  );
}
