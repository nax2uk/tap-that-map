import React from "react";
import { Paper, Button, Typography, Switch } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const MultiplayerStartButton = ({
  startGame,
  isHost,
  userIsReady,
  participantsAreReady,
  userReady,
}) => {
  if (isHost && participantsAreReady) {
    return (
      <Paper elevation={3} id="start-wrapper">
        <Button variant="contained" color="primary" onClick={startGame}>
          <Typography variant="h3">Start</Typography>
        </Button>
      </Paper>
    );
  } else {
    return (
      <Paper elevation={3} id="start-wrapper">
        <Button variant="contained" color="primary" onClick={userReady}>
          <Typography variant="h3">Ready?</Typography>
        </Button>
        <Switch
          color="primary"
          checked={userIsReady}
          checkedIcon={<CheckCircleIcon />}
          icon={<CancelIcon />}
        />
      </Paper>
    );
  }
};

export default MultiplayerStartButton;
