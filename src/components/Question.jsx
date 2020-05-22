import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Question = (props) => {
  const { location, round } = props;
  return (
    <Paper elevation={12 - round} id="question-wrapper">
      <ThemeProvider theme={theme}>
        <Typography variant="h2">{`${round + 1}. ${location}`}</Typography>
      </ThemeProvider>
    </Paper>
  );
};

export default Question;
