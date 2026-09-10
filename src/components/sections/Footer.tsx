// Footer — Cozy Hearth | spec/REQUIREMENTS.md §4.3, §5.1
// Legal disclaimer (phi thương mại) bắt buộc — NFR 4.3
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
        {/* Legal disclaimer — bắt buộc theo NFR §4.3 */}
        <p
          className="text-xs leading-relaxed max-w-2xl"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-mist)' }}
        >
          Date A Live và nhân vật Yoshino Himekawa thuộc bản quyền của tác giả{' '}
          <span style={{ color: 'var(--color-text-snow)' }}>Koushi Tachibana</span>, họa sĩ{' '}
          <span style={{ color: 'var(--color-text-snow)' }}>Tsunako</span> và nhà xuất bản{' '}
          <span style={{ color: 'var(--color-text-snow)' }}>KADOKAWA Corporation</span>.
          Toàn bộ tác phẩm nghệ thuật thuộc quyền sở hữu của các họa sĩ tương ứng.
        </p>

        <div
          style={{ width: '4rem', height: '1px', backgroundColor: 'rgba(125,211,252,0.15)' }}
        />

        <p
          className="text-xs"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(148,163,184,0.5)' }}
        >
          Fan-made Non-profit Tribute &bull; Thiết kế &amp; phát triển với ❤
        </p>
      </div>
    </footer>
  );
}
