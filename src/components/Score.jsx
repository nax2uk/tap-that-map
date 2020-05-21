import React from "react";
import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Score = (props) => {
  const { totalScore, round } = props;
  return (
    <div id="score-wrapper">
      <ThemeProvider theme={theme}>
        <Typography variant="h4">Score: {totalScore}</Typography>
        <Typography variant="h4">Round: {round + 1}</Typography>
      </ThemeProvider>
    </div>
  );
};

export default Score;
