// GallerySection — Sprint 4 & Pre-Sprint 5: Masonry Gallery Wall with Sanity.io CMS Integration
// spec/REQUIREMENTS.md §FR-02, §5.1, §7.2
// DEC-01: filter logic | DEC-03: Sanity CMS + Fallback | DEC-07: English | DEC-09: Light theme
// DEC-11: Unified Background & Full-site Snow | DEC-12: Adaptive Masonry Layout
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
      className="relative w-full py-24 px-6 overflow-hidden"
      aria-label="Art Gallery"
      style={{
        backgroundColor: 'transparent',
        zIndex: 2,
      }}
    >
      {/* Subtle ambient lighting layer — DEC-11 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 25%, rgba(59,157,210,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 50% 50% at 85% 75%, rgba(16,184,126,0.04) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />

      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 1 }}>
        {/* ── Section Header ── */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-4"
            style={{ color: 'var(--color-yoshino-green)', fontFamily: 'var(--font-body)' }}
          >
            The Gallery Wall
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-widest mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            ART GALLERY
          </h2>
          <p
            className="text-base max-w-md mx-auto leading-relaxed mb-10"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
          >
            Curated artwork celebrating Yoshino&apos;s gentle and warm world
          </p>

          {/* FilterBar */}
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </motion.header>

        {/* ── Masonry Artwork Wall (DEC-12) ── */}
        {loading ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
            {Array.from({ length: 8 }).map((_, idx) => {
              const aspectClasses = ['aspect-[3/4]', 'aspect-[16/9]', 'aspect-[4/3]', 'aspect-[1/1]', 'aspect-[9/16]'];
              return (
                <div
                  key={idx}
                  className={`break-inside-avoid mb-5 rounded-2xl overflow-hidden animate-pulse border ${
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
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {displayedArtworks.map((artwork, i) => (
                <div key={artwork.id} className="break-inside-avoid mb-5">
                  <ArtworkCard artwork={artwork} index={i} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state (edge case if a category has 0 items) */}
        {displayedArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p
              className="text-sm"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              No artworks in this category yet.
            </p>
          </motion.div>
        )}

        {/* Count indicator */}
        <motion.p
          layout
          className="text-xs text-center mt-8 tracking-wider"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
        >
          {displayedArtworks.length} work{displayedArtworks.length !== 1 ? 's' : ''} displayed
        </motion.p>
      </div>
    </section>
  );
}
