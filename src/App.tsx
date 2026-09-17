import { useState } from 'react';
import { SnowCanvas } from './components/ui/SnowCanvas';
import { Navbar } from './components/layout/Navbar';
import { TopSection } from './components/sections/TopSection';
import { GallerySection } from './components/sections/GallerySection';
import { GuestbookSection } from './components/sections/GuestbookSection';
import { Footer } from './components/sections/Footer';
import { YoshinonMascot } from './components/ui/YoshinonMascot';
import { CreditsModal } from './components/ui/CreditsModal';
import { useTourGuide } from './hooks/useTourGuide';

function App() {
  const [snowActive, setSnowActive] = useState(true);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
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

      {/* Layer 4: Yoshinon Tour Guide Mascot (fixed bottom-right) */}
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
