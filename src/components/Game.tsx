import { FC, useState } from "react";
import { IBoardState } from "../interfaces/IBoardState";
import { calculateWinner } from "../utils/calculateWinner";
import { Board } from "./Board";
import { Moves } from "./Moves";

type IGameState = {
  history: IBoardState[];
  stepNumber: number;
  xIsNext: boolean;
};

const Game: FC = () => {
  const [{ history, stepNumber, xIsNext }, setState] = useState<IGameState>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setState({
      history: newHistory.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: newHistory.length,
      xIsNext: !xIsNext,
    });
  };

  const jumpTo = (stepNumber: number) => {
    setState(({ history }) => ({
      history,
      stepNumber: stepNumber,
      xIsNext: stepNumber % 2 === 0,
    }));
  };

  const { squares } = history[stepNumber];
  const winner = calculateWinner(squares);

  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onSquareClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Moves history={history} onStepClick={jumpTo} />
      </div>
    </div>
  );
};

export { Game };
