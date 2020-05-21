import React from "react";
import { Typography } from "@material-ui/core";

const Score = (props) => {
  const { totalScore } = props;
  return (
    <div id="score-wrapper">
      <Typography variant="h4">Score: {totalScore}</Typography>
    </div>
  );
};

export default Score;
