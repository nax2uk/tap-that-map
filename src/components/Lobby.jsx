import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
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
        console.log(data);
        this.setState({ participants: [...data] });
      });
  };

  componentDidMount() {
    this.getParticipants();
  }

  render() {
    const { gameId } = this.props;
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
        {console.log(participants)}
        <ul>
          {participants.map((participant, index) => {
            return <li key={index}>{participant}</li>;
          })}
        </ul>
      </ThemeProvider>
    );
  }
}

export default Lobby;
