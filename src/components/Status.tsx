import { useContext } from "react";
import { GameContext } from "../contexts/Game";
import { calculateNextSquareValue } from "../utils/calculateNextSquareValue";
import { calculateWinner } from "../utils/calculateWinner";

const Status = () => {
  const { history, stepNumber } = useContext(GameContext);

  const { squares } = history[stepNumber];

  const winner = calculateWinner(squares);

  const status = winner
    ? "Winner: " + winner
    : "Next player: " + calculateNextSquareValue("X", stepNumber);

  return <div>{status}</div>;
};

export { Status };
