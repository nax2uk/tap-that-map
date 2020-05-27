import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Lobby = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper id="lobby-wrapper">
        <Typography variant="h2" align="center">
          Game Lobby
        </Typography>
      </Paper>
    </ThemeProvider>
  );
};

export default Lobby;
