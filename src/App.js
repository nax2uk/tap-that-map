import React, { Component } from "react";
import "./App.css";
import Title from "./components/Title";
import GoogleMap from "./components/GoogleMap";
import Login from './components/Login'
import Home from './components/Home'
import { auth } from './firebaseInitialise'
import { Router } from '@reach/router'
import Logout from './components/Logout'

class App extends Component {

  state = {
    currentUser: null,
  }

  authListener = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user });
      }
      else {
        this.setState({ currentUser: null })
      }
    })

  }
  componentDidMount() {
    this.authListener();
  }

  render() {


    // <GoogleMap />
    return (
      <Router>
        {this.state.currentUser ? <Home path='/' /> : <Login path='/' />}
        <Logout path='/logout' />
        <GoogleMap path='/googlemap' />
      </Router>
    );
  }
}

export default App;
