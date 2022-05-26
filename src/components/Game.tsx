import { FC, useEffect, useMemo, useState } from "react";
import { IBoardState } from "../interfaces/IBoardState";
import { calculateNextSquareValue } from "../utils/calculateNextSquareValue";
import { calculateWinner } from "../utils/calculateWinner";
import { Board } from "./Board";
import { Moves } from "./Moves";
import { Status } from "./Status";

const Game: FC = () => {
  const [history, setHistory] = useState<IBoardState[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const [stepNumber, setStepNumber] = useState(0);

  useEffect(() => {
    setStepNumber(history.length - 1);
  }, [history]);

  const handleSquareClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];

    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }

    const newSquares = current.squares.slice();

    newSquares[i] = calculateNextSquareValue("X", stepNumber);

    setHistory(
      newHistory.concat([
        {
          squares: newSquares,
        },
      ])
    );
  };

  const { squares } = history[stepNumber];

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onSquareClick={handleSquareClick} />
      </div>
      <div className="game-info">
        <Status squares={squares} stepNumber={stepNumber} />
        <Moves history={history} onStepClick={setStepNumber} />
      </div>
    </div>
  );
};

export { Game };
