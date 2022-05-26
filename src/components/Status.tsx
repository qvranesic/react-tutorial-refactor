import { FC } from "react";
import { ISquareValue } from "../interfaces/ISquareValue";
import { calculateNextSquareValue } from "../utils/calculateNextSquareValue";
import { calculateWinner } from "../utils/calculateWinner";

type IStatusProps = {
  squares: ISquareValue[];
  stepNumber: number;
};

const Status: FC<IStatusProps> = ({ squares, stepNumber }) => {
  const winner = calculateWinner(squares);

  const status = winner
    ? "Winner: " + winner
    : "Next player: " + calculateNextSquareValue("X", stepNumber);

  return <div>{status}</div>;
};

export { Status };
