import React, { Component } from "react";
import "./App.css";
import GoogleMap from "./components/GoogleMap";
import Login from "./components/Login";
import Home from "./components/Home";
import { auth } from "./firebaseInitialise";
import { Router } from "@reach/router";
import Logout from "./components/Logout";

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
    return (
      <Router>
        {this.state.currentUserId ? <Home path="/" /> : <Login path="/" />}
        <Logout path="/logout" />
        <GoogleMap path="/googlemap" currentUserId={this.state.currentUserId} />
      </Router>
    );
  }
}

export default App;
