import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Totaliser = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} id="totaliser-wrapper">
        <Typography variant="body1">
          This is where the score calculation will go
        </Typography>
      </Paper>
    </ThemeProvider>
  );
};

export default Totaliser;
