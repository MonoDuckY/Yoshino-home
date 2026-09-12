import { useState } from 'react';
import { SnowCanvas } from './components/ui/SnowCanvas';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { DataSection } from './components/sections/DataSection';
import { GallerySection } from './components/sections/GallerySection';
import { GuestbookSection } from './components/sections/GuestbookSection';
import { Footer } from './components/sections/Footer';
import { YoshinonMascot } from './components/ui/YoshinonMascot';
import { useTourGuide } from './hooks/useTourGuide';

function App() {
  const [snowActive, setSnowActive] = useState(true);
  const {
    tourState,
    currentStep,
    currentStepIndex,
    totalSteps,
    openWelcome,
    startTour,
    nextStep,
    prevStep,
    dismissTour,
  } = useTourGuide();

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
        <HeroSection onCallYoshinon={openWelcome} />
        <DataSection />
        <GallerySection />
        <GuestbookSection />
      </main>

      <Footer />

      {/* Layer 3: Yoshinon Tour Guide Mascot (fixed bottom-right) */}
      <YoshinonMascot
        tourState={tourState}
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        onStartTour={startTour}
        onNextStep={nextStep}
        onPrevStep={prevStep}
        onDismiss={dismissTour}
        onOpenWelcome={openWelcome}
      />
    </div>
  );
}

export default App;
