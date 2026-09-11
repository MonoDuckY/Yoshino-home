// YoshinonMascot.tsx — Floating Tour Guide Widget
// spec/REQUIREMENTS.md §FR-03, §2.2 US-04, DEC-04, DEC-06, DEC-07, DEC-09
import { motion, AnimatePresence } from 'framer-motion';
import type { TourState, TourStep } from '../../types';

interface YoshinonMascotProps {
  tourState: TourState;
  currentStep?: TourStep;
  currentStepIndex: number;
  totalSteps: number;
  onStartTour: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onDismiss: () => void;
  onOpenWelcome: () => void;
}

/**
 * Detailed SVG Illustration of Yoshinon puppet:
 * - White rabbit face with green hood & ears
 * - Right eye: shiny button eye
 * - Left eye: eyepatch with cross stitching
 * - Cute pink rabbit nose & stitched smile
 */
function YoshinonAvatar({ className = 'w-16 h-16', isWaving = false }: { className?: string; isWaving?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={
        isWaving
          ? {
              rotate: [0, -8, 8, -6, 6, 0],
              y: [0, -3, 0],
            }
          : {
              y: [0, -4, 0],
            }
      }
      transition={{
        duration: isWaving ? 1.4 : 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* ── Outer Hood Shadows & Ears ── */}
      {/* Left Ear */}
      <path
        d="M34 45 C24 25, 20 2, 38 12 C48 18, 48 36, 46 48 Z"
        fill="#10B87E"
        stroke="#0D9466"
        strokeWidth="2.5"
      />
      <path
        d="M33 38 C28 24, 26 12, 36 18 C42 22, 42 32, 40 40 Z"
        fill="#FDF6EC"
        opacity="0.85"
      />

      {/* Right Ear */}
      <path
        d="M86 45 C96 25, 100 2, 82 12 C72 18, 72 36, 74 48 Z"
        fill="#10B87E"
        stroke="#0D9466"
        strokeWidth="2.5"
      />
      <path
        d="M87 38 C92 24, 94 12, 84 18 C78 22, 78 32, 80 40 Z"
        fill="#FDF6EC"
        opacity="0.85"
      />

      {/* ── Green Hood Base ── */}
      <ellipse cx="60" cy="66" rx="46" ry="42" fill="#10B87E" stroke="#0D9466" strokeWidth="2.5" />

      {/* Hood decorative edge / trim */}
      <path
        d="M24 72 C24 45, 96 45, 96 72 C96 95, 24 95, 24 72 Z"
        fill="#059669"
        opacity="0.25"
      />

      {/* ── Rabbit Face (White Fur) ── */}
      <ellipse cx="60" cy="68" rx="36" ry="32" fill="#FFFFFF" />

      {/* Cheek blush */}
      <ellipse cx="38" cy="74" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="82" cy="74" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.6" />

      {/* ── Right Eye: Button Eye ── */}
      <circle cx="44" cy="64" r="6.5" fill="#1E293B" />
      {/* Button holes & stitch */}
      <circle cx="42" cy="63" r="1" fill="#FFFFFF" />
      <circle cx="46" cy="65" r="1" fill="#FFFFFF" />
      <line x1="42" y1="63" x2="46" y2="65" stroke="#FFFFFF" strokeWidth="0.8" />
      {/* Button highlight */}
      <circle cx="42.5" cy="61.5" r="1.5" fill="#FFFFFF" opacity="0.8" />

      {/* ── Left Eye: Eyepatch with Cross '+' Stitching ── */}
      {/* Eyepatch strap */}
      <path d="M60 57 L88 53" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 67 L88 77" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      {/* Eyepatch patch */}
      <rect
        x="68"
        y="56"
        width="16"
        height="16"
        rx="3"
        fill="#1E293B"
        transform="rotate(-5 76 64)"
      />
      {/* White cross '+' on eyepatch */}
      <line x1="76" y1="59" x2="76" y2="69" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="71" y1="64" x2="81" y2="64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />

      {/* ── Nose & Cute Smile ── */}
      <polygon points="60,72 57,75 63,75" fill="#F43F5E" />
      <path
        d="M60 75 L60 78 M56 78 C57 81, 60 81, 60 78 C60 81, 63 81, 64 78"
        stroke="#1E293B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* ── Puppet Neck Collar / Scarf & Button ── */}
      <path
        d="M38 98 C48 106, 72 106, 82 98 C76 108, 44 108, 38 98 Z"
        fill="#FDF6EC"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="102" r="3.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

      {/* ── Waving Hand / Puppet Sleeve ── */}
      <path
        d="M20 85 C14 80, 10 90, 18 96 C22 98, 26 94, 25 88 Z"
        fill="#10B87E"
        stroke="#0D9466"
        strokeWidth="2"
      />
      <circle cx="15" cy="88" r="3.5" fill="#FFFFFF" />
    </motion.svg>
  );
}

export function YoshinonMascot({
  tourState,
  currentStep,
  currentStepIndex,
  totalSteps,
  onStartTour,
  onNextStep,
  onPrevStep,
  onDismiss,
  onOpenWelcome,
}: YoshinonMascotProps) {
  const isBubbleOpen = tourState === 'welcome' || tourState === 'touring' || tourState === 'completed';

  return (
    <aside
      aria-label="Yoshinon tour guide"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end pointer-events-none"
    >
      {/* ── Dialog Speech Bubble ── */}
      <AnimatePresence>
        {isBubbleOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto mb-4 w-[calc(100vw-3rem)] max-w-sm rounded-2xl p-5 shadow-2xl border"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderColor: 'rgba(59, 157, 210, 0.25)',
              boxShadow: '0 12px 36px rgba(30, 55, 110, 0.16), 0 2px 8px rgba(16, 184, 126, 0.12)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-3 border-b pb-2.5" style={{ borderColor: 'rgba(59, 157, 210, 0.15)' }}>
              <div className="flex items-center gap-2">
                <span className="text-base select-none" aria-hidden="true">🐰</span>
                <span
                  className="text-xs font-bold tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-yoshino-green)' }}
                >
                  Yoshinon
                </span>
                {tourState === 'touring' && (
                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor: 'rgba(59, 157, 210, 0.1)',
                      color: 'var(--color-ice-blue)',
                    }}
                  >
                    Step {currentStepIndex + 1}/{totalSteps}
                  </span>
                )}
              </div>

              {/* Close / Dismiss */}
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full text-sm cursor-pointer"
                aria-label="Close tour guide"
              >
                ✕
              </button>
            </div>

            {/* ── State: Welcome ── */}
            {tourState === 'welcome' && (
              <div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  Yahoo! Welcome to Yoshino&apos;s Home!
                </p>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                >
                  I&apos;m Yoshinon! Would you like me to guide you around our warm winter room and show you Yoshino&apos;s story and art gallery?
                </p>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={onDismiss}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-muted)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Maybe later
                  </button>
                  <button
                    onClick={onStartTour}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    style={{
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--color-yoshino-green)',
                    }}
                  >
                    Let&apos;s Go! ❄️
                  </button>
                </div>
              </div>
            )}

            {/* ── State: Touring ── */}
            {tourState === 'touring' && currentStep && (
              <div>
                {/* Step dots indicator */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  {Array.from({ length: totalSteps }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: idx === currentStepIndex ? '20px' : '6px',
                        backgroundColor:
                          idx === currentStepIndex
                            ? 'var(--color-yoshino-green)'
                            : idx < currentStepIndex
                            ? 'var(--color-ice-blue)'
                            : 'rgba(59, 157, 210, 0.2)',
                      }}
                    />
                  ))}
                </div>

                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {currentStep.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                >
                  {currentStep.message}
                </p>

                {/* Tour navigation buttons */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={onDismiss}
                    className="text-[11px] font-medium transition-colors cursor-pointer"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Skip Tour
                  </button>

                  <div className="flex items-center gap-2">
                    {currentStepIndex > 0 && (
                      <button
                        onClick={onPrevStep}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer"
                        style={{
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-secondary)',
                          backgroundColor: 'transparent',
                        }}
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={onNextStep}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all cursor-pointer shadow-sm hover:shadow"
                      style={{
                        backgroundColor:
                          currentStepIndex === totalSteps - 1
                            ? 'var(--color-ice-blue)'
                            : 'var(--color-yoshino-green)',
                      }}
                    >
                      {currentStepIndex === totalSteps - 1 ? 'Finish Tour ✨' : 'Next →'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── State: Completed ── */}
            {tourState === 'completed' && (
              <div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  Tour Complete! 🎉
                </p>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                >
                  Thank you for visiting! You can call me anytime by clicking &ldquo;Ask Yoshinon&rdquo; in the profile card or tapping my mascot below. Have fun exploring!
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={onDismiss}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all cursor-pointer"
                    style={{ backgroundColor: 'var(--color-yoshino-green)' }}
                  >
                    Got it! ❄️
                  </button>
                </div>
              </div>
            )}

            {/* Speech bubble arrow pointer */}
            <div
              className="absolute -bottom-2 right-8 w-4 h-4 rotate-45 border-r border-b"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(59, 157, 210, 0.25)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mascot Floating Action Button ── */}
      <motion.button
        onClick={isBubbleOpen ? onDismiss : onOpenWelcome}
        aria-label={isBubbleOpen ? 'Minimize Yoshinon' : 'Ask Yoshinon for a tour'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative group flex items-center justify-center rounded-full p-1 cursor-pointer focus:outline-none transition-shadow"
        style={{
          width: '72px',
          height: '72px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '2px solid rgba(16, 184, 126, 0.4)',
          boxShadow: '0 8px 24px rgba(30, 55, 110, 0.16), 0 0 16px rgba(16, 184, 126, 0.25)',
        }}
      >
        <YoshinonAvatar className="w-14 h-14" isWaving={tourState === 'welcome'} />

        {/* Glow badge ping when minimized and idle */}
        {!isBubbleOpen && (
          <span
            className="absolute -top-1 -right-1 flex h-4 w-4"
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] text-white font-bold items-center justify-center">
              ?
            </span>
          </span>
        )}
      </motion.button>
    </aside>
  );
}
