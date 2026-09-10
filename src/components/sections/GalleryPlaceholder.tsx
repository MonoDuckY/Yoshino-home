// GalleryPlaceholder — Sprint 2 stub, full Gallery Wall in Sprint 3
// DEC-07: English | DEC-09: Light theme
import { motion } from 'framer-motion';

export function GalleryPlaceholder() {
  return (
    <section
      id="gallery"
      className="relative w-full py-28 px-6"
      aria-label="Art Gallery — coming in Sprint 3"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        zIndex: 2,
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-4"
            style={{
              color: 'var(--color-yoshino-green)',
              fontFamily: 'var(--font-body)',
            }}
          >
            The Gallery Wall
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-widest mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            ART GALLERY
          </h2>
          <p
            className="text-base mb-16 max-w-md mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Curated artwork celebrating Yoshino's gentle and warm world
          </p>

          {/* Placeholder grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 opacity-30">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl aspect-[3/4]"
                style={{
                  backgroundColor: 'rgba(59,157,210,0.08)',
                  border: '1px solid rgba(59,157,210,0.15)',
                }}
              />
            ))}
          </div>

          <p
            className="mt-12 text-xs tracking-wider font-medium"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Sprint 3 — Gallery under construction ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}
