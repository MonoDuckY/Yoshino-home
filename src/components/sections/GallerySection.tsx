// GallerySection — Sprint 5: Pure Vertical Flow with Adaptive Masonry (DEC-16 Revision - Option B)
// spec/REQUIREMENTS.md §FR-02, §5.1, §7.2, DEC-01, DEC-07, DEC-09, DEC-11, DEC-12, DEC-16
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterBar } from '../ui/FilterBar';
import { ArtworkCard } from '../ui/ArtworkCard';
import { filterArtworks } from '../../types';
import type { GalleryFilter } from '../../types';
import { useArtworks } from '../../hooks/useArtworks';

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const { artworks, loading } = useArtworks();

  const displayedArtworks = filterArtworks(artworks, activeFilter);

  return (
    <section
      id="gallery"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Curated Art Gallery"
      style={{
        backgroundColor: 'transparent',
        zIndex: 2,
      }}
    >
      {/* Subtle ambient lighting layer — transparent snow continuity (DEC-11) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(59,157,210,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 50% 50% at 85% 75%, rgba(16,184,126,0.04) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />

      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 1 }}>
        {/* ── Section Header ── */}
        <motion.header
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-yoshino-green)',
              backgroundColor: 'rgba(16, 184, 126, 0.08)',
              border: '1px solid rgba(16, 184, 126, 0.2)',
            }}
          >
            <span>氷結の回廊</span>
            <span>&bull;</span>
            <span>GALLERY COLLECTION</span>
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold tracking-wider mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.08em',
            }}
          >
            ART GALLERY
          </h2>

          <p
            className="text-base leading-relaxed mb-8"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Curated illustrations celebrating Yoshino&apos;s peaceful world across
            official volumes, community fanart, and special crossover events.
          </p>

          {/* FilterBar */}
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </motion.header>

        {/* ── Adaptive Multi-column Masonry Gallery (DEC-12, DEC-16) ── */}
        {loading ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => {
              const aspectClasses = [
                'aspect-[3/4]',
                'aspect-[16/9]',
                'aspect-[4/3]',
                'aspect-[1/1]',
                'aspect-[9/16]',
              ];
              return (
                <div
                  key={idx}
                  className={`break-inside-avoid mb-6 rounded-2xl overflow-hidden animate-pulse border ${
                    aspectClasses[idx % aspectClasses.length]
                  }`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    borderColor: 'rgba(59, 157, 210, 0.16)',
                  }}
                />
              );
            })}
          </div>
        ) : (
          <motion.div
            layout
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedArtworks.map((artwork, i) => (
                <div key={artwork.id} className="break-inside-avoid mb-6">
                  <ArtworkCard artwork={artwork} index={i} className="w-full shadow-md" />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state (if filter has 0 items) */}
        {displayedArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center rounded-3xl border"
            style={{
              backgroundColor: 'var(--color-glass)',
              borderColor: 'rgba(59, 157, 210, 0.15)',
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              No artworks currently in this category.
            </p>
          </motion.div>
        )}

        {/* Works count indicator */}
        <motion.p
          layout
          className="text-xs text-center mt-12 tracking-wider"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
        >
          {displayedArtworks.length} work{displayedArtworks.length !== 1 ? 's' : ''} exhibited
        </motion.p>
      </div>
    </section>
  );
}
