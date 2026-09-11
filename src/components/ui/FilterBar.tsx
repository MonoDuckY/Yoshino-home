// FilterBar — Gallery filter UI
// DEC-01: 'all' is UI state only, ArtworkCategory never includes 'all'
// DEC-07: Full English labels | DEC-09: Light theme
import { motion } from 'framer-motion';
import type { GalleryFilter } from '../../types';

interface FilterOption {
  value: GalleryFilter;
  label: string;
}

const FILTERS: FilterOption[] = [
  { value: 'all',      label: 'All Works'         },
  { value: 'official', label: 'Official Art'       },
  { value: 'fanart',   label: 'Community Fanart'   },
  { value: 'collab',   label: 'Collaborations'     },
];

interface FilterBarProps {
  active: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2"
      role="group"
      aria-label="Filter gallery by category"
    >
      {FILTERS.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
            className="relative px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer border focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: isActive ? 'var(--color-ice-blue)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
              borderColor: isActive ? 'var(--color-ice-blue)' : 'var(--color-border)',
            }}
          >
            {/* Framer Motion background pill for smooth active transition */}
            {isActive && (
              <motion.span
                layoutId="filter-active-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: 'var(--color-ice-blue)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
