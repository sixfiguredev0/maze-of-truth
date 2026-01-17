import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { levels } from '../data/levels';

const HUD: React.FC = () => {
  const { currentLevel, score, gameState, loadLevel } = useGameStore();

  const currentLevelData = levels[currentLevel];

  const handleNextLevel = () => {
    if (currentLevel < 3) {
      loadLevel((currentLevel + 1) as 1 | 2 | 3);
    }
  };

  const handleRestartLevel = () => {
    loadLevel(currentLevel);
  };

  const handlePreviousLevel = () => {
    if (currentLevel > 1) {
      loadLevel((currentLevel - 1) as 1 | 2 | 3);
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
      <div className="flex justify-between items-start">
        {/* Game Info Panel */}
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-4 shadow-lg pointer-events-auto">
          <div className="space-y-2">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {currentLevelData?.name}
            </h1>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Ниво: {currentLevel}</p>
              <p>Точки: {score}</p>
              <p>Състояние: {gameState === 'playing' ? 'Играене' : gameState === 'quiz' ? 'Въпрос' : 'Победа'}</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-4 shadow-lg pointer-events-auto">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Контроли</h3>
            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
              <p>WASD или Стрелки: Движение</p>
              <p>E: Взаимодействие</p>
            </div>
          </div>
        </div>
      </div>

      {/* Level Navigation */}
      <div className="mt-4 flex justify-center">
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-3 shadow-lg pointer-events-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousLevel}
              disabled={currentLevel <= 1}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              ← Предишно
            </button>
            
            <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white">
              {currentLevel} / 3
            </span>
            
            <button
              onClick={handleNextLevel}
              disabled={currentLevel >= 3}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Следващо →
            </button>
            
            <button
              onClick={handleRestartLevel}
              className="px-3 py-1 text-sm bg-blue-200 dark:bg-blue-700 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-300 dark:hover:bg-blue-600"
            >
              Рестарт
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 rounded-lg px-4 py-2 inline-block">
          Намерете въпросителните знаци и отговорете правилно, за да отворите изхода!
        </p>
      </div>
    </div>
  );
};

export default HUD;