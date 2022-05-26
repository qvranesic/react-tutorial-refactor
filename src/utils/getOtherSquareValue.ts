import { ISquareValue } from "../interfaces/ISquareValue";

const getOtherSquareValue = (value: NonNullable<ISquareValue>) => {
  return value === "X" ? "O" : "X";
};

export { getOtherSquareValue };
