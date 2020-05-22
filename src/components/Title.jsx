import React from "react";
import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Title = () => {
  return (
    <header>
      <ThemeProvider theme={theme}>
        <Typography variant="h1" align="center">
          Tap That Map
        </Typography>
      </ThemeProvider>
    </header>
  );
};

export default Title;
