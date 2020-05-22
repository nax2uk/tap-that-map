import React from "react";
import { auth } from "../firebaseInitialise";
import { Link, navigate } from "@reach/router";
import { Paper, Typography, Button, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const Home = () => {
  const logout = () => {
    auth.signOut();
    navigate(`/logout`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper id="home-wrapper" elevation={3}>
        <Typography variant="h2" align="center">
          Home
        </Typography>
        <Box margin="normal" fullWidth className="two-button-wrapper">
          <Link to="/googlemap">
            <Button variant="contained" color="primary">
              Start Game
            </Button>
          </Link>
          <Button variant="contained" color="secondary" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default Home;
