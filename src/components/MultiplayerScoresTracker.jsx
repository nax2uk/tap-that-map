import React from "react";
import { Paper, Typography, Slide } from "@material-ui/core";

const MultiplayerScoresTracker = ({ gameIsRunning, roundIsRunning }) => {
  return (

    <Slide direction="right" in={gameIsRunning && !roundIsRunning}>
      <Paper elevation={3} id="scores-tracker-wrapper">
        <Typography variant="h4">
          This will track the scores in multiplayer
          </Typography>
      </Paper>
    </Slide>

  );
};

export default MultiplayerScoresTracker;
