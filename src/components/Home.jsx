import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import { Link, navigate } from "@reach/router";
import { Paper, Typography, Button, Box, TextField } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import { Howl } from "howler";
import introSrc from "../resources/intro.m4a";

const logout = () => {
  auth.signOut();
  navigate(`/logout`);
};

class Home extends Component {
  state = {
    nickname: "",
    userImage: "https://image.flaticon.com/icons/png/512/63/63699.png",
  };

  updateUser = () => {
    let user = auth.currentUser;
    const { nickname, userImage } = this.state;

    user
      .updateProfile({
        displayName: nickname,
        photoURL: userImage,
      })
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // this.updateUser()
  };

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
            <form id="login-form">
              <TextField
                label="nickname"
                variant="outlined"
                margin="normal"
                fullWidth
                id="nickname"
                name="nickname"
                type="nickname"
                value={this.state.nickname}
                onChange={this.handleChange}
                required
              />
              <TextField
                label="image url"
                variant="outlined"
                margin="normal"
                fullWidth
                id="image url"
                name="image url"
                type="image url"
                value={this.state.update}
                onChange={this.handleChange}            
              />
            </form>
            <Box margin="normal" fullWidth className="two-button-wrapper">
              <Link to="/game">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.updateUser}
                >
                  Start Game
                </Button>
              </Link>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
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
