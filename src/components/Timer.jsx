import React, { Component } from "react";
import NextButton from "./NextButton";
import Totaliser from "./Totaliser";
import { Typography, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

class Timer extends Component {
  state = {
    seconds: 10,
  };

  startTimer = () => {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 1) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
        window.localStorage.setItem("seconds", `${seconds - 1}`);
      } else {
        this.setState({ seconds: 0 });
        clearInterval(this.myInterval);
        window.localStorage.clear();
      }
    }, 1000);
  };

  startNewRound = (event) => {
    const { updateRound } = this.props;
    updateRound();
    this.setState({ seconds: 10 });
    this.startTimer();
  };

  componentDidMount() {
    if (window.localStorage.getItem("seconds")) {
      let previousSeconds = parseInt(
        window.localStorage.getItem("seconds") || 0
      );

      this.setState({ seconds: previousSeconds });
    }
    this.startTimer();
  }

  render() {
    const { seconds } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Paper id="timer-wrapper" elevation={3}>
          <Typography variant="h2">
            <span id="time">{seconds}</span>
          </Typography>
        </Paper>
        {seconds === 0 && (
          <>
            <NextButton startNewRound={this.startNewRound} />
            <Totaliser />
          </>
        )}
      </ThemeProvider>
    );
  }
}

export default Timer;
