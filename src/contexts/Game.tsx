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
import { getRandomString } from "../utils/getRandomString";

type IGameContext = {
  history: IBoardState[];
  stepNumber: number;
  jumpTo: (move: number) => void;
  handleSquareClick: (index: number) => void;
} & Pick<IGameProviderProps, "id" | "firstSquareValue">;

const GameContext = createContext<IGameContext>({} as any);

type IGameProviderProps = {
  id: string;
  firstSquareValue?: NonNullable<ISquareValue>;
  initialHistory?: IBoardState[];
  onUpdate?: (
    state: Pick<
      IGameContext,
      "id" | "firstSquareValue" | "history" | "stepNumber"
    >
  ) => void;
};

const GameProvider: FC<PropsWithChildren<IGameProviderProps>> = ({
  children,
  id = getRandomString(),
  firstSquareValue = "X",
  initialHistory = [
    {
      squares: Array(9).fill(null),
    },
  ],
  onUpdate,
}) => {
  const [frozenId] = useState(id);
  const [frozenFirstSquareValue] = useState(firstSquareValue);
  const [history, setHistory] = useState<IBoardState[]>(initialHistory);
  const [stepNumber, setStepNumber] = useState(initialHistory.length - 1);

  useEffect(() => {
    setStepNumber(history.length - 1);
  }, [history]);

  useEffect(() => {
    onUpdate &&
      onUpdate({
        id: frozenId,
        firstSquareValue: frozenFirstSquareValue,
        history,
        stepNumber,
      });
  }, [stepNumber]);

  const handleSquareClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];

    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }

    const newSquares = current.squares.slice();

    newSquares[i] = calculateNextSquareValue(
      frozenFirstSquareValue,
      stepNumber
    );

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
        id: frozenId,
        history,
        stepNumber,
        firstSquareValue: frozenFirstSquareValue,
        jumpTo: setStepNumber,
        handleSquareClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
