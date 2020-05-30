import React, { Component } from "react";
import Lobby from "./Lobby";
import { database, auth } from "../firebaseInitialise";
import MultiplayerGame from "./MultiplayerGame";
import { Paper, Button, Box, Typography, TextField } from "@material-ui/core";

class Multiplayer extends Component {
  state = {
    hostOrJoin: true,
    isHost: false,
    inputtedId: "",
    gameId: null,
    lobbyOpen: false,
    gameIsStarted: false,
    participants: {},
  };

  initGame = (e) => {
    e.preventDefault();
    const game = database.ref("multiplayerGame");
    const data = {
      host: auth.currentUser.uid,
      participants: {
        [auth.currentUser.uid]: {
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          userIsReady: false,
          roundIsRunning: false,
          marker: null,
          roundScore: 0,
          totalScore: 0,
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
          photoURL: auth.currentUser.photoURL,
          userIsReady: false,
          roundIsRunning: false,
          marker: null,
          roundScore: 0,
          totalScore: 0,
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

  gameIsStartedListenerFunction = (changeInGameIsStarted) => {
    const newGameIsStarted = changeInGameIsStarted.val();
    if (newGameIsStarted) {
      this.setState({ gameIsStarted: newGameIsStarted, lobbyOpen: false });
    }
  };

  addGameIsStartedListener = () => {
    const { gameId } = this.state;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("gameIsStarted")
      .on("value", this.gameIsStartedListenerFunction);
  };

  removeGameIsStartedListener = () => {
    const { gameId } = this.state;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("gameIsStarted")
      .off("value", this.gameIsStartedListenerFunction);
  };

  participantsListenerFunction = (changeInParticipants) => {
    const newParticipants = changeInParticipants.val();
    this.setState({ participants: newParticipants });
  };

  addParticipantsListener = () => {
    const { gameId } = this.state;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("participants")
      .on("value", this.participantsListenerFunction);
  };

  removeParticipantsListener = () => {
    const { gameId } = this.state;
    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("participants")
      .off("value", this.participantsListenerFunction);
  };

  componentWillUnmount() {
    this.removeParticipantsListener();
    this.removeGameStartListener();
  }

  componentDidUpdate(prevProps, prevState) {
    const { gameId } = this.state;
    if (prevState.gameId !== gameId) {
      this.addGameIsStartedListener();
      this.addParticipantsListener();
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
      participants,
    } = this.state;
    return (
      <>
        {hostOrJoin && (
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
        )}
        {lobbyOpen && (
          <Lobby gameId={gameId} isHost={isHost} startGame={this.startGame} />
        )}
        {gameIsStarted && (
          <MultiplayerGame
            currentUserId={this.props.currentUserId}
            isHost={isHost}
            gameId={gameId}
            participants={participants}
          />
        )}
      </>
    );
  }
}

export default Multiplayer;
