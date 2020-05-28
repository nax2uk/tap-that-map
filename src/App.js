import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { auth } from "./firebaseInitialise";
import { Router } from "@reach/router";
import Logout from "./components/Logout";
import Game from "./components/Game";
import Multiplayer from "./components/Multiplayer";

class App extends Component {
  state = {
    currentUserId: null,
  };

  authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ currentUserId: user.uid });
      } else {
        this.setState({ currentUserId: null });
      }
    });
  };
  componentDidMount() {
    this.authListener();
  }

  render() {
    const { currentUserId } = this.state;
    return (
      <Router>
        {this.state.currentUserId ? <Home path="/" /> : <Login path="/" />}
        <Logout path="/logout" />
        <Game path="/singlePlayerGame" currentUserId={currentUserId} />
        <Multiplayer path="/multiplayer" />
      </Router>
    );
  }
}

export default App;
