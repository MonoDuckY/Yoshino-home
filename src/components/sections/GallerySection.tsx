// GallerySection — Curated Batching & Scalable Masonry (Option 1)
// spec/REQUIREMENTS.md §FR-02, §5.1, §7.2, DEC-01, DEC-07, DEC-09, DEC-11, DEC-12, DEC-16
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterBar } from '../ui/FilterBar';
import { ArtworkCard } from '../ui/ArtworkCard';
import { filterArtworks } from '../../types';
import type { GalleryFilter } from '../../types';
import { useArtworks } from '../../hooks/useArtworks';

const INITIAL_BATCH_SIZE = 8;
const BATCH_INCREMENT = 8;

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const { artworks, loading } = useArtworks();

  const handleFilterChange = (filter: GalleryFilter) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const displayedArtworks = filterArtworks(artworks, activeFilter);
  const visibleArtworks = displayedArtworks.slice(0, visibleCount);
  const hasMore = visibleCount < displayedArtworks.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, displayedArtworks.length));
  };

  return (
    <section
      id="gallery"
      className="relative w-full pt-16 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden scroll-mt-16"
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
        {/* ── Filter Bar ── */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FilterBar active={activeFilter} onChange={handleFilterChange} />
        </motion.div>

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
              {visibleArtworks.map((artwork, i) => (
                <div key={artwork.id} className="break-inside-avoid mb-6">
                  <ArtworkCard artwork={artwork} index={i} className="w-full shadow-md" />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state (if filter has 0 items) */}
        {displayedArtworks.length === 0 && !loading && (
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

        {/* ── Load More & Works Count Controller ── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          {hasMore && (
            <motion.button
              type="button"
              onClick={handleLoadMore}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider text-[var(--color-text-primary)] transition-all duration-300 cursor-pointer border shadow-sm group"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--color-glass)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(59, 157, 210, 0.3)',
                boxShadow: '0 4px 20px rgba(30, 55, 110, 0.06)',
              }}
            >
              <span>Load More Artworks (+{Math.min(BATCH_INCREMENT, displayedArtworks.length - visibleCount)})</span>
              <span className="w-6 h-6 rounded-full bg-[rgba(59,157,210,0.12)] text-[var(--color-ice-blue)] flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </motion.button>
          )}

          {displayedArtworks.length > 0 && (
            <motion.p
              layout
              className="text-xs text-center tracking-wider"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              Showing {visibleArtworks.length} of {displayedArtworks.length} curated works
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

