import { useContext } from "react";
import { GameContext } from "../contexts/Game";
import { Square } from "./Square";

const Board = () => {
  const { history, stepNumber, handleSquareClick } = useContext(GameContext);

  const { squares } = history[stepNumber];

  return (
    <div>
      {Array(3)
        .fill(null)
        .map((_value, rowIndex) => (
          <div className="board-row">
            {Array(3)
              .fill(null)
              .map((_value, columnIndex) => {
                const i = 3 * rowIndex + columnIndex;

                return (
                  <Square
                    value={squares[i]}
                    onClick={() => handleSquareClick(i)}
                  />
                );
              })}
          </div>
        ))}
    </div>
  );
};

export { Board };
