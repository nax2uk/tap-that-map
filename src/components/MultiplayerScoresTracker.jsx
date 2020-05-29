import React from "react";
import { Paper, Typography, Slide } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const MultiplayerScoresTracker = ({
  gameIsRunning,
  roundIsRunning,
  allPlayersScores,
}) => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default MultiplayerScoresTracker;
