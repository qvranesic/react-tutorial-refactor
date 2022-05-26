import { ISquareValue } from "../interfaces/ISquareValue";
import { getOtherSquareValue } from "./getOtherSquareValue";

const calculateNextSquareValue = (
  firstSquareValue: NonNullable<ISquareValue>,
  stepNumber: number
) => {
  return stepNumber % 2 === 0
    ? firstSquareValue
    : getOtherSquareValue(firstSquareValue);
};

export { calculateNextSquareValue };
