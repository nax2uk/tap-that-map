import React from "react";
import { Paper, Button, Typography, Slide } from "@material-ui/core";

const NextButton = ({ updateRound, round, gameIsRunning, roundIsRunning }) => {
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
};

export default NextButton;
