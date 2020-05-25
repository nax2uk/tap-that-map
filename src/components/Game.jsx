import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

class Game extends Component {
  state = {};
  render() {
    const { currentUserId } = this.props;
    return <GoogleMap currentUserId={currentUserId} />;
  }
}

export default Game;
