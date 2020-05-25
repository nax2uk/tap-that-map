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
    const { startRound, updateRound } = this.props;
    updateRound();
    startRound();
    this.setState({ seconds: 10 });
    this.startTimer();
  };

  formatAndDisplayTime = () => {
    const { seconds } = this.state;

    const minsToDisplay = Math.floor(seconds / 60).toString();
    const secsToDisplay = seconds.toString().padStart(2, 0);

    return `${minsToDisplay}:${secsToDisplay}`;
  };

  componentDidMount() {
    if (window.localStorage.getItem("seconds")) {
      let previousSeconds = parseInt(
        window.localStorage.getItem("seconds") || 0
      );
      this.setState({ seconds: previousSeconds });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { userIsReady } = this.props;
    if (userIsReady && prevProps.userIsReady !== userIsReady) {
      this.startTimer();
    }
  }

  render() {
    const { seconds } = this.state;
    const { roundScore, roundDistance } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Paper id="timer-wrapper" elevation={3}>
          <Typography variant="h2">
            <span id="time">{this.formatAndDisplayTime()}</span>
          </Typography>
        </Paper>
        {seconds === 0 && (
          <>
            <NextButton startNewRound={this.startNewRound} />
            <Totaliser roundScore={roundScore} roundDistance={roundDistance} />
          </>
        )}
      </ThemeProvider>
    );
  }
}

export default Timer;
