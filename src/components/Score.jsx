import React from "react";
import { Typography } from "@material-ui/core";

const Score = (props) => {
  const { totalScore, round } = props;
  return (
    <div id="score-wrapper">
      <Typography variant="h4">Score: {totalScore}</Typography>
      <Typography variant="h4">Round: {round + 1}</Typography>
    </div>
  );
};

export default Score;
