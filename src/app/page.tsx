"use client"
import { SetStateAction, useState } from "react";
import Board from './components/ui/Board';
import calculateWinningPlayer from "./components/ui/utils/calculateWinningPlayer";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true);

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState(false);

  const [matchHistory, setMatchHistory] = useState({
    players1: { wins: 0, losses: 0 },
    player2: { wins: 0, losses:0 },
  });



  function handlePlay(nextSquares: string[]) {
    const currentWinner = calculateWinningPlayer(nextSquares);
    const isDraw = !currentWinner && nextSquares.every(square => square !== null);

    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(history.length);
    setGameOver(!!currentWinner || isDraw); // Use !!winner to convert winner to a boolean
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setGameOver(false);
  }

  function jumpTo(nextMove: SetStateAction<number>) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_squares, move) => {
    const description = move > 0 ? `Go to move #${move} (${calculateRowCol(move)})` : "Go to game start";

    return (
      <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function calculateRowCol(move : any) {
    const row = Math.floor((move - 1) / 3) + 1;
    const col = (move - 1) % 3 + 1;
    return `${row}, ${col}`;
  }

  const sortButton = (
    <button className="flex flex-col" onClick={() => setIsAscending(!isAscending)}>
                Sort {isAscending ? 'Descending' : 'Ascending'}
              </button>
  );

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <main className="mx-auto flex flex-col items-center justify-around gap-4 ">
      <h1 className="font-bold text-6xl my-20 ">Tic-Tac-Toe</h1>
      <div className="game flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> 
          </div>
          {gameOver && <button className="btn btn-square btn-lg"onClick={resetGame}>Reset Game</button>}
        </div>
        <div className="game-info flex flex-col gap-10">
          <button className="" onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? 'Hide History' : 'Show History'}            
          </button>
          {showHistory && (
            <div className="flex flex-row gap-4">
              {sortButton}
              <ol className="flex flex-col gap-2">{sortedMoves}</ol>
            </div>
          )}
        </div>
      </div>
    </main>
    
  );
}