import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import { Link, navigate } from "@reach/router";
import { Paper, Typography, Button, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import { Howl } from "howler";
import introSrc from "../resources/intro.m4a";

const logout = () => {
  auth.signOut();
  navigate(`/logout`);
};

class Home extends Component {
  state = {};

  componentDidMount() {
    this.loadMusic();
  }

  loadMusic = () => {
    const introMusic = new Howl({
      src: [introSrc],
      autoplay: true,
      preload: true,
      volume: 0.5,
      onplayerror: function () {
        introMusic.once("unlock", function () {
          introMusic.play();
        });
      },
    });

    introMusic.on("load", () => {
      introMusic.play();
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Paper id="home-wrapper" elevation={3}>
          <Typography variant="h2" align="center">
            Home
          </Typography>
          <Box margin="normal" className="two-button-wrapper">
            <Link to="/game">
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
  }
}

export default Home;
