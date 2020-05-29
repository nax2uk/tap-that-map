import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Score = (props) => {
  const { totalScore } = props;
  return (
    <Paper elevation={3} id="score-wrapper">
      <Typography variant="h4">Score: {totalScore}</Typography>
    </Paper>
  );
};

export default Score;
