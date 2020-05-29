import React from "react";
import { Paper, Typography, Slide } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const MultiplayerScoresTracker = ({ gameIsRunning, roundIsRunning }) => {
  return (
    <ThemeProvider theme={theme}>
      <Slide direction="right" in={gameIsRunning && !roundIsRunning}>
        <Paper elevation={3} id="scores-tracker-wrapper">
          <Typography variant="h4">
            This will track the scores in multiplayer
          </Typography>
        </Paper>
      </Slide>
    </ThemeProvider>
  );
};

export default MultiplayerScoresTracker;
