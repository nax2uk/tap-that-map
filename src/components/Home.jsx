import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import { Link, navigate } from "@reach/router";
import { Paper, Typography, Button, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import { Howl } from "howler";
import introSrc from "../resources/intro.m4a";
import UserNameForm from "./UserNameForm";

class Home extends Component {
  state = {
    userName: "",
    userImage: "",
    userNameAndImageDoNotExist: true,
  };

  componentDidMount() {
    // commenting out the music for my sanity now
    //this.loadMusic();
    this.getUserNameAndImage();
  }

  updateUserNameAndImage = (userName, userImage) => {
    this.setState({
      userName: userName,
      userImage: userImage || "https://img.icons8.com/emoji/2x/duck-emoji.png",
      userNameAndImageDoNotExist: false,
    });
  };

  getUserNameAndImage = () => {
    if (auth.currentUser.displayName) {
      this.updateUserNameAndImage(
        auth.currentUser.displayName,
        auth.currentUser.photoURL
      );
    }
  };

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

  logout = () => {
    auth.signOut();
    navigate(`/logout`);
  };

  render() {
    const { userNameAndImageDoNotExist, userName } = this.state;
    if (userNameAndImageDoNotExist) {
      return (
        <UserNameForm
          nickname={this.userName}
          userImage={this.userImage}
          updateUserNameAndImage={this.updateUserNameAndImage}
        />
      );
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Paper id="home-wrapper" elevation={3}>
            <Typography variant="h2" align="center">
              Hello {userName}
            </Typography>
            <Box id="button-wrapper">
              <Link to="/singlePlayerGame">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.updateUser}
                >
                  Single Player
                </Button>
              </Link>
              <Link to="/multiplayer/some_id">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.updateUser}
                >
                  Host Multiplayer
                </Button>
              </Link>
              <Link to="/lobby">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.updateUser}
                >
                  Join Multiplayer
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.logout}
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </ThemeProvider>
      );
    }
  }
}

export default Home;
