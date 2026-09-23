// GuestbookSection — Expanded Frost Noticeboard with Random Shuffle & Search
// spec/REQUIREMENTS.md §FR-06, DEC-19
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuestbook } from '../../hooks/useGuestbook';
import type { GuestbookEntry } from '../../types';

const ROTATIONS = [-2.2, 1.6, -1.4, 2.4, -1.8, 1.2, -2.5, 2.0];
const BATCH_SIZE = 14;

const NOTE_PALETTES = [
  // 1. Yoshino's Hair & Eyes — Soft Ice Blue
  {
    bg: 'rgba(240, 249, 255, 0.95)',
    border: 'rgba(186, 230, 253, 0.85)',
    pinColor: '#38BDF8',
    tapeColor: 'rgba(224, 242, 254, 0.7)',
    textColor: 'var(--color-text-primary)',
    accent: 'var(--color-ice-blue)',
  },
  // 2. Yoshino's Raincoat (Zadkiel Coat) — Soft Mint (#EDFDF6)
  {
    bg: 'rgba(237, 253, 246, 0.95)',
    border: 'rgba(167, 243, 208, 0.85)',
    pinColor: '#34D399',
    tapeColor: 'rgba(209, 250, 229, 0.7)',
    textColor: 'var(--color-text-primary)',
    accent: 'var(--color-yoshino-green)',
  },
];

