import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const MultiplayerStartButton = ({
  startGame,
  isHost,
  participantsAreReady,
  userReady,
}) => {
  if (isHost && participantsAreReady) {
    return (
      <ThemeProvider theme={theme}>
        <Paper elevation={3} id="start-wrapper">
          <Button variant="contained" color="primary" onClick={startGame}>
            <Typography variant="h3">START GAME</Typography>
          </Button>
        </Paper>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Paper elevation={3} id="start-wrapper">
          <Button variant="contained" color="primary" onClick={userReady}>
            <Typography variant="h3">Are You Ready?</Typography>
          </Button>
        </Paper>
      </ThemeProvider>
    );
  }
};

export default MultiplayerStartButton;
