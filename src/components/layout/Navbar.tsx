// Navbar - Fixed top navigation
// spec/REQUIREMENTS.md §5.1 | h:64px | backdrop-blur:12px | z-50
import React from 'react';

interface NavbarProps {
  snowActive: boolean;
  onSnowToggle: () => void;
}

const NAV_LINKS = [
  { label: 'Ho so', href: '#hero' },
  { label: 'Phong tranh', href: '#gallery' },
  { label: 'Credit & Nguon', href: '#footer' },
];

export function Navbar({ snowActive, onSnowToggle }: NavbarProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      style={{
        height: 'var(--spacing-navbar)',
        backgroundColor: 'rgba(11, 19, 37, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(125, 211, 252, 0.08)',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        className="flex items-center gap-2 no-underline select-none"
        aria-label="Yoshino's Home"
      >
        <span aria-hidden="true" style={{ color: 'var(--color-ice-blue)', fontSize: '1.1rem' }}>❄</span>
        <span
          className="text-base font-semibold tracking-widest hidden sm:block"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-snow)' }}
        >
          Yoshino&apos;s Home
        </span>
      </a>

      {/* Navigation links */}
      <nav aria-label="Navigation chinh">
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-sm tracking-wider no-underline transition-colors duration-200"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-mist)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ice-blue)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-mist)')}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Snow toggle */}
      <button
        onClick={onSnowToggle}
        aria-label={snowActive ? 'Tat tuyet roi' : 'Bat tuyet roi'}
        aria-pressed={snowActive}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer border"
        style={{
          fontFamily: 'var(--font-body)',
          borderColor: snowActive ? 'var(--color-ice-blue)' : 'rgba(125,211,252,0.3)',
          color: snowActive ? 'var(--color-ice-blue)' : 'var(--color-text-mist)',
          backgroundColor: snowActive ? 'rgba(125,211,252,0.08)' : 'transparent',
        }}
      >
        <span aria-hidden="true">❄</span>
        <span className="hidden sm:inline">{snowActive ? 'Tat tuyet' : 'Bat tuyet'}</span>
      </button>
    </header>
  );
}
