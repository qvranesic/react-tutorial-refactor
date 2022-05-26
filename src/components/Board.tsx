import { FC, useContext } from "react";
import { GameContext } from "../contexts/Game";
import { Square } from "./Square";

type IBoardProps = {
  readonly?: boolean;
};

const Board: FC<IBoardProps> = ({ readonly }) => {
  const { history, stepNumber, handleSquareClick } = useContext(GameContext);

  const { squares } = history[stepNumber];

  return (
    <div>
      {Array(3)
        .fill(null)
        .map((_value, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {Array(3)
              .fill(null)
              .map((_value, columnIndex) => {
                const i = 3 * rowIndex + columnIndex;

                return (
                  <Square
                    key={i}
                    value={squares[i]}
                    onClick={() => !readonly && handleSquareClick(i)}
                  />
                );
              })}
          </div>
        ))}
    </div>
  );
};

export { Board };
