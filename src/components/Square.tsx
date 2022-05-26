import React from "react";
import { ISquareValue } from "../interfaces/ISquareValue";

type ISquareProps = {
  value: ISquareValue;
  onClick: () => void;
};

class Square extends React.Component<ISquareProps> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

export { Square };
