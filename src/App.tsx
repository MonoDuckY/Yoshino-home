// ─────────────────────────────────────────────
// App.tsx — Yoshino's Home
// Sprint 1: Scaffold + Snow Canvas verification
// ─────────────────────────────────────────────
import { useState } from 'react';
import { SnowCanvas } from './components/ui/SnowCanvas';

function App() {
  const [snowActive, setSnowActive] = useState(true);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-deep-winter)' }}>
      {/* Snow Canvas — fixed, behind everything */}
      <SnowCanvas isActive={snowActive} />

      {/* Temporary Sprint 1 verification UI — replaced in Sprint 2 */}
      <div className="relative flex flex-col items-center justify-center min-h-screen gap-6" style={{ zIndex: 1 }}>
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--color-ice-blue)' }}
        >
          Spirit No. 02 · The Hermit
        </p>

        <h1
          className="text-5xl font-bold tracking-widest text-center"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-snow)',
          }}
        >
          HIMEKAWA YOSHINO
        </h1>

        <p style={{ color: 'var(--color-text-mist)', fontFamily: 'var(--font-display)' }}>
          氷芽川 四糸乃
        </p>

        <button
          onClick={() => setSnowActive((prev) => !prev)}
          className="mt-8 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          style={{
            border: '1px solid var(--color-ice-blue)',
            color: snowActive ? 'var(--color-deep-winter)' : 'var(--color-ice-blue)',
            backgroundColor: snowActive ? 'var(--color-ice-blue)' : 'transparent',
            fontFamily: 'var(--font-body)',
          }}
        >
          {snowActive ? '❄ Tắt tuyết rơi' : '❄ Bật tuyết rơi'}
        </button>

        <p className="text-xs mt-4" style={{ color: 'var(--color-text-mist)' }}>
          Sprint 1 ✓ — Design Tokens · Snow Canvas · TypeScript Types · Mock Data
        </p>
      </div>
    </div>
  );
}

export default App;
