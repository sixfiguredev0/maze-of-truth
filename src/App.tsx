import React from 'react';
import GameCanvas from './components/GameCanvas';
import QuizModal from './components/QuizModal';
import HUD from './components/HUD';
import { useGameStore } from './store/useGameStore';

function App() {
  const { currentLevel, loadLevel } = useGameStore();

  // Initialize the game on mount
  React.useEffect(() => {
    if (currentLevel === 1) {
      loadLevel(1);
    }
  }, [currentLevel, loadLevel]);

  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-gray-900">
      {/* 3D Game Canvas */}
      <GameCanvas />
      
      {/* UI Overlays */}
      <HUD />
      <QuizModal />
    </div>
  );
}

export default App;