import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GITHUB_REPO_URL = 'https://github.com/MonoDuckY/Yoshino-home';
const REMOVAL_EMAIL = 'pvietduc204@gmail.com';
const SUBJECT = "[Yoshino's Home] Artwork Removal Request";
const BODY =
  "Hello,\n\nI am the original creator of the following artwork displayed on Yoshino's Home:\n- Artwork Title / URL:\n- Original Artist Profile / Post:\n\nPlease remove this artwork from the website.\n\nThank you!";

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  REMOVAL_EMAIL
)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

const REMOVAL_MAILTO = `mailto:${REMOVAL_EMAIL}?subject=${encodeURIComponent(
  SUBJECT
)}&body=${encodeURIComponent(BODY)}`;

export function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(REMOVAL_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  // Close on Escape key press & prevent background scrolling when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="credits-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
        >
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Frosted Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 md:p-10 z-10 my-auto"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(59, 157, 210, 0.15)',
            }}
          >
            {/* Close button (top right) */}
            <button
              onClick={onClose}
              aria-label="Close Credits & Disclaimer modal"
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center border border-slate-200/80 text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <header className="mb-8 pr-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.16em] uppercase mb-2.5 border"
                style={{
                  backgroundColor: 'rgba(59, 157, 210, 0.09)',
                  borderColor: 'rgba(59, 157, 210, 0.25)',
                  color: 'var(--color-ice-blue)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>❄️</span>
                <span>Tribute Information</span>
              </div>
              <h2
                id="credits-modal-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-title-en)' }}
              >
                Credits &amp; Legal Disclaimer
              </h2>
              <p
                className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1.5 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                A peaceful, non-commercial fan sanctuary dedicated to Yoshino Himekawa.
              </p>
            </header>

            {/* 3 Structured Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* ── Card 1: Copyright & Franchise ── */}
              <div
                className="rounded-2xl p-5 sm:p-6 border flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.85)',
                  borderColor: 'rgba(226, 232, 240, 0.9)',
                }}
              >
                <div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-blue-500/10 text-blue-600 border border-blue-500/20">
                    🏛️
                  </div>
                  <h3
                    className="text-base font-bold text-[var(--color-text-primary)] mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Copyright &amp; IP
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    <strong>Date A Live</strong> (デート・ア・ライブ) and the character <strong>Yoshino Himekawa</strong> are intellectual property of:
                  </p>
                  <ul className="text-xs space-y-1.5 text-[var(--color-text-primary)] font-medium mb-4 pl-3 border-l-2 border-sky-400">
                    <li>Author: <strong>Koushi Tachibana</strong> (橘公司)</li>
                    <li>Character Design: <strong>Tsunako</strong> (つなこ)</li>
                    <li>Publisher: <strong>KADOKAWA Corporation</strong></li>
                  </ul>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-normal pt-3 border-t border-slate-200">
                  This site is an unofficial, non-profit fan tribute. No copyright infringement is intended.
                </p>
              </div>

              {/* ── Card 2: Artist Rights & Content Removal Policy ── */}
              <div
                className="rounded-2xl p-5 sm:p-6 border flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(240, 249, 255, 0.85)',
                  borderColor: 'rgba(186, 230, 253, 0.85)',
                }}
              >
                <div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-sky-500/10 text-sky-600 border border-sky-500/20">
                    🎨
                  </div>
                  <h3
                    className="text-base font-bold text-[var(--color-text-primary)] mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Artist Rights &amp; Removal
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                    Every featured fanart is carefully attributed to its creator with direct links to the original posts on Pixiv, X (Twitter), or official media.
                  </p>
                  
                  {/* Japanese Notice for Artists */}
                  <div className="p-3 rounded-xl bg-white/80 border border-sky-200/70 mb-4 text-[11px] leading-relaxed text-slate-700">
                    <p className="font-semibold text-sky-800 mb-1">【イラスト制作者の皆様へ】</p>
                    <p>
                      掲載されているイラストの著作権は各制作者様に帰属します。削除や変更をご希望の際は、速やかに対応いたしますのでお気軽にご連絡ください。
                    </p>
                  </div>
                </div>

                {/* Request Removal CTA Buttons */}
                <div className="pt-2 space-y-2">
                  {/* Primary: Open Gmail Web Compose in new tab */}
                  <a
                    href={GMAIL_COMPOSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border text-white shadow-sm hover:shadow-md hover:brightness-105 active:scale-98 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-ice-blue)',
                      borderColor: 'rgba(59, 157, 210, 0.4)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span>✉️</span>
                    <span>Send Request (Gmail Web ↗)</span>
                  </a>

                  {/* Secondary: Copy Email & Native Mail App */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-200 border bg-white border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer shadow-2xs"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <span className={copied ? 'text-emerald-600 font-bold' : ''}>
                        {copied ? '✓' : '📋'}
                      </span>
                      <span className={copied ? 'text-emerald-600 font-bold' : ''}>
                        {copied ? 'Copied Email!' : 'Copy Email'}
                      </span>
                    </button>

                    <a
                      href={REMOVAL_MAILTO}
                      title="Open in default desktop mail client (Outlook / Apple Mail)"
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-200 border bg-white border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Mail App ↗
                    </a>
                  </div>

                  <p className="text-[10px] text-center text-[var(--color-text-muted)] font-mono select-all">
                    {REMOVAL_EMAIL}
                  </p>
                </div>
              </div>

              {/* ── Card 3: About Developer & Non-Commercial Pledge ── */}
              <div
                className="rounded-2xl p-5 sm:p-6 border flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(237, 253, 246, 0.85)',
                  borderColor: 'rgba(167, 243, 208, 0.85)',
                }}
              >
                <div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    💻
                  </div>
                  <h3
                    className="text-base font-bold text-[var(--color-text-primary)] mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    About Developer &amp; Pledge
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                    Created with utmost love by <strong>MonoDuckY</strong> as a personal tribute to celebrate nearly a decade of love for Yoshino, while practicing modern Frontend &amp; BA architecture.
                  </p>

                  {/* 3 Strict Non-commercial Pledges */}
                  <div className="space-y-1.5 mb-4 text-xs font-medium text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600">✓</span>
                      <span>Zero Ads &amp; Zero Trackers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600">✓</span>
                      <span>No Affiliate / Commercial Links</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600">✓</span>
                      <span>100% Free Forever (No Donations)</span>
                    </div>
                  </div>
                </div>

                {/* GitHub Repository Link */}
                <div className="pt-2">
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:scale-98 shadow-xs"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Footer note inside modal */}
            <div className="mt-8 pt-5 border-t border-slate-200 text-center">
              <p
                className="text-xs text-[var(--color-text-secondary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Thank you for visiting and sharing your warm winter love with Yoshino! ❄️💙
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
