const list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let shuffledList: number[] = [];

function shuffleNumbers(): number[] {
  if (shuffledList.length === 0) {
    shuffledList = [...list];
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
  }
  return [...shuffledList];
}

function GenerateSudokuBoard(): number[][] {
  const sudokuBoard: number[][] = Array(9).fill([]).map(() => Array(9).fill(0)); 

  const newShuffledList: number[] = shuffleNumbers(); 
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      sudokuBoard[row][col] = ((row * 3 + Math.floor(row / 3) + col) % 9) + 1;
    }
  }

  const map: { [key: number]: number } = {};
  for (let i = 1; i <= 9; i++) {
    map[i] = newShuffledList[i - 1]; 
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      sudokuBoard[row][col] = map[sudokuBoard[row][col]];
    }
  }

  return sudokuBoard;
}

export default GenerateSudokuBoard;
