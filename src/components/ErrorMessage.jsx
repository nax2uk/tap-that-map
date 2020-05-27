import React from "react";
import { Box, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const ErrorMessage = ({ message }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="body1">{message}</Typography>
      </Box>
    </ThemeProvider>
  );
};

export default ErrorMessage;
