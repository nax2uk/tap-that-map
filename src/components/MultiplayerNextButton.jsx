import React from "react";
import { Paper, Button, Typography, Slide, Switch } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const MultiplayerNextButton = ({
  updateRound,
  round,
  gameIsRunning,
  roundIsRunning,
  isHost,
  participantsAreReady,
  userReady,
  userIsReady,
}) => {
  if (isHost && participantsAreReady) {
    return (
      <Slide
        direction="left"
        in={gameIsRunning && !roundIsRunning}
        timeout={{ enter: 100, exit: 50 }}
      >
        <Paper elevation={3} id="next-wrapper">
          <Button variant="contained" color="primary" onClick={updateRound}>
            <Typography variant="h4">
              {round !== 9 ? "Next" : "Results"}
            </Typography>
          </Button>
        </Paper>
      </Slide>
    );
  }
  return (
    <Slide
      direction="left"
      in={gameIsRunning && !roundIsRunning}
      timeout={{ enter: 100, exit: 50 }}
    >
      <Paper elevation={3} id="next-wrapper">
        <Button variant="contained" color="primary" onClick={userReady}>
          <Typography variant="h4">Ready?</Typography>
        </Button>
        <Switch
          color="primary"
          checked={userIsReady}
          checkedIcon={<CheckCircleIcon />}
          icon={<CancelIcon />}
        />
      </Paper>
    </Slide>
  );
};

export default MultiplayerNextButton;
