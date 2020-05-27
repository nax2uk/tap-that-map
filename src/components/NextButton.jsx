import React from "react";
import { Paper, Button, Typography, Slide } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const NextButton = ({ updateRound, round, gameIsRunning, roundIsRunning }) => {
  return (
    <ThemeProvider theme={theme}>
      <Slide direction="left" in={gameIsRunning && !roundIsRunning}>
        <Paper elevation={3} id="next-wrapper">
          <Button variant="contained" color="primary" onClick={updateRound}>
            <Typography variant="h3">
              {round !== 9 ? "Next" : "Results"}
            </Typography>
          </Button>
        </Paper>
      </Slide>
    </ThemeProvider>
  );
};

export default NextButton;
