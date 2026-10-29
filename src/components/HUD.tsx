import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { levels } from '../data/levels';
import { DoorOpen, RotateCcw, Sparkles } from 'lucide-react';

const HUD: React.FC = () => {
  const { currentLevel, score, gameState, loadLevel, solvedQuestions, playerPosition } = useGameStore();

  const currentLevelData = levels[currentLevel];
  const solvedCount = currentLevelData.questions.filter((question) => solvedQuestions.has(question.id)).length;
  const nearExit = playerPosition ? Math.hypot(playerPosition.x - 8, playerPosition.z - 8) < 1.25 : false;
  const objective = solvedCount < currentLevelData.questions.length
    ? `Намерете и решете ${currentLevelData.questions.length - solvedCount} ${currentLevelData.questions.length - solvedCount === 1 ? 'проверка' : 'проверки'}.`
    : nearExit
      ? 'Изходът е отключен — натиснете E.'
      : 'Всички проверки са решени. Намерете червената врата.';

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
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-500" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {currentLevelData?.name}
              </h1>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Ниво {currentLevel} от 3 · {score} точки</p>
              <p>Проверки: {solvedCount}/{currentLevelData.questions.length}</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-4 shadow-lg pointer-events-auto">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Контроли</h3>
            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
              <p>WASD или Стрелки: Движение</p>
              <p><kbd className="rounded bg-gray-200 px-1 dark:bg-gray-700">E</kbd>: Проверка / изход</p>
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
              <RotateCcw size={14} className="inline mr-1" />Рестарт
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 rounded-lg px-4 py-2 inline-block">
          {objective}
        </p>
      </div>

      {gameState === 'won' && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/70 px-4 pointer-events-auto">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-gray-800">
            <DoorOpen className="mx-auto mb-3 text-emerald-500" size={40} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ниво завършено!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Отлично! Решихте всички проверки и спечелихте {score} точки.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={handleRestartLevel} className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100">
                Играй отново
              </button>
              {currentLevel < 3 && (
                <button onClick={handleNextLevel} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                  Следващо ниво
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HUD;