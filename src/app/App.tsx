import { useState } from 'react';
import { Hero } from './components/Hero';
import { PhaseHub } from './components/PhaseHub';
import { GamePage } from './components/GamePage';
import { Credits } from './components/Credits';
import { PhaseModal } from './components/PhaseModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'game'>('home');
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [activeGamePhase, setActiveGamePhase] = useState<number | null>(null);

  const handlePlayPhase = (phaseId: number) => {
    setSelectedPhase(null);
    setActiveGamePhase(phaseId);
    setCurrentView('game');
  };

  const handleBackToHub = () => {
    setCurrentView('home');
    setActiveGamePhase(null);
  };

  if (currentView === 'game' && activeGamePhase !== null) {
    return <GamePage phaseId={activeGamePhase} onBack={handleBackToHub} />;
  }

  return (
    <div className="size-full bg-background overflow-y-auto">
      <Hero />
      <PhaseHub onPhaseClick={setSelectedPhase} />
      <Credits />

      {selectedPhase !== null && (
        <PhaseModal
          phaseId={selectedPhase}
          onClose={() => setSelectedPhase(null)}
          onPlay={() => handlePlayPhase(selectedPhase)}
        />
      )}
    </div>
  );
}
