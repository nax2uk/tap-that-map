import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";

class Timer extends Component {
  state = {
    minutes: 0,
    seconds: 10,
  };

  startTimer = () => {
    const { round } = this.props;
    this.myInterval = setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
        window.localStorage.setItem("seconds", `${seconds - 1}`);
        window.localStorage.setItem("round", `${round}`);
      } else if (seconds === 0) {
        if (minutes === 0) {
          //calls updateRound and updates state in GoogleMap component
          // updateRound();

          clearInterval(this.myInterval);
          window.localStorage.clear();
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
          window.localStorage.setItem("minutes", `${minutes - 1}`);
          window.localStorage.setItem("seconds", "59");

          // can't get localstorage to keep hold of the current round on refresh
          window.localStorage.setItem("round", `${round}`);
        }
      }
    }, 1000);
  };

  startNewRound = (event) => {
    event.preventDefault();
    const { updateRound } = this.props;
    updateRound();
    this.setState({ seconds: 10 });
    this.startTimer();
  };

  componentDidMount() {
    const { setRound } = this.props;
    if (
      window.localStorage.getItem("minutes") ||
      window.localStorage.getItem("seconds") ||
      window.localStorage.getItem("round")
    ) {
      let previousMinutes = parseInt(
        window.localStorage.getItem("minutes") || 0
      );
      let previousSeconds = parseInt(
        window.localStorage.getItem("seconds") || 0
      );
      let previousRound = parseInt(window.localStorage.getItem("round") || 0);
      //invoked a fuction
      setRound(previousRound);
      this.setState({ minutes: previousMinutes, seconds: previousSeconds });
    }
    this.startTimer();
  }

  render() {
    const { minutes, seconds } = this.state;
    if (minutes === 0 && seconds === 0) {
      return (
        <div id="timer-wrapper">
          <Typography variant="h2">
            <span id="time">
              TIME IS UP! {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </Typography>
          <Button onClick={this.startNewRound}>Begin Next Round?</Button>
        </div>
      );
    }
    return (
      <div id="timer-wrapper">
        <Typography variant="h2">
          <span id="time">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </Typography>
      </div>
    );
  }
}

export default Timer;
