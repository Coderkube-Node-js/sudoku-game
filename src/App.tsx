import React, { useState, useEffect } from "react";
import Message from '../src/messageComponents'

const App = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [board, setBoard] = useState([]);
  const [hideNum, setHideNum] = useState([]);
  const [wrongNumCount, setWrongNumCount] = useState(0);
  const [correctNumCount, setCorrectNumCount] = useState(0);
  const [isPlayerLost, setIsPlayerLost] = useState(false);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const maxWrongAttempts = 4;

  const shuffleNumbers = () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let shuffledList = [...list];
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    return shuffledList;
  };

  const generateSudokuBoard = () => {
    const sudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(null));
    let shuffledList = shuffleNumbers();

    const map = {};
    for (let i = 1; i <= 9; i++) {
      map[i] = shuffledList[i - 1];
    }

    let hiddenNumbers = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = map[((row * 3 + Math.floor(row / 3) + col) % 9) + 1];
        sudokuBoard[row][col] = num;
        if (Math.random() < 0.2) {
          hiddenNumbers.push({ row, col, num });
          sudokuBoard[row][col] = null;
        }
      }
    }

    setBoard(sudokuBoard);
    setHideNum(hiddenNumbers);
  };

  useEffect(() => {
    generateSudokuBoard();
  }, []);

  const handleCellClick = (row, col) => {
    if (selectedNumber !== null) {
      const newBoard = [...board];
      const matched = hideNum.some(
        (hidden) => hidden.row === row && hidden.col === col && hidden.num === selectedNumber
      );

      if (matched) {
        newBoard[row][col] = <span style={{ color: "blue" }}>{selectedNumber}</span>;
        const updatedCorrectCount = correctNumCount + 1;
        setCorrectNumCount(updatedCorrectCount);
        checkWinCondition(updatedCorrectCount); // Use updated count
      } else {
        newBoard[row][col] = <span style={{ color: "red" }}>{selectedNumber}</span>;
        const updatedWrongCount = wrongNumCount + 1;
        setWrongNumCount(updatedWrongCount);
        checkLoseCondition(updatedWrongCount);
      }

      setBoard(newBoard);
    }
  };

  const checkLoseCondition = (currentWrongCount) => {
    if (currentWrongCount > maxWrongAttempts) {
      setIsPlayerLost(true);
      alert("You have made 5 mistakes and lost this game");
      resetGame();
    }
  };

  const checkWinCondition = (currentCorrectCount) => {
    // Total hidden numbers is dynamic, based on the length of hideNum
    if (currentCorrectCount === hideNum.length) {
      alert("You won the game!");
      resetGame();
    }
  };

  const resetGame = () => {
    setWrongNumCount(0);
    setCorrectNumCount(0);
    generateSudokuBoard();
  };

  const isInitialCell = (row, col) => {
    return board[row][col] !== null;
  };

  const isBoldCell = (row, col) => {
    return (Math.floor(row / 3) + Math.floor(col / 3)) % 2 === 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
   
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
          <div className="w-full max-w-[500px]">
            <div className="aspect-square">
              <div className="grid grid-cols-9 gap-[1px] bg-gray-300 p-[1px] border-2 border-gray-800">
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() =>
                        !isInitialCell(rowIndex, colIndex) &&
                        handleCellClick(rowIndex, colIndex)
                      }
                      className={`aspect-square bg-white flex items-center justify-center text-xl font-medium
                        ${isInitialCell(rowIndex, colIndex) ? "font-bold text-gray-800" : "text-blue-600"}
                        ${selectedNumber === cell ? "bg-blue-50" : ""}
                        ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? "border-b-2 border-gray-800" : ""}
                        ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? "border-r-2 border-gray-800" : ""}
                        ${!isInitialCell(rowIndex, colIndex) && "hover:bg-blue-50 transition-colors"}`}
                    >
                      {cell}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full max-w-[200px]">
            {numbers.map((number) => (
              <button
                key={number}
                onClick={() => setSelectedNumber(number)}
                className={`aspect-square rounded-xl text-2xl font-bold ${
                  selectedNumber === number
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                } shadow-sm transition-all`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default App;
