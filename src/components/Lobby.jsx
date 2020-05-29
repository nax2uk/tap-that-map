import React, { Component } from "react";
import { Paper, Typography, Button, Fade } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import { database } from "../firebaseInitialise";

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
        this.setState({ participants: data });
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
        <Paper elevation={3} id="lobby-wrapper">
          <Typography variant="h2" align="center">
            Game Lobby
          </Typography>
          {gameId && <Typography variant="h4">Game ID: {gameId}</Typography>}
          <Typography variant="body1">
            Send this id to your friends to join your game session
          </Typography>
          <Typography variant="body1">Current Players</Typography>
          {Object.values(participants).map((participant, index) => {
            return (
              <Fade in={true} direction="right" timeout={1000}>
                <Typography variant="body2">
                  {participant.displayName}
                </Typography>
              </Fade>
            );
          })}
          {isHost && (
            <Button variant="contained" color="primary" onClick={startGame}>
              Start Game
            </Button>
          )}
        </Paper>
      </ThemeProvider>
    );
  }
}

export default Lobby;
