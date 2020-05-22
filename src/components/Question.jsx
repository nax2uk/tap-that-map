import React from "react";
import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Question = (props) => {
  const { location } = props;
  return (
    <div id="question-wrapper">
      <ThemeProvider theme={theme}>
        <Typography variant="h2">{`${location}`}</Typography>
      </ThemeProvider>
    </div>
  );
};

export default Question;
