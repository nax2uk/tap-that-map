import React from "react";
import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Title = () => {
  return (
    <header>

      <Typography variant="h1" align="center">
        Tap That Map
        </Typography>

    </header>
  );
};

export default Title;
