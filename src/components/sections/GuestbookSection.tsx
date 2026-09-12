import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuestbook } from '../../hooks/useGuestbook';

const EMOJI_OPTIONS = ['❄️', '💙', '🐰', '✨', '🍵'];

export function GuestbookSection() {
  const { entries, loading, postEntry } = useGuestbook();
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('❄️');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await postEntry({
      authorName: authorName.trim(),
      message: message.trim(),
      badgeIcon: selectedEmoji,
    });

    setAuthorName('');
    setMessage('');
    setIsSubmitting(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  return (
    <section
      id="guestbook"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Winter Hearth Guestbook"
      style={{ backgroundColor: 'transparent', zIndex: 2 }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 20%, rgba(59,157,210,0.06) 0%, transparent 65%),' +
            'radial-gradient(ellipse 50% 50% at 75% 70%, rgba(16,184,126,0.05) 0%, transparent 60%)',
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
            <span>冬の暖炉</span>
            <span>&bull;</span>
            <span>WINTER HEARTH WISHES</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-wider mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.08em',
            }}
          >
            WARM HEARTH GUESTBOOK
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Leave a gentle message for Yoshino and Yoshinon to keep their spirits bright
            and warm across the falling snow.
          </p>
        </motion.header>

        {/* Guestbook Content Grid: Form (Left) & Messages Wall (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Compose Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl p-8"
            style={{
              backgroundColor: 'var(--color-glass)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 8px 32px rgba(30, 55, 110, 0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">💌</span>
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  Send a Warm Wish
                </h3>
                <p
                  className="text-xs text-[var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Your message will be pinned to Yoshino&apos;s winter hearth.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Author name */}
              <div>
                <label
                  htmlFor="authorName"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                >
                  Your Name / Nickname
                </label>
                <input
                  id="authorName"
                  type="text"
                  required
                  maxLength={24}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. TenguuFriend"
                  className="w-full px-4 py-2.5 rounded-xl text-sm transition-all outline-none"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(59, 157, 210, 0.25)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              {/* Message text */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="wishMessage"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                  >
                    Your Message
                  </label>
                  <span
                    className="text-[11px]"
                    style={{ color: message.length > 120 ? '#EF4444' : 'var(--color-text-muted)' }}
                  >
                    {message.length} / 140
                  </span>
                </div>
                <textarea
                  id="wishMessage"
                  required
                  rows={3}
                  maxLength={140}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share warmth, gentle encouragement, or cheer for Yoshinon..."
                  className="w-full px-4 py-2.5 rounded-xl text-sm transition-all outline-none resize-none"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(59, 157, 210, 0.25)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              {/* Emoji badge selector */}
              <div>
                <span
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                >
                  Choose a Stamp
                </span>
                <div className="flex gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer"
                      style={{
                        backgroundColor:
                          selectedEmoji === emoji ? 'rgba(59, 157, 210, 0.18)' : 'rgba(255, 255, 255, 0.6)',
                        border:
                          selectedEmoji === emoji
                            ? '2px solid var(--color-ice-blue)'
                            : '1px solid rgba(59, 157, 210, 0.15)',
                        transform: selectedEmoji === emoji ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'var(--color-yoshino-green)',
                  boxShadow: '0 4px 16px rgba(16, 184, 126, 0.3)',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                <span>{isSubmitting ? 'Sending to Hearth...' : 'Send Wish'}</span>
                <span>❄️</span>
              </button>
            </form>

            {/* Success toast notification */}
            <AnimatePresence>
              {showSuccessToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 rounded-xl text-xs font-medium text-center"
                  style={{
                    backgroundColor: 'rgba(16, 184, 126, 0.12)',
                    color: 'var(--color-yoshino-green)',
                    border: '1px solid rgba(16, 184, 126, 0.3)',
                  }}
                >
                  ✨ Thank you! Your warm wish has been posted to Yoshino&apos;s hearth.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right Column: Wishes Wall ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 h-40 animate-pulse border"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    borderColor: 'rgba(59, 157, 210, 0.16)',
                  }}
                />
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {entries.map((entry) => (
                <motion.article
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl p-6 flex flex-col justify-between border select-none transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-glass)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderColor: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 4px 16px rgba(30, 55, 110, 0.05)',
                  }}
                >
                  <div>
                    {/* Header: Badge & Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">{entry.badgeIcon || '❄️'}</span>
                      <time
                        dateTime={entry.createdAt}
                        className="text-[11px]"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                      >
                        {entry.createdAt}
                      </time>
                    </div>

                    {/* Message */}
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      &ldquo;{entry.message}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div
                    className="pt-3 flex items-center gap-2"
                    style={{ borderTop: '1px solid rgba(59, 157, 210, 0.1)' }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-ice-blue)',
                      }}
                    >
                      ~ {entry.authorName}
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
