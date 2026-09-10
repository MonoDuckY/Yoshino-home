// App.tsx — Yoshino's Home
// DEC-09: Light "Warm Winter Daylight" theme
import { useState } from 'react';
import { SnowCanvas } from './components/ui/SnowCanvas';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { GalleryPlaceholder } from './components/sections/GalleryPlaceholder';
import { Footer } from './components/sections/Footer';

function App() {
  const [snowActive, setSnowActive] = useState(true);

  const handleCallYoshinon = () => {
    // Sprint 4: trigger Yoshinon tour FSM -> 'welcome'
    console.info('[Yoshinon] Tour triggered — Sprint 4');
  };

  return (
    <div
      className="relative"
      style={{ backgroundColor: 'var(--color-winter-sky)' }}
    >
      {/* Layer 0: Snow Canvas (fixed, behind everything) */}
      <SnowCanvas isActive={snowActive} />

      {/* Layer 1: Fixed Navbar */}
      <Navbar
        snowActive={snowActive}
        onSnowToggle={() => setSnowActive((prev) => !prev)}
      />

      {/* Layer 2: Page content */}
      <main>
        <HeroSection onCallYoshinon={handleCallYoshinon} />
        <GalleryPlaceholder />
      </main>

      <Footer />
    </div>
  );
}

export default App;
