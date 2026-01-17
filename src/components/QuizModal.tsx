import React from 'react';
import { X } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

const QuizModal: React.FC = () => {
  const { 
    gameState, 
    setGameState, 
    currentLevel, 
    addScore, 
    solvedQuestions,
    markQuestionSolved 
  } = useGameStore();

  // Import levels data to get current question
  const [currentQuestion, setCurrentQuestion] = React.useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [isShaking, setIsShaking] = React.useState(false);

  React.useEffect(() => {
    if (gameState === 'quiz') {
      // Get current level questions
      import('../data/levels').then(({ levels }) => {
        const level = levels[currentLevel];
        if (level && level.questions.length > 0) {
          // Find first unsolved question
          const unsolvedQuestion = level.questions.find(
            (q: any) => !solvedQuestions.has(q.id)
          );
          if (unsolvedQuestion) {
            setCurrentQuestion(unsolvedQuestion);
          }
        }
      });
    }
  }, [gameState, currentLevel, solvedQuestions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const isAnswerCorrect = currentQuestion.options[answerIndex].correct;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      // Correct answer
      setTimeout(() => {
        if (currentQuestion) {
          markQuestionSolved(currentQuestion.id);
          addScore(10);
        }
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestion(null);
        setGameState('playing');
      }, 2000);
    } else {
      // Wrong answer - show shake animation and reset
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setShowResult(false);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  const handleClose = () => {
    if (!showResult) {
      setGameState('playing');
      setCurrentQuestion(null);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (gameState !== 'quiz' || !currentQuestion) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 transform transition-transform duration-300 ${
          isShaking ? 'animate-pulse' : ''
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Въпрос {currentLevel}
          </h2>
          {!showResult && (
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Question */}
        <div className="mb-6">
          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
            {currentQuestion.text}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option: any, index: number) => {
            let buttonClass = "w-full p-3 text-left rounded-lg border transition-colors duration-200 ";
            
            if (showResult) {
              if (option.correct) {
                buttonClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-400 dark:text-green-200";
              } else if (selectedAnswer === index) {
                buttonClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-400 dark:text-red-200";
              } else {
                buttonClass += "bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400";
              }
            } else {
              buttonClass += "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={buttonClass}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        {/* Result Message */}
        {showResult && (
          <div className="mt-6 text-center">
            {isCorrect ? (
              <div className="text-green-600 dark:text-green-400">
                <p className="font-semibold">Правилно! +10 точки</p>
                <p className="text-sm mt-1">Продължавайте...</p>
              </div>
            ) : (
              <div className="text-red-600 dark:text-red-400">
                <p className="font-semibold">Грешен отговор!</p>
                <p className="text-sm mt-1">Опитайте отново...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;