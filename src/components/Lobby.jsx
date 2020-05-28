import React, { Component } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import { database, auth } from "../firebaseInitialise";

class Lobby extends Component {
  state = {
    participants: [],
  };

  getParticipants = () => {
    const game = database.ref("multiplayerGame");
    game
      .child(this.props.gameId)
      .child("participants")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        this.setState({ participants: [...data] });
      });
  };

  componentDidMount() {
    this.getParticipants();
  }

  render() {
    const { gameId, isHost, startGame } = this.props;
    const { participants } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Paper id="lobby-wrapper">
          <Typography variant="h2" align="center">
            Game Lobby
          </Typography>
        </Paper>
        {gameId ? <h3>Game ID:{gameId}</h3> : null}
        <h4>Send this id to your friends to join your game session</h4>
        <ul>
          {participants.map((participant, index) => {
            return <li key={index}>{participant}</li>;
          })}
        </ul>
        {isHost && (
          <Button variant="contained" color="primary" onClick={startGame}>
            Start Game
          </Button>
        )}
      </ThemeProvider>
    );
  }
}

export default Lobby;
