import React from "react";
import { Typography } from "@material-ui/core";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

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
