import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";

const MultiplayerStartButton = ({
  startGame,
  isHost,
  participantsAreReady,
  userReady,
}) => {
  if (isHost && participantsAreReady) {
    return (

      <Paper elevation={3} id="start-wrapper">
        <Button variant="contained" color="primary" onClick={startGame}>
          <Typography variant="h3">START GAME</Typography>
        </Button>
      </Paper>

    );
  } else {
    return (

      <Paper elevation={3} id="start-wrapper">
        <Button variant="contained" color="primary" onClick={userReady}>
          <Typography variant="h3">Are You Ready?</Typography>
        </Button>
      </Paper>

    );
  }
};

export default MultiplayerStartButton;
