import React, { Component } from "react";
import Lobby from "./Lobby";
import { database, auth } from "../firebaseInitialise";
import MultiplayerGame from "./MultiplayerGame";
import { Paper, Button, Box, Typography, TextField } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

class Multiplayer extends Component {
  state = {
    hostOrJoin: true,
    isHost: false,
    inputtedId: "",
    gameId: null,
    lobbyOpen: false,
    gameIsStarted: false,
  };

  initGame = (e) => {
    e.preventDefault();
    const game = database.ref("multiplayerGame");
    const data = {
      host: auth.currentUser.uid,
      participants: {
        [auth.currentUser.uid]: {
          displayName: auth.currentUser.displayName,
          userIsReady: false,
          roundIsRunning: false,
        },
      },
      gameIsStarted: false,
      startRound1: false,
      round: 0,
    };

    this.setState({
      gameId: game.push(data).key,
      hostOrJoin: false,
      isHost: true,
      lobbyOpen: true,
    });
  };

  startGame = () => {
    const { gameId } = this.state;
    const game = database.ref("multiplayerGame");
    game.child(gameId).child("gameIsStarted").set(true);
  };

  listenForGameStart = () => {
    const { gameId } = this.state;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("gameIsStarted")
      .on("value", (snapshot) => {
        const gameIsStarted = snapshot.val();
        if (gameIsStarted) {
          this.setState({ gameIsStarted, lobbyOpen: false });
        }
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
        const participantsObj = snapshot.val();
        const participantData = {
          displayName: auth.currentUser.displayName,
          userIsReady: false,
        };
        participantsObj[auth.currentUser.uid] = participantData;

        game.child(gameId).child("participants").set(participantsObj);
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
      if (data) {
        console.log("game connected");
        this.setState({ gameId: inputtedId });
        this.joinGame();
      } else console.log("OOOH NOOO");
    });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameId !== this.state.gameId) {
      this.listenForGameStart();
    }
  }

  render() {
    const {
      hostOrJoin,
      lobbyOpen,
      gameId,
      isHost,
      gameIsStarted,
      inputtedId,
    } = this.state;
    return (
      <div>
        {hostOrJoin ? (
          <ThemeProvider theme={theme}>
            <Paper elevation={3} id="initialise-game-wrapper">
              <Typography variant="h2" align="center">
                Multiplayer
              </Typography>
              <Box id="initialise-button-wrapper">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.initGame}
                >
                  Start A Game
                </Button>
                <TextField
                  variant="outlined"
                  label="game-id"
                  onChange={this.updateID}
                  value={inputtedId}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.checkId}
                  disabled={inputtedId.length === 0}
                >
                  Join A Game
                </Button>
              </Box>
            </Paper>
          </ThemeProvider>
        ) : null}
        {lobbyOpen ? (
          <Lobby gameId={gameId} isHost={isHost} startGame={this.startGame} />
        ) : null}
        {gameIsStarted && (
          <MultiplayerGame
            currentUserId={this.props.currentUserId}
            isHost={isHost}
            gameId={gameId}
          />
        )}
      </div>
    );
  }
}

export default Multiplayer;
