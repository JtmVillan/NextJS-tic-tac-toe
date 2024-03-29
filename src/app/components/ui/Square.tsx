interface SquareData {
  value: string;
  onSquareClick: () => void;
  isWinnerSquare: boolean | null;
}

export default function Square({ value, onSquareClick, isWinnerSquare}: SquareData) {
  // Define the standard classes
  const standardClasses = "btn btn-square btn-lg";

  // Define the conditional classes for background color
  const backgroundColorClass = isWinnerSquare ? "btn-primary" : "";

  // Concatenate the classes based on conditions
  const combinedClasses = `${standardClasses} ${backgroundColorClass}`;

  return (
  <button className={combinedClasses} onClick={onSquareClick}>
      {value}
    </button>
  );
}