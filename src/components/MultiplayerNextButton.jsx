import React from "react";
import { Paper, Button, Typography, Slide } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const MultiplayerNextButton = ({
  updateRound,
  round,
  gameIsRunning,
  roundIsRunning,
  isHost,
  participantsAreReady,
  userReady,
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
      </Paper>
    </Slide>

  );
};

export default MultiplayerNextButton;
