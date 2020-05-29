import React from "react";
import { Typography, Paper } from "@material-ui/core";

const Score = (props) => {
  const { totalScore } = props;
  return (
    <Paper elevation={3} id="score-wrapper">
      <Typography variant="h4">Score: {totalScore}</Typography>
    </Paper>
  );
};

export default Score;
