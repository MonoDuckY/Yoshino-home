// Navbar — Fixed top navigation
// DEC-07: Full English UI | DEC-09: Light theme | DEC-08: Comfortable spacing
import React from 'react';

interface NavbarProps {
  snowActive: boolean;
  onSnowToggle: () => void;
}

const NAV_LINKS = [
  { label: 'Profile',  href: '#hero'    },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Credits',  href: '#footer'  },
];

export function Navbar({ snowActive, onSnowToggle }: NavbarProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{
        height: 'var(--spacing-navbar)',
        backgroundColor: 'rgba(236, 241, 251, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(59, 157, 210, 0.12)',
        boxShadow: '0 1px 20px rgba(30, 55, 110, 0.06)',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        className="flex items-center gap-2.5 no-underline select-none"
        aria-label="Yoshino's Home — back to top"
      >
        <span
          aria-hidden="true"
          style={{ color: 'var(--color-ice-blue)', fontSize: '1.1rem' }}
        >
          ❄
        </span>
        <span
          className="text-base font-semibold tracking-widest hidden sm:block"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
          }}
        >
          Yoshino&apos;s Home
        </span>
      </a>

      {/* Navigation links */}
      <nav aria-label="Primary navigation">
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-sm font-medium tracking-wide no-underline transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-ice-blue)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--color-text-secondary)')
                }
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
        aria-label={snowActive ? 'Turn off snowfall' : 'Turn on snowfall'}
        aria-pressed={snowActive}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer border"
        style={{
          fontFamily: 'var(--font-body)',
          borderColor: snowActive
            ? 'var(--color-ice-blue)'
            : 'var(--color-border)',
          color: snowActive
            ? 'var(--color-ice-blue)'
            : 'var(--color-text-secondary)',
          backgroundColor: snowActive
            ? 'rgba(59, 157, 210, 0.08)'
            : 'transparent',
        }}
      >
        <span aria-hidden="true">❄</span>
        <span className="hidden sm:inline">
          {snowActive ? 'Snow On' : 'Snow Off'}
        </span>
      </button>
    </header>
  );
}
