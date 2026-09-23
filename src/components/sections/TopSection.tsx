import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characterDossier, mockCostumes } from '../../data/mockArtworks';

const standeeVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.15 },
  },
};

export function TopSection() {
  const [selectedCostumeId, setSelectedCostumeId] = useState<string>(mockCostumes[0].id);
  const activeCostume = mockCostumes.find((c) => c.id === selectedCostumeId) || mockCostumes[0];

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'calc(var(--spacing-navbar) + 2rem)',
        paddingBottom: '6rem',
      }}
      aria-label="Character Profile & Shrine Sanctuary — Yoshino Himekawa"
    >
      {/* Anchor for backward compatibility with #hero */}
      <div id="hero" className="absolute top-0 left-0 pointer-events-none" aria-hidden="true" />

      {/* Ambient Daylight Backdrop Gradients — seamless with Gallery */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 20% 35%, rgba(59,157,210,0.07) 0%, transparent 65%),' +
            'radial-gradient(ellipse 45% 45% at 85% 30%, rgba(16,184,126,0.05) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />



      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>
        {/* ── Upper Row: Two Columns (Standee with Hololive Switcher & Profile Card) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── Left Column: Hololive-Style Vertical Costume Switcher + Standee (lg:col-span-6) ── */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <motion.div
              className="relative flex items-center justify-center gap-4 sm:gap-6 w-full"
              variants={standeeVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Ambient Aura Ring behind Standee */}
              <div
                aria-hidden="true"
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: '400px',
                  height: '400px',
                  left: '50%',
                  top: '42%',
                  transform: 'translate(-50%, -50%)',
                  background:
                    'radial-gradient(circle, rgba(59,157,210,0.16) 0%, rgba(16,184,126,0.06) 45%, transparent 70%)',
                  filter: 'blur(36px)',
                }}
              />

              {/* Hololive-Style Vertical Circular Costume Selector */}
              <div
                id="hero-wardrobe"
                className="flex flex-col items-center gap-3.5 z-10 select-none flex-shrink-0 p-2 sm:p-2.5 rounded-3xl bg-white/40 backdrop-blur-xs border border-white/60 shadow-xs transition-all"
                role="tablist"
                aria-label="Hololive style appearance selector"
              >
                {mockCostumes.map((costume) => {
                  const isActive = costume.id === selectedCostumeId;
                  return (
                    <button
                      key={costume.id}
                      onClick={() => setSelectedCostumeId(costume.id)}
                      role="tab"
                      aria-selected={isActive}
                      title={`${costume.badge} — ${costume.name}`}
                      aria-label={`Select ${costume.badge}: ${costume.name}`}
                      className="group relative cursor-pointer focus:outline-none transition-transform duration-200 active:scale-95"
                    >
                      {/* Circular Avatar Container */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden transition-all duration-300 ${
                          isActive
                            ? 'ring-3 ring-[var(--color-ice-blue)] ring-offset-2 ring-offset-[#ECF1FB] scale-105 shadow-md'
                            : 'opacity-70 hover:opacity-100 hover:scale-102 border-2 border-white/80'
                        }`}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: isActive
                            ? '0 4px 16px rgba(59, 157, 210, 0.35)'
                            : '0 2px 8px rgba(30, 55, 110, 0.08)',
                        }}
                      >
                        <img
                          src={costume.imageUrl}
                          alt={costume.name}
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: costume.avatarPosition || '50% 18%',
                            transformOrigin: costume.avatarPosition || '50% 18%',
                            transform: `scale(${costume.avatarScale || 2.4})`,
                            display: 'block',
                          }}
                          draggable={false}
                        />
                      </div>

                      {/* Hololive Magnifying Lens Inspect Badge at Bottom Right */}
                      <div
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border border-white transition-colors duration-200"
                        style={{
                          backgroundColor: isActive ? 'var(--color-ice-blue)' : '#4B6B94',
                          color: '#ffffff',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                        }}
                        aria-hidden="true"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="7" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </div>
                    </button>
                  );
                })}

                {/* Hololive Down Triangle Arrow */}
                <div
                  className="flex justify-center pt-1"
                  style={{ color: 'var(--color-ice-blue)', opacity: 0.6 }}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16L6 9H18L12 16Z" />
                  </svg>
                </div>
              </div>

              {/* Full Standee with Gentle Breathing Animation & Acrylic Stage */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex-1 flex flex-col items-center justify-end"
              >
                <div
                  className="relative select-none overflow-hidden flex items-end justify-center"
                  style={{
                    height: 'clamp(420px, 60vh, 640px)',
                    width: 'auto',
                    maxWidth: '380px',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeCostume.id}
                      src={activeCostume.imageUrl}
                      alt={`Yoshino Himekawa — ${activeCostume.badge} (${activeCostume.name})`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      fetchPriority="high"
                      style={{
                        height: '100%',
                        width: 'auto',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        objectPosition: 'bottom center',
                        filter:
                          'drop-shadow(0 10px 32px rgba(59,157,210,0.22)) drop-shadow(0 2px 8px rgba(30,55,110,0.08))',
                        display: 'block',
                      }}
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>

                {/* Frosted Acrylic Pedestal Base (Mica stand stage) */}
                <div
                  aria-hidden="true"
                  className="relative -mt-3.5 pointer-events-none flex flex-col items-center select-none"
                >
                  {/* Soft Ground Shadow on Pedestal */}
                  <div
                    className="w-44 sm:w-52 h-4 rounded-[100%]"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(30,55,110,0.22) 0%, rgba(59,157,210,0.07) 55%, transparent 75%)',
                      filter: 'blur(3px)',
                    }}
                  />
                  {/* Dual-ring Frosted Glass Pedestal */}
                  <div
                    className="relative -mt-2 w-48 sm:w-56 h-6 rounded-[100%] border border-white/90"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.55)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow:
                        '0 8px 20px rgba(59, 157, 210, 0.18), inset 0 2px 3px rgba(255, 255, 255, 0.95), inset 0 -1.5px 3px rgba(59, 157, 210, 0.12)',
                    }}
                  >
                    <div
                      className="absolute inset-[2px] rounded-[100%] border border-[rgba(59,157,210,0.25)]"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Active Costume Name Caption */}
            <p
              className="text-xs text-center font-medium tracking-wide mt-3 px-2 text-[var(--color-text-secondary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="font-bold text-[var(--color-ice-blue)]">
                {activeCostume.badge}:
              </span>{' '}
              {activeCostume.name}
            </p>
          </div>

          {/* ── Right Column: Streamlined Vital Profile Card (lg:col-span-6) ── */}
          <motion.div
            id="top-profile"
            className="lg:col-span-6 flex flex-col gap-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div
              className="rounded-3xl p-7 sm:p-9 md:p-10 border"
              style={{
                backgroundColor: 'var(--color-glass)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow:
                  '0 8px 32px rgba(30, 55, 110, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              }}
            >


              {/* Character Name (Option 2: Outfit + Klee One) */}
              <h1
                className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold uppercase tracking-[0.09em] mb-1 leading-tight"
                style={{
                  fontFamily: 'var(--font-title-en)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {characterDossier.nameRomanized}
              </h1>

              <p
                className="text-xl md:text-2xl font-semibold mb-5 tracking-[0.18em]"
                style={{
                  fontFamily: 'var(--font-title-jp)',
                  color: 'var(--color-ice-blue)',
                }}
              >
                {characterDossier.nameKanji}
              </p>

              {/* Iconic Voice Line Quote Box */}
              <div
                className="mb-5 p-3.5 sm:p-4 rounded-2xl border relative overflow-hidden"
                style={{
                  backgroundColor: 'rgba(240, 249, 255, 0.85)',
                  borderColor: 'rgba(186, 230, 253, 0.8)',
                  boxShadow: '0 2px 10px rgba(59, 157, 210, 0.05)',
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl select-none mt-0.5" aria-hidden="true">❄️</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm sm:text-base font-semibold text-[var(--color-text-primary)] leading-snug mb-0.5"
                      style={{ fontFamily: 'var(--font-title-jp)' }}
                    >
                      {characterDossier.keyQuoteJp}
                    </p>
                    <p
                      className="text-xs text-[var(--color-text-secondary)] italic leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      &ldquo;{characterDossier.keyQuoteEn}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Streamlined Vital Profile Specifications ── */}
              <div className="pt-4 border-t border-[rgba(59,157,210,0.15)]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {/* Age */}
                  <div
                    className="p-3.5 rounded-2xl border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                      borderColor: 'rgba(59, 157, 210, 0.15)',
                    }}
                  >
                    <span
                      className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Age
                    </span>
                    <div className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">
                      <div>13 <span className="font-normal text-[11px] text-[var(--color-text-secondary)]">(Appearance)</span></div>
                      <div className="mt-1">39–40 <span className="font-normal text-[11px] text-[var(--color-text-secondary)]">(Actual Age)</span></div>
                    </div>
                  </div>

                  {/* Height */}
                  <div
                    className="p-3.5 rounded-2xl border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                      borderColor: 'rgba(59, 157, 210, 0.15)',
                    }}
                  >
                    <span
                      className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Height
                    </span>
                    <div className="text-base font-bold text-[var(--color-text-primary)]">
                      {characterDossier.height}
                    </div>
                  </div>

                  {/* Codename */}
                  <div
                    className="p-3.5 rounded-2xl border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                      borderColor: 'rgba(59, 157, 210, 0.15)',
                    }}
                  >
                    <span
                      className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Codename
                    </span>
                    <div className="text-base font-bold text-[var(--color-text-primary)]">
                      {characterDossier.codename}
                    </div>
                  </div>

                  {/* Voice Actress (Seiyuu) */}
                  <div
                    className="p-3.5 rounded-2xl border sm:col-span-2"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                      borderColor: 'rgba(59, 157, 210, 0.15)',
                    }}
                  >
                    <span
                      className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Voice Actress &bull; Seiyuu (CV)
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {characterDossier.seiyuu.nameEn}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded font-medium"
                        style={{
                          backgroundColor: 'rgba(59, 157, 210, 0.1)',
                          color: 'var(--color-ice-blue)',
                        }}
                      >
                        {characterDossier.seiyuu.nameJp}
                      </span>
                    </div>
                  </div>

                  {/* Measurements */}
                  <div
                    className="p-3.5 rounded-2xl border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                      borderColor: 'rgba(59, 157, 210, 0.15)',
                    }}
                  >
                    <span
                      className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Measurements (B-W-H)
                    </span>
                    <div className="text-base font-bold tracking-wider text-[var(--color-text-primary)]">
                      {characterDossier.measurements}
                    </div>
                  </div>
                </div>

                {/* ── Interactive CTA: Explore Curated Gallery ── */}
                <div className="mt-5 pt-4 border-t border-[rgba(59,157,210,0.15)]">
                  <a
                    href="#gallery"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white transition-all duration-300 shadow-sm hover:shadow-md hover:brightness-105 active:scale-98 no-underline cursor-pointer tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-ice-blue) 0%, #2563EB 100%)',
                      boxShadow: '0 4px 14px rgba(59, 157, 210, 0.35)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span>Explore Curated Gallery</span>
                    <span className="text-sm font-extrabold select-none">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Lower Row: Full-Width Editorial Monologue ("About Yoshino & Yoshinon") ── */}
        <motion.div
          id="top-tribute"
          className="relative max-w-4xl lg:max-w-5xl mx-auto mt-20 md:mt-28 px-4 sm:px-8 py-8 rounded-3xl text-center transition-all scroll-mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Title */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.08em',
            }}
          >
            {characterDossier.tribute.title}
          </h2>

          {/* Giant Decorative Opening Quote and Closing Quote Enclosure */}
          <div className="relative px-2 sm:px-6">
            {/* Opening Quote */}
            <span
              aria-hidden="true"
              className="block text-6xl sm:text-7xl md:text-8xl select-none pointer-events-none font-serif leading-none mb-2"
              style={{
                color: 'var(--color-ice-blue)',
                opacity: 0.35,
              }}
            >
              &ldquo;
            </span>

            {/* Spoken Tribute Paragraphs */}
            <div
              className="text-base sm:text-lg md:text-xl leading-relaxed space-y-6 font-normal max-w-3xl mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {characterDossier.tribute.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing Quote */}
            <span
              aria-hidden="true"
              className="block text-6xl sm:text-7xl md:text-8xl select-none pointer-events-none font-serif leading-none mt-2"
              style={{
                color: 'var(--color-ice-blue)',
                opacity: 0.35,
              }}
            >
              &rdquo;
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
