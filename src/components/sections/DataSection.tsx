// DataSection — Master-Detail Dossier Terminal (DEC-17)
// spec/REQUIREMENTS.md §FR-05, §5.1, DEC-07, DEC-09, DEC-13
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockArchiveRecords } from '../../data/mockArtworks';
import type { ArchiveRecord } from '../../types';

// Icons implemented in inline SVG for zero-dependency consistency
function RecordIcon({ type }: { type: string }) {
  switch (type) {
    case 'Sparkles':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        </svg>
      );
    case 'User':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      );
    case 'Shield':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'Heart':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
  }
}

export function DataSection() {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(mockArchiveRecords[0].id);

  const selectedIndex = mockArchiveRecords.findIndex((r) => r.id === selectedRecordId);
  const activeRecord: ArchiveRecord = mockArchiveRecords[selectedIndex] || mockArchiveRecords[0];

  const handleNextRecord = () => {
    const nextIdx = (selectedIndex + 1) % mockArchiveRecords.length;
    setSelectedRecordId(mockArchiveRecords[nextIdx].id);
  };

  return (
    <section
      id="data"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Character Chronicle & Archive"
      style={{
        backgroundColor: 'transparent',
        zIndex: 2,
      }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 20% 30%, rgba(59,157,210,0.07) 0%, transparent 70%),' +
            'radial-gradient(ellipse 55% 45% at 80% 70%, rgba(16,184,126,0.06) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <motion.header
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-ice-blue)',
              backgroundColor: 'rgba(59, 157, 210, 0.08)',
              border: '1px solid rgba(59, 157, 210, 0.2)',
            }}
          >
            <span>精霊記録</span>
            <span>&bull;</span>
            <span>ARCHIVE DOSSIER</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-wider mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.08em',
            }}
          >
            CHRONICLES OF THE HERMIT
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Ratatoskr classified intelligence and canonical lore regarding Spirit No. 02,
            her sub-zero angel Zadkiel, and her companion familiar Yoshinon.
          </p>
        </motion.header>

        {/* Master-Detail Terminal Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Dossier Index / Tab Navigation (Master) ── */}
          <div
            className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
            role="tablist"
            aria-label="Archive dossiers"
          >
            {mockArchiveRecords.map((record, idx) => {
              const isSelected = selectedRecordId === record.id;
              const stepNumber = String(idx + 1).padStart(2, '0');

              return (
                <button
                  key={record.id}
                  role="tab"
                  id={`tab-${record.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${record.id}`}
                  onClick={() => setSelectedRecordId(record.id)}
                  className={`relative text-left p-4 md:p-5 rounded-2xl transition-all duration-300 cursor-pointer flex-shrink-0 w-[240px] sm:w-[280px] lg:w-full group ${
                    isSelected
                      ? 'shadow-lg'
                      : 'hover:bg-white/80 opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? 'rgba(255, 255, 255, 0.95)'
                      : 'rgba(255, 255, 255, 0.55)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: isSelected
                      ? '1.5px solid var(--color-ice-blue)'
                      : '1px solid rgba(59, 157, 210, 0.15)',
                  }}
                >
                  {/* Left active vertical indicator bar on desktop */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-dossier-indicator"
                      className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-[var(--color-ice-blue)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold tracking-widest"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: isSelected ? 'var(--color-ice-blue)' : 'var(--color-text-muted)',
                        }}
                      >
                        {stepNumber}
                      </span>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: isSelected
                            ? 'rgba(59, 157, 210, 0.12)'
                            : 'rgba(0, 0, 0, 0.04)',
                          color: isSelected ? 'var(--color-ice-blue)' : 'var(--color-text-muted)',
                        }}
                      >
                        {record.tag.split('•')[0].trim()}
                      </span>
                    </div>

                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: isSelected ? 'rgba(59, 157, 210, 0.12)' : 'transparent',
                        color: isSelected ? 'var(--color-ice-blue)' : 'var(--color-text-muted)',
                      }}
                    >
                      <RecordIcon type={record.icon} />
                    </div>
                  </div>

                  <h3
                    className="text-base font-bold tracking-wide transition-colors"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    }}
                  >
                    {record.title}
                  </h3>

                  <p
                    className="text-xs truncate mt-0.5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: isSelected ? 'var(--color-yoshino-green)' : 'var(--color-text-muted)',
                    }}
                  >
                    {record.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* ── Right Column: Active Dossier Terminal (Detail) ── */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRecord.id}
                id={`panel-${activeRecord.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeRecord.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="relative rounded-3xl p-8 md:p-12 overflow-hidden border"
                style={{
                  backgroundColor: 'var(--color-glass)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow:
                    '0 12px 40px rgba(30, 55, 110, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                {/* Tactical Terminal Header Bar */}
                <div className="flex items-center justify-between flex-wrap gap-3 pb-6 mb-8 border-b border-[rgba(59,157,210,0.15)]">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-[var(--color-ice-blue)] animate-pulse"
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs font-semibold tracking-[0.2em] uppercase"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-ice-blue)',
                      }}
                    >
                      RATATOSKR FILE // REC-0{selectedIndex + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{
                        borderColor: 'rgba(16, 184, 126, 0.3)',
                        backgroundColor: 'rgba(16, 184, 126, 0.08)',
                        color: 'var(--color-yoshino-green)',
                      }}
                    >
                      CLEARANCE: GRANTED
                    </span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(59, 157, 210, 0.08)',
                        color: 'var(--color-ice-blue)',
                        border: '1px solid rgba(59, 157, 210, 0.2)',
                      }}
                    >
                      {activeRecord.tag}
                    </span>
                  </div>
                </div>

                {/* Title & Japanese Kanji Tag */}
                <div className="mb-4 flex items-baseline gap-4 flex-wrap">
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {activeRecord.title}
                  </h3>
                  {activeRecord.kanji && (
                    <span
                      className="text-sm md:text-base tracking-widest px-2.5 py-0.5 rounded-md"
                      style={{
                        fontFamily: '"Cinzel", "Yu Mincho", serif',
                        backgroundColor: 'rgba(59, 157, 210, 0.06)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid rgba(59, 157, 210, 0.12)',
                      }}
                    >
                      {activeRecord.kanji}
                    </span>
                  )}
                </div>

                {/* Subtitle */}
                <p
                  className="text-sm font-semibold tracking-wider uppercase mb-6"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-yoshino-green)',
                  }}
                >
                  {activeRecord.subtitle}
                </p>

                {/* Narrative Lore Body */}
                <p
                  className="text-base leading-relaxed text-[var(--color-text-secondary)] mb-8 font-normal"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {activeRecord.description}
                </p>

                {/* Structured Specifications Matrix */}
                <div className="mb-8">
                  <h4
                    className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[var(--color-text-muted)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Canonical Parameters & Intel
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeRecord.details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="rounded-xl p-3.5 border transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          borderColor: 'rgba(59, 157, 210, 0.12)',
                        }}
                      >
                        <span
                          className="block text-[11px] font-semibold uppercase tracking-wider mb-1"
                          style={{
                            fontFamily: 'var(--font-body)',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {detail.label}
                        </span>
                        <span
                          className="text-sm font-bold tracking-wide"
                          style={{
                            fontFamily: 'var(--font-body)',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Canonical Lore Quote / Tactical Field Note */}
                {activeRecord.quote && (
                  <blockquote
                    className="rounded-2xl p-5 mb-8 text-sm italic tracking-wide relative"
                    style={{
                      fontFamily: 'Georgia, serif',
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderLeft: '4px solid var(--color-ice-blue)',
                      color: 'var(--color-text-primary)',
                      boxShadow: '0 2px 12px rgba(30, 55, 110, 0.04)',
                    }}
                  >
                    <span className="block text-xs uppercase tracking-widest not-italic font-bold text-[var(--color-ice-blue)] mb-1">
                      Field Note Annotation
                    </span>
                    &ldquo;{activeRecord.quote}&rdquo;
                  </blockquote>
                )}

                {/* Terminal Bottom Action: Next File Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-[rgba(59,157,210,0.15)] flex-wrap gap-4">
                  <span
                    className="text-xs text-[var(--color-text-muted)] tracking-wider"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Displaying 0{selectedIndex + 1} of 0{mockArchiveRecords.length} Classified Records
                  </span>

                  <button
                    type="button"
                    onClick={handleNextRecord}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer border group"
                    style={{
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'rgba(59, 157, 210, 0.08)',
                      borderColor: 'rgba(59, 157, 210, 0.25)',
                      color: 'var(--color-ice-blue)',
                    }}
                  >
                    <span>Next Chronicle File</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
