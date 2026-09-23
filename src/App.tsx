import { useState } from 'react';
import { SnowCanvas } from './components/ui/SnowCanvas';
import { Navbar } from './components/layout/Navbar';
import { TopSection } from './components/sections/TopSection';
import { GallerySection } from './components/sections/GallerySection';
import { GuestbookSection } from './components/sections/GuestbookSection';
import { Footer } from './components/sections/Footer';
import { CreditsModal } from './components/ui/CreditsModal';

function App() {
  const [snowActive, setSnowActive] = useState(true);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  return (
    <div
      className="relative"
      style={{ backgroundColor: 'var(--color-winter-sky)' }}
    >
      {/* Layer 0: Crystalline Snow Canvas (Behind content, visible through frosted glass) */}
      <SnowCanvas isActive={snowActive} />

      {/* Layer 1: Fixed Navbar */}
      <Navbar
        snowActive={snowActive}
        onSnowToggle={() => setSnowActive((prev) => !prev)}
        onOpenCredits={() => setIsCreditsOpen(true)}
      />

      {/* Layer 2: Page content */}
      <main>
        <TopSection />
        <GallerySection />
        <GuestbookSection />
      </main>

      <Footer onOpenCredits={() => setIsCreditsOpen(true)} />

      {/* Layer 3: Credits & Disclaimer Slide-Over/Dialog Modal */}
      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />
    </div>
  );
}

export default App;
