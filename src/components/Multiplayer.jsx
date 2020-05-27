import React, { Component } from "react";
import Lobby from "./Lobby";
import { database, auth } from "../firebaseInitialise";

class Multiplayer extends Component {
  state = {
    hostOrJoin: true,
    isHost: false,
    inputtedId: "",
    gameId: null,
    lobbyOpen: false,
  };

  startGame = (e) => {
    e.preventDefault();
    const game = database.ref("multiplayerGame");
    const data = {
      host: auth.currentUser.uid,
      participants: [auth.currentUser.displayName],
    };
    this.setState({
      gameId: game.push(data).key,
      hostOrJoin: false,
      isHost: true,
      lobbyOpen: true,
    });
  };

  updateID = (e) => {
    this.setState({
      inputtedId: e.target.value,
    });
  };

  joinGame = () => {
    const { gameId } = this.state;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("participants")
      .once("value", (snapshot) => {
        const participantsArray = snapshot.val();
        participantsArray.push(auth.currentUser.displayName);

        game.child(gameId).child("participants").set(participantsArray);
      });

    this.setState({
      hostOrJoin: false,
      lobbyOpen: true,
    });
  };

  checkId = (e) => {
    const { inputtedId } = this.state;
    e.preventDefault();
    const game = database.ref("multiplayerGame");
    game.child(inputtedId).once("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        console.log("game connected");
        this.setState({ gameId: inputtedId });
        this.joinGame();
      } else console.log("OOOH NOOO");
    });
  };

  componentDidMount() {}

  render() {
    const { hostOrJoin, lobbyOpen, gameId, isHost } = this.state;
    return (
      <div>
        {hostOrJoin ? (
          <>
            <button onClick={this.startGame}>Initialise Game</button>
            <input
              type="text"
              onChange={this.updateID}
              placeholder="Enter your game id"
              value={this.state.inputtedId}
            />
            <button onClick={this.checkId}>Join Game</button>
          </>
        ) : null}
        {lobbyOpen ? <Lobby gameId={gameId} isHost={isHost} /> : null}
      </div>
    );
  }
}

export default Multiplayer;
