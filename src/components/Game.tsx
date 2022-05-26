import React from "react";
import { ISquareValue } from "../interfaces/ISquareValue";
import { calculateWinner } from "../utils/calculateWinner";
import { Board } from "./Board";

type IBoardState = {
  squares: ISquareValue[];
};

type IGameState = {
  history: IBoardState[];
  xIsNext: boolean;
};

class Game extends React.Component<{}, IGameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const { history } = this.state;
    const { squares } = history[history.length - 1];
    const winner = calculateWinner(squares);
    const status = winner
      ? "Winner: " + winner
      : "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onSquareClick={this.handleClick.bind(this)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export { Game };
