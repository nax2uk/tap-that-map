import React from "react";
import { Paper, Typography, Slide } from "@material-ui/core";

const Totaliser = ({
  roundScore,
  roundDistance,
  gameIsRunning,
  roundIsRunning,
}) => {
  return (

    <Slide direction="left" in={gameIsRunning && !roundIsRunning}>
      <Paper elevation={3} id="totaliser-wrapper">
        <Typography variant="h4">
          Distance:
            <br />
          {roundDistance}km
            <br />
            Points:
            <br />
          {roundScore}
        </Typography>
      </Paper>
    </Slide>

  );
};

export default Totaliser;
