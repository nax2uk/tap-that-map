import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";

const StartButton = ({ startGame }) => {
  return (

    <Paper elevation={3} id="start-wrapper">
      <Button variant="contained" color="primary" onClick={startGame}>
        <Typography variant="h3">START GAME</Typography>
      </Button>
    </Paper>

  );
};

export default StartButton;
