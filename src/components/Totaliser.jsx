import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Totaliser = ({ roundScore, roundDistance }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} id="totaliser-wrapper">
        <Typography variant="body1">
          Distance: {roundDistance} <br /> Score: {roundScore}
        </Typography>
      </Paper>
    </ThemeProvider>
  );
};

export default Totaliser;
