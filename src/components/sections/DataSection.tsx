// DataSection — Sprint 5: Character Data & Archive Screen (DEC-17)
// spec/REQUIREMENTS.md §FR-05, §5.1, DEC-07, DEC-09, DEC-13
import { useState } from 'react';
import { motion } from 'framer-motion';
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
            'radial-gradient(ellipse 60% 45% at 20% 30%, rgba(59,157,210,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 55% 45% at 80% 70%, rgba(16,184,126,0.05) 0%, transparent 65%)',
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
            In-depth Ratatoskr intelligence and canonical lore regarding Spirit No. 02,
            her sub-zero angel Zadkiel, and her rabbit familiar Yoshinon.
          </p>
        </motion.header>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockArchiveRecords.map((record: ArchiveRecord, idx: number) => {
            const isSelected = selectedRecordId === record.id;
            return (
              <motion.article
                key={record.id}
                onClick={() => setSelectedRecordId(record.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative group rounded-3xl p-8 md:p-10 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected ? 'ring-2 ring-[var(--color-ice-blue)]' : ''
                }`}
                style={{
                  backgroundColor: 'var(--color-glass)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isSelected
                    ? '1px solid rgba(59, 157, 210, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.85)',
                  boxShadow: isSelected
                    ? '0 12px 36px rgba(59, 157, 210, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                    : '0 4px 20px rgba(30, 55, 110, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                {/* Header row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{
                        fontFamily: 'var(--font-body)',
                        backgroundColor: 'rgba(59, 157, 210, 0.08)',
                        color: 'var(--color-ice-blue)',
                        border: '1px solid rgba(59, 157, 210, 0.18)',
                      }}
                    >
                      {record.tag}
                    </span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-300"
                      style={{
                        backgroundColor: 'rgba(59, 157, 210, 0.08)',
                        color: 'var(--color-ice-blue)',
                      }}
                    >
                      <RecordIcon type={record.icon} />
                    </div>
                  </div>

                  {/* Title & Kanji */}
                  <div className="mb-2 flex items-baseline gap-3 flex-wrap">
                    <h3
                      className="text-2xl md:text-3xl font-bold tracking-wide"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {record.title}
                    </h3>
                    {record.kanji && (
                      <span
                        className="text-xs tracking-wider"
                        style={{
                          fontFamily: '"Cinzel", "Yu Mincho", serif',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {record.kanji}
                      </span>
                    )}
                  </div>

                  {/* Subtitle */}
                  <p
                    className="text-xs font-medium uppercase tracking-wider mb-5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-yoshino-green)',
                    }}
                  >
                    {record.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {record.description}
                  </p>
                </div>

                {/* Details list */}
                <div>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 mb-5"
                    style={{
                      borderTop: '1px solid rgba(59, 157, 210, 0.12)',
                    }}
                  >
                    {record.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex flex-col">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
                          style={{
                            fontFamily: 'var(--font-body)',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {detail.label}
                        </span>
                        <span
                          className="text-xs font-medium"
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

                  {/* Quote pill */}
                  {record.quote && (
                    <blockquote
                      className="rounded-xl px-4 py-2.5 text-xs italic tracking-wide"
                      style={{
                        fontFamily: 'Georgia, serif',
                        backgroundColor: 'rgba(255, 255, 255, 0.45)',
                        borderLeft: '3px solid var(--color-ice-blue)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      &ldquo;{record.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
