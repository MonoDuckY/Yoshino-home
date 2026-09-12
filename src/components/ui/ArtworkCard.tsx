// ArtworkCard — individual artwork tile in the Gallery Wall
// spec/REQUIREMENTS.md §FR-02, US-03
// DEC-09: Light theme | DEC-12: Adaptive natural aspect ratio for zero crop & CLS < 0.05
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artwork, ArtworkCategory } from '../../types';

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

const CATEGORY_BADGE: Record<ArtworkCategory, { label: string; color: string; bg: string }> = {
  official: {
    label: 'Official',
    color: '#ffffff',
    bg: 'var(--color-ice-blue)',
  },
  fanart: {
    label: 'Fanart',
    color: '#ffffff',
    bg: 'var(--color-yoshino-green)',
  },
  collab: {
    label: 'Collab',
    color: '#ffffff',
    bg: '#F59E0B',
  },
};

export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const [hovered, setHovered] = useState(false);
  const badge = CATEGORY_BADGE[artwork.category];
  const aspectRatio =
    artwork.width && artwork.height ? `${artwork.width} / ${artwork.height}` : 'auto';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer w-full"
      style={{
        aspectRatio,
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(59, 157, 210, 0.16)',
        boxShadow: '0 4px 20px rgba(30, 55, 110, 0.08)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Artwork image — lazy loaded, CLS-safe via aspect-ratio on parent */}
      <img
        src={artwork.imageUrl}
        alt={`${artwork.title} — artwork by ${artwork.credit.name}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Category badge — top left */}
      <span
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide z-10"
        style={{
          fontFamily: 'var(--font-body)',
          backgroundColor: badge.bg,
          color: badge.color,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        {badge.label}
      </span>

      {/* Hover overlay — US-03 */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 flex flex-col justify-end p-4 z-20"
            style={{
              background:
                'linear-gradient(to top, rgba(18,38,74,0.88) 0%, rgba(18,38,74,0.50) 55%, transparent 100%)',
            }}
          >
            {/* Title & artist */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.04 }}
              className="mb-3"
            >
              <p
                className="text-sm font-semibold leading-snug mb-0.5"
                style={{ fontFamily: 'var(--font-display)', color: '#F8FAFC' }}
              >
                {artwork.title}
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(248,250,252,0.75)' }}
              >
                {artwork.credit.handle ?? artwork.credit.name}
              </p>
              {artwork.curatorNote && (
                <p
                  className="text-xs mt-1.5 leading-relaxed italic line-clamp-2"
                  style={{ color: 'rgba(125,211,252,0.9)', fontFamily: 'var(--font-body)' }}
                >
                  {artwork.curatorNote}
                </p>
              )}
            </motion.div>

            {/* View Source CTA — US-03: opens in new tab */}
            <motion.a
              href={artwork.credit.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 4, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.08 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide self-start transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#F8FAFC',
                border: '1px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.28)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
              }}
            >
              View Source
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path
                  d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
