import { FC, useState } from "react";
import { ISquareValue } from "../interfaces/ISquareValue";
import { calculateWinner } from "../utils/calculateWinner";
import { Board } from "./Board";

type IBoardState = {
  squares: ISquareValue[];
};

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
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
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

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

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
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export { Game };
