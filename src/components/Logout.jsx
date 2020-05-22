import React from "react";
import { Link } from "@reach/router";
import { Paper, Typography, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Logout = () => {
  return (
    <Paper id="logout-wrapper" elevation={3}>
      <ThemeProvider theme={theme}>
        <Typography variant="h3" gutterBottom={true}>
          Logged out
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
      </ThemeProvider>
    </Paper>
  );
};

export default Logout;
