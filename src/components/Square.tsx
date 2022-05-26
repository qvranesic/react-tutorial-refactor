import { FC } from "react";
import { ISquareValue } from "../interfaces/ISquareValue";

type ISquareProps = {
  value: ISquareValue;
  onClick: () => void;
};

const Square: FC<ISquareProps> = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

export { Square };
