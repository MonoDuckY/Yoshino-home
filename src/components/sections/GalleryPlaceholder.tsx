// GalleryPlaceholder - Sprint 2 stub, full Gallery in Sprint 3
import { motion } from 'framer-motion';

export function GalleryPlaceholder() {
  return (
    <section
      id="gallery"
      className="relative w-full py-24 px-6"
      aria-label="Phong trien lam nghe thuat"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-yoshino-green)', fontFamily: 'var(--font-body)' }}>
            The Gallery Wall
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-snow)' }}>
            PHONG TRIEN LAM NGHE THUAT
          </h2>
          <p className="text-sm mb-16" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-mist)' }}>
            Nhung khoanh khac diu dang va am ap cua Yoshino
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-25">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl aspect-[3/4]"
                style={{ backgroundColor: 'var(--color-glass)', border: '1px solid rgba(125,211,252,0.1)' }}
              />
            ))}
          </div>
          <p className="mt-10 text-xs tracking-wider" style={{ color: 'var(--color-text-mist)', fontFamily: 'var(--font-body)' }}>
            Sprint 3 - Gallery dang duoc xay dung
          </p>
        </motion.div>
      </div>
    </section>
  );
}
