import React from "react";
import { Square } from "./Square";

class Board extends React.Component {
  renderSquare(i: number) {
    return <Square value={i} />;
  }
}

export { Board };
