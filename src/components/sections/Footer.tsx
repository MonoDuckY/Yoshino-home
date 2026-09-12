// Footer — Cozy Hearth
// DEC-07: English | DEC-09: Light theme | DEC-11: Unified Background & Continuous Snow | spec §4.3, §5.1
export function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full py-12 px-6"
      style={{
        backgroundColor: 'transparent',
        borderTop: '1px solid rgba(59,157,210,0.14)',
        zIndex: 2,
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 text-center">
        {/* Legal disclaimer — required by NFR §4.3 */}
        <p
          className="text-xs leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Date A Live and the character Yoshino Himekawa are intellectual property of{' '}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Koushi Tachibana</span>,
          illustrator{' '}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Tsunako</span>,
          and publisher{' '}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>KADOKAWA Corporation</span>.
          All artwork belongs to their respective artists. This is a non-commercial fan tribute.
        </p>

        <div
          style={{
            width: '3rem',
            height: '1px',
            backgroundColor: 'rgba(59,157,210,0.2)',
          }}
        />

        <p
          className="text-xs"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          Fan-made Non-profit Tribute &bull; Designed &amp; built with ❤
        </p>
      </div>
    </footer>
  );
}
