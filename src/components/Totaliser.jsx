import React from "react";
import { Paper, Typography, Slide } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Totaliser = ({
  roundScore,
  roundDistance,
  gameIsRunning,
  roundIsRunning,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Slide direction="left" in={gameIsRunning && !roundIsRunning}>
        <Paper elevation={3} id="totaliser-wrapper">
          <Typography variant="h4">
            Distance:
            <br />
            {roundDistance}km
            <br />
            Points:
            <br />
            {roundScore}
          </Typography>
        </Paper>
      </Slide>
    </ThemeProvider>
  );
};

export default Totaliser;
