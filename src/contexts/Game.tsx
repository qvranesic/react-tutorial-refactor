import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { IBoardState } from "../interfaces/IBoardState";
import { ISquareValue } from "../interfaces/ISquareValue";
import { calculateNextSquareValue } from "../utils/calculateNextSquareValue";
import { calculateWinner } from "../utils/calculateWinner";

type IGameContext = {
  history: IBoardState[];
  stepNumber: number;
  firstSquareValue: NonNullable<ISquareValue>;
  jumpTo: (move: number) => void;
  handleSquareClick: (index: number) => void;
};

const GameContext = createContext<IGameContext>({} as any);

type IGameProviderProps = {
  firstSquareValue?: NonNullable<ISquareValue>;
  initialHistory?: IBoardState[];
};

const GameProvider: FC<PropsWithChildren<IGameProviderProps>> = ({
  children,
  firstSquareValue = "X",
  initialHistory = [
    {
      squares: Array(9).fill(null),
    },
  ],
}) => {
  const [history, setHistory] = useState<IBoardState[]>(initialHistory);

  const [stepNumber, setStepNumber] = useState(initialHistory.length - 1);

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

    newSquares[i] = calculateNextSquareValue(firstSquareValue, stepNumber);

    setHistory(
      newHistory.concat([
        {
          squares: newSquares,
        },
      ])
    );
  };

  return (
    <GameContext.Provider
      value={{
        history,
        stepNumber,
        firstSquareValue,
        jumpTo: setStepNumber,
        handleSquareClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
