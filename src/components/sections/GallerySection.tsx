// GallerySection — Sprint 4: Full Gallery Wall with Sanity.io CMS Integration
// spec/REQUIREMENTS.md §FR-02, §5.1, §7.2
// DEC-01: filter logic | DEC-03: Sanity CMS + Fallback | DEC-07: English | DEC-09: Light theme
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
      className="relative w-full py-24 px-6"
      aria-label="Art Gallery"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        zIndex: 2,
      }}
    >
      <div className="max-w-7xl mx-auto">
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

        {/* ── Artwork Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] rounded-xl overflow-hidden animate-pulse border"
                style={{
                  backgroundColor: 'rgba(59, 157, 210, 0.08)',
                  borderColor: 'var(--color-border)',
                }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {displayedArtworks.map((artwork, i) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state (edge case if a category has 0 items) */}
        {displayedArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 text-center"
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
