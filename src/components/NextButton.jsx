import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const NextButton = ({ updateRound }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} id="next-wrapper">
        <Button variant="contained" color="primary" onClick={updateRound}>
          <Typography variant="h3">Next</Typography>
        </Button>
      </Paper>
    </ThemeProvider>
  );
};

export default NextButton;
