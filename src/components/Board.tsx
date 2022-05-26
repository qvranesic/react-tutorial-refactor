import { FC } from "react";
import { ISquareValue } from "../interfaces/ISquareValue";
import { Square } from "./Square";

type IBoardProps = {
  squares: ISquareValue[];
  onSquareClick: (i: number) => void;
};

const Board: FC<IBoardProps> = ({ squares, onSquareClick }) => (
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
                <Square value={squares[i]} onClick={() => onSquareClick(i)} />
              );
            })}
        </div>
      ))}
  </div>
);

export { Board };
