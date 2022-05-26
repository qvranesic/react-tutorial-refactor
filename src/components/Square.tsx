import React from "react";
import { ISquareValue } from "../interfaces/ISquareValue";

type ISquareProps = {
  value: number;
};

type ISquareState = {
  value: ISquareValue;
};

class Square extends React.Component<ISquareProps, ISquareState> {
  constructor(props: ISquareProps) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: "X" })}>
        {this.state.value}
      </button>
    );
  }
}

export { Square };
