import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import { Link, navigate } from "@reach/router";
import { Paper, Typography, Button, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import { Howl } from "howler";
import introSrc from "../resources/intro.m4a";
import UserNameForm from "./UserNameForm";

const logout = () => {
  auth.signOut();
  navigate(`/logout`);
};

class Home extends Component {
  state = {
    userName: "",
    userImage: "",
    userNameAndImageDoNotExist: true,
  };

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

  componentDidMount() {
    this.loadMusic();
    this.getUserNameAndImage();
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
    const { userNameAndImageDoNotExist } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Paper id="home-wrapper" elevation={3}>
          <Typography variant="h2" align="center">
            Home
          </Typography>
          {userNameAndImageDoNotExist ? (
            <UserNameForm
              nickname={this.userName}
              userImage={this.userImage}
              updateUserNameAndImage={this.updateUserNameAndImage}
            />
          ) : (
            <>
              <Typography variant="h2" align="center">
                Hello {this.state.userName}
              </Typography>
              <Box margin="normal" className="two-button-wrapper">
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
              </Box>
            </>
          )}
        </Paper>
      </ThemeProvider>
    );
  }
}

export default Home;
