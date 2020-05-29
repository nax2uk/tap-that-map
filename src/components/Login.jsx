import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import { FormGroup, TextField, Button, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
  };

  login = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  signup = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then()
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { error, email, password } = this.state;
    return (

      <Paper elevation={3} id="login-form-wrapper">
        <FormGroup id="login-form">
          <TextField
            label="e-mail"
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            type="email"
            error={error !== null}
            helperText={error}
            value={email}
            onChange={this.handleChange}
            required
          />
          <TextField
            label="password"
            variant="outlined"
            margin="normal"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required
          />
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
        </FormGroup>
      </Paper>

    );
  }
}

export default Login;
