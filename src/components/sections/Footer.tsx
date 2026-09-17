// Footer — Minimalist Non-Commercial Tribute Footnote
// Tier 1: Minimal Footer with quick links to Credits & Disclaimer modal, GitHub, and Removal Contact

interface FooterProps {
  onOpenCredits: () => void;
}

const GITHUB_REPO_URL = 'https://github.com/MonoDuckY/Yoshino-home';

export function Footer({ onOpenCredits }: FooterProps) {
  return (
    <footer
      id="footer"
      className="relative w-full py-8 px-6 border-t"
      style={{
        backgroundColor: 'rgba(11, 19, 43, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        zIndex: 2,
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 text-center">
        {/* Line 1: Fan-made tribute declaration */}
        <p
          className="text-xs sm:text-[13px] font-medium tracking-wide text-slate-300"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          &copy; 2026 <span className="font-semibold text-white">Yoshino&apos;s Home</span> &bull; Fan-made tribute project.
        </p>

        {/* Line 2: Original IP attribution */}
        <p
          className="text-[11px] sm:text-xs text-slate-400 max-w-2xl leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Date A Live belongs to{' '}
          <span className="text-slate-300 font-medium">Koushi Tachibana</span> /{' '}
          <span className="text-slate-300 font-medium">Tsunako</span> /{' '}
          <span className="text-slate-300 font-medium">KADOKAWA</span>. All featured artwork belongs to their respective creators.
        </p>

        {/* Line 3: Interactive Quick Links */}
        <div
          className="flex items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-medium text-slate-400"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <button
            type="button"
            onClick={onOpenCredits}
            className="hover:text-sky-300 transition-colors duration-200 cursor-pointer underline underline-offset-4 decoration-sky-400/40 hover:decoration-sky-300"
          >
            Credits &amp; Disclaimer
          </button>

          <span className="text-slate-600 select-none">&bull;</span>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition-colors duration-200 no-underline"
          >
            GitHub
          </a>

          <span className="text-slate-600 select-none">&bull;</span>

          <button
            type="button"
            onClick={onOpenCredits}
            className="hover:text-emerald-300 transition-colors duration-200 cursor-pointer text-slate-400"
          >
            Contact &amp; Removal
          </button>
        </div>
      </div>
    </footer>
  );
}

