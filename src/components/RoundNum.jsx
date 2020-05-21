import React from "react";
import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const RoundNum = (props) => {
  const { round } = props;
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h4">Round Number: {round + 1}</Typography>
      </ThemeProvider>
    </div>
  );
};

export default RoundNum;
