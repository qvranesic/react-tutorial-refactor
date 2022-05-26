import { FC } from "react";
import { IBoardState } from "../interfaces/IBoardState";

type IMovesProps = {
  history: IBoardState[];
  onStepClick: (i: number) => void;
};

const Moves: FC<IMovesProps> = ({ history, onStepClick }) => {
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => onStepClick(move)}>{desc}</button>
      </li>
    );
  });

  return <ol>{moves}</ol>;
};

export { Moves };
