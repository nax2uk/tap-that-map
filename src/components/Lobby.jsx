import React, { Component } from "react";
import { Paper, Typography, Button, Fade } from "@material-ui/core";
import { database } from "../firebaseInitialise";
import Title from "./Title"

class Lobby extends Component {
  state = {
    participants: [],
  };

  participantsListenerFunction = (changeInParticipants) => {
    const newParticipants = changeInParticipants.val();
    this.setState({ participants: newParticipants });
  };

  startParticipantsListener = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("participants")
      .on("value", this.participantsListenerFunction);
  };

  removeParticipantsListener = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("participants")
      .off("value", this.participantsListenerFunction);
  };

  componentDidMount() {
    this.startParticipantsListener();
  }

  componentWillUnmount() {
    this.removeParticipantsListener();
  }

  render() {
    const { gameId, isHost, startGame } = this.props;
    const { participants } = this.state;
    return (
      <>
        <Title />
        <Paper elevation={3} id="lobby-wrapper">
          <Typography variant="h2" align="center">
            Game Lobby
        </Typography>
          <br />
          {gameId && <Typography variant="h4" align="center">Game ID: {gameId}</Typography>}
          <br />
          <Typography variant="body1" align="center">
            Send this id to your friends to join your game session
        </Typography>
          <Typography variant="body1" align="center">Current Players</Typography>
          {Object.values(participants).map((participant, index) => {
            return (
              <Fade in={true} direction="right" timeout={1000} key={index}>
                <Typography variant="body2" align="center">{participant.displayName}</Typography>
              </Fade>
            );
          })}
          <br />
          {isHost && (
            <Button variant="contained" color="primary" onClick={startGame}>
              Start Game
            </Button>
          )}
        </Paper>
      </>

    );
  }
}

export default Lobby;
