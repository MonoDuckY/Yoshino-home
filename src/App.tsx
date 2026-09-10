// App.tsx - Yoshino's Home — Sprint 2
import { useState } from 'react';
import { SnowCanvas } from './components/ui/SnowCanvas';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { GalleryPlaceholder } from './components/sections/GalleryPlaceholder';
import { Footer } from './components/sections/Footer';

function App() {
  const [snowActive, setSnowActive] = useState(true);

  const handleCallYoshinon = () => {
    // Sprint 4: will trigger Yoshinon FSM state -> 'welcome'
    console.info('[Yoshinon] Tour triggered - Sprint 4');
  };

  return (
    <div className="relative" style={{ backgroundColor: 'var(--color-deep-winter)' }}>
      <SnowCanvas isActive={snowActive} />
      <Navbar
        snowActive={snowActive}
        onSnowToggle={() => setSnowActive((prev) => !prev)}
      />
      <main>
        <HeroSection onCallYoshinon={handleCallYoshinon} />
        <GalleryPlaceholder />
      </main>
      <Footer />
    </div>
  );
}

export default App;
