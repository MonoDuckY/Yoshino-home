// Footer - Cozy Hearth | spec/REQUIREMENTS.md §4.3, §5.1
export function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full py-10 px-6"
      style={{
        backgroundColor: 'rgba(5, 10, 20, 0.6)',
        borderTop: '1px solid rgba(125,211,252,0.08)',
        zIndex: 2,
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-xs leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-mist)' }}>
          Date A Live va nhan vat Yoshino Himekawa thuoc ban quyen cua tac gia{' '}
          <span style={{ color: 'var(--color-text-snow)' }}>Koushi Tachibana</span>,
          hoa si <span style={{ color: 'var(--color-text-snow)' }}>Tsunako</span> va nha xuat ban{' '}
          <span style={{ color: 'var(--color-text-snow)' }}>KADOKAWA Corporation</span>.
          Toan bo tac pham nghe thuat thuoc quyen so huu cua cac hoa si tuong ung.
        </p>
        <div style={{ width: '4rem', height: '1px', backgroundColor: 'rgba(125,211,252,0.15)' }} />
        <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: 'rgba(148,163,184,0.5)' }}>
          Fan-made Non-profit Tribute &bull; Thiet ke &amp; phat trien voi tam long
        </p>
      </div>
    </footer>
  );
}
