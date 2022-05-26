import { useContext } from "react";
import { GameContext } from "../contexts/Game";

const Moves = () => {
  const { history, jumpTo } = useContext(GameContext);

  const moves = history.map((_boardState, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return <ol>{moves}</ol>;
};

export { Moves };
