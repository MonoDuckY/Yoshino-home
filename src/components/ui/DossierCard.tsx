// DossierCard - Glassmorphism character info card
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
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function DossierCard({ dossier, onExploreGallery, onCallYoshinon }: DossierCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative rounded-2xl p-7 md:p-9 w-full max-w-md"
      style={{
        backgroundColor: 'var(--color-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(125, 211, 252, 0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Spirit tag */}
      <motion.div variants={itemVariants} className="mb-4">
        <span
          className="inline-block text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1 rounded-full"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-ice-blue)',
            backgroundColor: 'rgba(125, 211, 252, 0.1)',
            border: '1px solid rgba(125, 211, 252, 0.25)',
          }}
        >
          Spirit No.{dossier.spiritNumber} &bull; {dossier.codename}
        </span>
      </motion.div>

      {/* Name */}
      <motion.div variants={itemVariants} className="mb-1">
        <h1
          className="text-3xl md:text-4xl font-bold tracking-[0.15em] leading-tight uppercase"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-snow)' }}
        >
          {dossier.nameRomanized.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h1>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-base mb-6"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-mist)', letterSpacing: '0.05em' }}
      >
        {dossier.nameKanji}
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={itemVariants}
        className="mb-5"
        style={{ height: '1px', background: 'linear-gradient(to right, rgba(125,211,252,0.3), transparent)' }}
      />

      {/* Stats */}
      <motion.dl variants={staggerChildren} className="grid grid-cols-2 gap-4 mb-5">
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <dt className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ice-blue)', opacity: 0.7 }}>
            ✦ Linh phuc
          </dt>
          <dd className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-snow)' }}>
            {dossier.astralDress}
          </dd>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <dt className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ice-blue)', opacity: 0.7 }}>
            ❅ Thien su
          </dt>
          <dd className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-snow)' }}>
            {dossier.angelName}
          </dd>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col gap-1 col-span-2">
          <dt className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ice-blue)', opacity: 0.7 }}>
            ♡ Tinh cach
          </dt>
          <dd className="text-sm font-medium leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-snow)' }}>
            {dossier.personalitySummary}
          </dd>
        </motion.div>
      </motion.dl>

      {/* keyQuote - DEC-05: italic serif, border-left ice-blue */}
      <motion.blockquote
        variants={itemVariants}
        className="mb-7 pl-3"
        style={{ borderLeft: '2px solid rgba(125, 211, 252, 0.35)' }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(125, 211, 252, 0.85)' }}
        >
          &ldquo;{dossier.keyQuote}&rdquo;
        </p>
      </motion.blockquote>

      {/* CTA buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        <button
          onClick={onExploreGallery}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: 'var(--color-yoshino-green)',
            color: 'var(--color-deep-winter)',
            border: '1px solid var(--color-yoshino-green)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(110,231,183,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Kham pha tranh ↓
        </button>
        <button
          onClick={onCallYoshinon}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-snow)',
            border: '1px solid rgba(248,250,252,0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(125,211,252,0.5)';
            e.currentTarget.style.color = 'var(--color-ice-blue)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(248,250,252,0.2)';
            e.currentTarget.style.color = 'var(--color-text-snow)';
          }}
        >
          🐰 Hoi Yoshinon
        </button>
      </motion.div>
    </motion.div>
  );
}
