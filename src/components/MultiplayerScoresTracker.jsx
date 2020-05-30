import React from "react";
import { Paper, Typography, Slide } from "@material-ui/core";

const MultiplayerScoresTracker = ({
  gameIsRunning,
  roundIsRunning,
  participants,
}) => {
  return (
    <Slide direction="right" in={gameIsRunning && !roundIsRunning}>
      <Paper elevation={3} id="scores-tracker-wrapper">
        {Object.values(participants).map(
          ({ displayName, roundScore }, index) => {
            return (
              <Typography variant="body2" key={index}>
                {displayName}: {roundScore} <br />
              </Typography>
            );
          }
        )}
      </Paper>
    </Slide>
  );
};

export default MultiplayerScoresTracker;
