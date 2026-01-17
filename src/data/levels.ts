export interface Level {
  name: string;
  theme: 'newsroom' | 'server' | 'ailab';
  grid: number[][];
  questions: {
    id: string;
    position: { x: number; z: number };
    text: string;
    options: { text: string; correct: boolean }[];
  }[];
}

export const levels: Record<1 | 2 | 3, Level> = {
  1: {
    name: "Новинарската Стая",
    theme: "newsroom",
    grid: [
      // Row 0 (z=0)
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // Row 1 (z=1)
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      // Row 2 (z=2) - Player start at (2, 2)
      [1, 0, 2, 0, 1, 0, 0, 0, 0, 1],
      // Row 3 (z=3) - Question node at (3, 3)
      [1, 0, 0, 0, 1, 0, 3, 0, 0, 1],
      // Row 4 (z=4) - Question node at (7, 4)
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      // Row 5 (z=5) - Interior walls
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      // Row 6 (z=6) - Question node at (4, 6)
      [1, 0, 0, 0, 1, 0, 0, 3, 0, 1],
      // Row 7 (z=7)
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      // Row 8 (z=8) - Exit door at (8, 8)
      [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
      // Row 9 (z=9)
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    questions: [
      {
        id: 'q1-1',
        position: { x: 3, z: 3 },
        text: "Кое заглавие е 'clickbait'?",
        options: [
          { text: "ШОК! Няма да повярвате какво стана...", correct: true },
          { text: "Доклад за времето", correct: false },
          { text: "Новини за икономиката", correct: false },
          { text: "Времето днес", correct: false }
        ]
      },
      {
        id: 'q1-2',
        position: { x: 7, z: 4 },
        text: "Коя е основната цел на 'clickbait' заглавията?",
        options: [
          { text: "Да информират точно", correct: false },
          { text: "Да привлекат кликове и внимание", correct: true },
          { text: "Да образоват читателите", correct: false },
          { text: "Да продават продукти", correct: false }
        ]
      },
      {
        id: 'q1-3',
        position: { x: 4, z: 6 },
        text: "Какво трябва да направите, когато видите 'clickbait' заглавие?",
        options: [
          { text: "Веднага да кликнете", correct: false },
          { text: "Да проверите източника и да потърсите факти", correct: true },
          { text: "Да споделите с приятели", correct: false },
          { text: "Да повярвате на всичко", correct: false }
        ]
      }
    ]
  },
  
  2: {
    name: "Сървърната Зала",
    theme: "server",
    grid: [
      // Row 0
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // Row 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      // Row 2 - Player start at (2, 2)
      [1, 0, 2, 0, 1, 0, 0, 0, 0, 1],
      // Row 3
      [1, 0, 0, 0, 1, 0, 3, 0, 0, 1],
      // Row 4
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      // Row 5
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      // Row 6 - Question at (4, 6)
      [1, 0, 0, 0, 1, 0, 0, 3, 0, 1],
      // Row 7
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      // Row 8 - Exit at (8, 8)
      [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
      // Row 9
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    questions: [
      {
        id: 'q2-1',
        position: { x: 3, z: 3 },
        text: "Какво е 'deepfake' технология?",
        options: [
          { text: "Технология за създаване на фалшиви видеа", correct: true },
          { text: "Вирус за компютри", correct: false },
          { text: "Социална мрежа", correct: false },
          { text: "Игра на компютър", correct: false }
        ]
      },
      {
        id: 'q2-2',
        position: { x: 4, z: 6 },
        text: "Как да разпознаете deepfake видео?",
        options: [
          { text: "По лошото качество", correct: false },
          { text: "По неестествените движения на очите и устата", correct: true },
          { text: "По цветовете", correct: false },
          { text: "По музиката", correct: false }
        ]
      }
    ]
  },
  
  3: {
    name: "AI Лабораторията",
    theme: "ailab",
    grid: [
      // Row 0
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // Row 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      // Row 2 - Player start at (2, 2)
      [1, 0, 2, 0, 1, 0, 0, 0, 0, 1],
      // Row 3
      [1, 0, 0, 0, 1, 0, 3, 0, 0, 1],
      // Row 4
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      // Row 5
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      // Row 6 - Question at (4, 6)
      [1, 0, 0, 0, 1, 0, 0, 3, 0, 1],
      // Row 7
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      // Row 8 - Exit at (8, 8)
      [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
      // Row 9
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    questions: [
      {
        id: 'q3-1',
        position: { x: 3, z: 3 },
        text: "Какво е AI-generated съдържание?",
        options: [
          { text: "Съдържание създадено от изкуствения интелект", correct: true },
          { text: "Съдържание от социални мрежи", correct: false },
          { text: "Съдържание от вестници", correct: false },
          { text: "Съдържание от телевизията", correct: false }
        ]
      },
      {
        id: 'q3-2',
        position: { x: 4, z: 6 },
        text: "Как да проверите дали текст е генериран от AI?",
        options: [
          { text: "По дължината на текста", correct: false },
          { text: "По липсата на грешки и твърде перфектния стил", correct: true },
          { text: "По цветовете", correct: false },
          { text: "По размера на шрифта", correct: false }
        ]
      }
    ]
  }
};