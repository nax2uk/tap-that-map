import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  signup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Paper elevation={3} id="login-form-wrapper">
        <ThemeProvider theme={theme}>
          <form id="login-form">
            <TextField
              label="e-mail"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <TextField
              label="password"
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <Box margin="normal" fullWidth className="two-button-wrapper">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.login}
                margin="normal"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.signup}
                margin="normal"
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </ThemeProvider>
      </Paper>
    );
  }
}

export default Login;
