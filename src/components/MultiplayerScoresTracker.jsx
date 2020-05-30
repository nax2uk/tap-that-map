import React from "react";
import { Paper, Typography, Slide } from "@material-ui/core";

const MultiplayerScoresTracker = ({
  gameIsRunning,
  roundIsRunning,
  allPlayersScores,
}) => {
  return (
    <Slide direction="right" in={gameIsRunning && !roundIsRunning}>
      <Paper elevation={3} id="scores-tracker-wrapper">
        {allPlayersScores.map((playerScore, index) => {
          return (
            <Typography variant="body2" key={index}>
              {playerScore.displayName}: {playerScore.roundScore} <br />
            </Typography>
          );
        })}
      </Paper>
    </Slide>
  );
};

export default MultiplayerScoresTracker;