export function GuestbookSection() {
  const { entries, loading, postEntry } = useGuestbook();
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledList, setShuffledList] = useState<GuestbookEntry[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Compute displayed list: Shuffled -> Default slice
  const displayedNotes = useMemo(() => {
    if (isShuffled && shuffledList.length > 0) {
      return shuffledList.slice(0, BATCH_SIZE);
    }
    return entries.slice(0, BATCH_SIZE);
  }, [entries, isShuffled, shuffledList]);

  // Handle Shuffle button click
  const handleShuffle = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500);

    // Randomize entries
    const shuffled = [...entries].sort(() => Math.random() - 0.5);
    setShuffledList(shuffled);
    setIsShuffled(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const newDoc = await postEntry({
      authorName: authorName.trim(),
      message: message.trim(),
      badgeIcon: '❄️',
    });

    // If currently in shuffle mode, insert new note right at the front
    if (isShuffled) {
      setShuffledList((prev) => [newDoc, ...prev]);
    }

    setAuthorName('');
    setMessage('');
    setIsSubmitting(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  return (
    <section
      id="guestbook"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden scroll-mt-16"
      aria-label="Winter Hearth Guestbook"
      style={{ backgroundColor: 'transparent', zIndex: 2 }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 20%, rgba(59,157,210,0.07) 0%, transparent 65%),' +
            'radial-gradient(ellipse 55% 50% at 75% 70%, rgba(16,184,126,0.06) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />

      <div className="relative max-w-[1440px] mx-auto" style={{ zIndex: 1 }}>
        {/* ── Expanded Whiteboard Canvas Frame ── */}
        <motion.div
          id="guestbook-board"
          ref={boardRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] border overflow-hidden flex flex-col shadow-2xl scroll-mt-20 transition-all"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            borderColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow:
              '0 24px 60px rgba(30, 55, 110, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          }}
        >
          {/* Board Grid Dot Pattern overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(rgba(59, 157, 210, 0.25) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* ── Whiteboard Clean Toolbar ── */}
          <div className="relative z-10 flex items-center justify-between px-6 md:px-8 py-3.5 border-b border-[rgba(59,157,210,0.14)] bg-white/60 backdrop-blur-md">
            {/* Left title */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📌</span>
              <span
                className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Yoshino&apos;s Memory Board
              </span>
            </div>

            {/* Right controls: Large Dice Shuffle Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleShuffle}
                title="Shuffle wishes"
                aria-label="Shuffle wishes"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 cursor-pointer border shadow-xs hover:bg-white hover:shadow-md hover:scale-110 active:scale-95 group"
                style={{
                  backgroundColor: isShuffled ? 'rgba(59, 157, 210, 0.12)' : 'rgba(255, 255, 255, 0.85)',
                  borderColor: 'rgba(59, 157, 210, 0.3)',
                  color: 'var(--color-ice-blue)',
                }}
              >
                <motion.span
                  animate={{ rotate: isSpinning ? 360 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="inline-block select-none leading-none transform transition-transform group-hover:rotate-12"
                >
                  🎲
                </motion.span>
              </button>
            </div>
          </div>

          {/* Success Toast banner */}
          <AnimatePresence>
            {showSuccessToast && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative z-20 bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-2.5 text-xs font-semibold text-center text-[var(--color-yoshino-green)] flex items-center justify-center gap-2"
              >
                <span>🎉</span>
                <span>Your warm wish has been pinned to Yoshino&apos;s board!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Scrollable / Drag-enabled Board Canvas ── */}
          <div className="relative z-10 p-6 md:p-10 h-[620px] md:h-[680px] overflow-y-auto overflow-x-hidden scrollbar-thin">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-7 items-start">
              {/* ── 0. Sticky Pad Composer: The Blank Paper Note to Write On ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-2xl p-5 border-2 border-dashed shadow-md transition-all duration-300 sm:col-span-1"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderColor: 'rgba(16, 184, 126, 0.5)',
                  boxShadow: '0 8px 24px rgba(16, 184, 126, 0.08)',
                  transform: 'rotate(-1deg)',
                }}
              >
                {/* Washi tape at top */}
                <div
                  aria-hidden="true"
                  className="w-14 h-4 rounded-xs -mt-7 mb-3 mx-auto shadow-xs border border-white/60"
                  style={{
                    backgroundColor: 'rgba(167, 243, 208, 0.8)',
                    transform: 'rotate(1.5deg)',
                  }}
                />

                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-100">
                  <span className="text-sm">✏️</span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider text-[var(--color-yoshino-green)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Pin a Warm Wish
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <div>
                    <input
                      type="text"
                      required
                      maxLength={24}
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Your name / nickname..."
                      className="w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-all focus:ring-1 focus:ring-[var(--color-yoshino-green)]"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: 'rgba(16, 184, 126, 0.3)',
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-body)',
                      }}
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={3}
                      maxLength={140}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Warm words for Yoshino & Yoshinon..."
                      className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none border transition-all focus:ring-1 focus:ring-[var(--color-yoshino-green)]"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: 'rgba(16, 184, 126, 0.3)',
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-body)',
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      {message.length}/140
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting || !authorName.trim() || !message.trim()}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
                      style={{
                        backgroundColor: 'var(--color-yoshino-green)',
                        opacity: isSubmitting || !authorName.trim() || !message.trim() ? 0.6 : 1,
                        cursor: isSubmitting || !authorName.trim() || !message.trim() ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      <span>{isSubmitting ? 'Pinning...' : 'Pin Wish 📌'}</span>
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* ── 1..N: The Pinned Note Slips on the Board ── */}
              {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-44 rounded-2xl animate-pulse bg-white/60 border border-sky-100"
                  />
                ))
              ) : (
                <AnimatePresence mode="popLayout">
                  {displayedNotes.map((entry, idx) => {
                    const palette = NOTE_PALETTES[idx % NOTE_PALETTES.length];
                    const rotation = ROTATIONS[idx % ROTATIONS.length];

                    return (
                      <motion.div
                        key={entry.id}
                        layout
                        drag
                        dragConstraints={boardRef}
                        dragElastic={0.15}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                        whileDrag={{ scale: 1.08, rotate: 0, zIndex: 40 }}
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="relative rounded-2xl p-5 border cursor-grab active:cursor-grabbing shadow-sm hover:shadow-xl transition-shadow select-none group"
                        style={{
                          backgroundColor: palette.bg,
                          borderColor: palette.border,
                          transform: `rotate(${rotation}deg)`,
                        }}
                      >
                        {/* Metallic Push-Pin on top center */}
                        <div
                          aria-hidden="true"
                          className="w-4 h-4 rounded-full -mt-7 mb-3 mx-auto shadow-md border-2 border-white/90 transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: palette.pinColor,
                            boxShadow: `0 3px 6px ${palette.pinColor}40`,
                          }}
                        />

                        {/* Note Body Message */}
                        <p
                          className="text-xs md:text-sm leading-relaxed mb-4 text-[var(--color-text-primary)] break-words italic"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          &ldquo;{entry.message}&rdquo;
                        </p>

                        {/* Note Footer: Author + Date */}
                        <div className="pt-2.5 border-t border-[rgba(59,157,210,0.12)] flex items-center justify-between gap-2">
                          <span
                            className="text-xs font-bold truncate"
                            style={{
                              fontFamily: 'var(--font-body)',
                              color: palette.accent,
                            }}
                          >
                            ~ {entry.authorName}
                          </span>

                          <span className="text-[10px] text-[var(--color-text-muted)] flex-shrink-0">
                            {entry.createdAt}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}

              {/* Empty state */}
              {!loading && displayedNotes.length === 0 && (
                <div className="col-span-full py-16 text-center text-xs text-[var(--color-text-muted)]">
                  No warm wishes pinned yet. Be the first to leave one!
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

