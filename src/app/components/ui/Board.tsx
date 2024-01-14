import Square from "./Square";
import calculateWinner from "./utils/calculateWinner";
import calculateWinningPlayer from "./utils/calculateWinningPlayer";

interface BoardData {
  xIsNext: boolean;
  squares: string[];
  onPlay: (e: string[]) => void;
}

export default function Board({ xIsNext, squares, onPlay }: BoardData) {

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    const winner = calculateWinner(nextSquares);
    // Changes winning squares to say winner: don't want
    // if (winner) {
    //   const [a, b, c] = winner;
    //   nextSquares[a] = nextSquares[b] = nextSquares[c] = "winner";
    // }

    onPlay(nextSquares);
  }
  const winner = calculateWinningPlayer(squares);
  // const winner = calculateWinner(squares);
  // let status;
  // status = winner
  //   ? "Winner: " + winner
  //   : "Next player: " + (xIsNext ? "X" : "O");

  const winnerSquares = calculateWinner(squares);
  let status;
  status = winnerSquares;
  if (winnerSquares) {
    status = "Winner: " + winner;
  } else {
    status = calculateDraw(squares) ? "It's a draw!" : "Next player: " + (xIsNext ? "X" : "O");
  }

  function calculateDraw(squares : any) {
    return squares.every((square : any) => square !== null);
  }

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      const isWinnerSquare = winnerSquares && winnerSquares.includes(squareIndex);
      squaresInRow.push(
        <div key={`square-${row}-${col}`} className="flex gap-2">
          <Square
            key={squareIndex}
            value={squares[squareIndex]}
            onSquareClick={() => handleClick(squareIndex)}
            isWinnerSquare={isWinnerSquare}
          />
        </div>
        
      );
    }
    boardRows.push(
      <div key={`row-${row}`} className="board-row flex">
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}