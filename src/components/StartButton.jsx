import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const StartButton = ({ startGame }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} id="start-wrapper">
        <Button variant="contained" color="primary" onClick={startGame}>
          <Typography variant="h3">START GAME</Typography>
        </Button>
      </Paper>
    </ThemeProvider>
  );
};

export default StartButton;
