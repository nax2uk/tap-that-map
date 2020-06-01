import React from "react";
import { Paper, Typography, Slide, Avatar } from "@material-ui/core";

const MultiplayerScoresTracker = ({
  currentUserId,
  gameIsRunning,
  roundIsRunning,
  participants,
}) => {
  return (
    <Slide direction="right" in={gameIsRunning && !roundIsRunning}>
      <Paper elevation={3} id="scores-tracker-wrapper">
        {Object.entries(participants).map(
          (
            [
              id,
              {
                displayName,
                roundScore,
                roundIsRunning: competitorRoundIsRunning,
                photoURL,
              },
            ],
            index
          ) => {
            if (id !== currentUserId) {
              return (
                <>
                  <Avatar src={photoURL} alt={displayName} />
                  <Typography variant="body2" key={index}>
                    {displayName}
                    {competitorRoundIsRunning
                      ? ": ...thinking"
                      : `: ${roundScore}`}
                    <br />
                  </Typography>
                </>
              );
            }
            return null;
          }
        )}
      </Paper>
    </Slide>
  );
};

export default MultiplayerScoresTracker;
