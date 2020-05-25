import React, { Component } from "react";
import { Typography, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

class Timer extends Component {
  state = {
    seconds: 10,
    timer: null,
  };

  startTimer = () => {
    const timer = setInterval(this.timerFunction, 1000);
    this.setState({ timer });
  };

  stopTimer = () => {
    const { timer } = this.state;
    clearInterval(timer);
  };

  resetTimer = () => {
    this.setState({ seconds: 10 });
  };

  timerFunction = () => {
    const { endRound } = this.props;
    const { seconds, timer } = this.state;
    if (seconds > 1) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
    } else {
      this.setState({ seconds: 0 });
      clearInterval(timer);
      endRound();
    }
  };

  formatAndDisplayTime = () => {
    const { seconds } = this.state;

    const minsToDisplay = Math.floor(seconds / 60).toString();
    const secsToDisplay = seconds.toString().padStart(2, 0);

    return `${minsToDisplay}:${secsToDisplay}`;
  };

  componentDidMount() {
    this.resetTimer();
    this.startTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { roundIsRunning } = this.props;
    const roundHasStopped =
      !roundIsRunning && roundIsRunning !== prevProps.roundIsRunning;
    const roundHasStarted =
      roundIsRunning && roundIsRunning !== prevProps.roundIsRunning;

    if (roundHasStarted) {
      this.resetTimer();
      this.startTimer();
    }
    if (roundHasStopped) {
      this.stopTimer();
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Paper id="timer-wrapper" elevation={3}>
          <Typography variant="h2">
            <span id="time">{this.formatAndDisplayTime()}</span>
          </Typography>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default Timer;
