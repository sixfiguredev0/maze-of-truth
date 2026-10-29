import { create } from 'zustand';

export type GameState = 'playing' | 'quiz' | 'won';
export type CurrentLevel = 1 | 2 | 3;

interface PlayerPosition {
  x: number;
  z: number;
}

interface GameStore {
  // State
  currentLevel: CurrentLevel;
  gameState: GameState;
  score: number;
  solvedQuestions: Set<string>;
  playerPosition: PlayerPosition | null;
  currentGrid: number[][];
  
  // Actions
  setGameState: (state: GameState) => void;
  addScore: (points: number) => void;
  movePlayer: (position: PlayerPosition) => void;
  markQuestionSolved: (questionId: string) => void;
  loadLevel: (levelNumber: CurrentLevel) => void;
  initializePlayerPosition: (grid: number[][]) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  currentLevel: 1,
  gameState: 'playing',
  score: 0,
  solvedQuestions: new Set(),
  playerPosition: null,
  currentGrid: [],
  
  // Actions
  setGameState: (state: GameState) => {
    set({ gameState: state });
  },
  
  addScore: (points: number) => {
    set((state) => ({ score: state.score + points }));
  },
  
  movePlayer: (position: PlayerPosition) => {
    set({ playerPosition: position });
  },
  
  markQuestionSolved: (questionId: string) => {
    set((state) => {
      const newSolvedQuestions = new Set(state.solvedQuestions);
      newSolvedQuestions.add(questionId);
      return { solvedQuestions: newSolvedQuestions };
    });
  },
  
  loadLevel: (levelNumber: CurrentLevel) => {
    // Import levels data dynamically to avoid circular imports
    import('../data/levels').then(({ levels }) => {
      const level = levels[levelNumber];
      if (level) {
        set({ 
          currentLevel: levelNumber,
          currentGrid: level.grid,
          gameState: 'playing',
          solvedQuestions: new Set(),
          playerPosition: null
        });
        // Initialize player position for the new level
        get().initializePlayerPosition(level.grid);
      }
    });
  },
  
  initializePlayerPosition: (grid: number[][]) => {
    // Scan the grid for player start position (value 2)
    for (let x = 0; x < grid.length; x++) {
      for (let z = 0; z < grid[x].length; z++) {
        if (grid[x][z] === 2) {
          set({ playerPosition: { x, z } });
          console.log(`Player initialized at position: (${x}, ${z})`);
          return;
        }
      }
    }
    // Fallback warning if no spawn found
    console.warn("No player start (2) found in grid! Using default position (0, 0)");
    set({ playerPosition: { x: 0, z: 0 } });
  },
}));