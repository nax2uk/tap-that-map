import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class Timer extends Component {
  state = {
    minutes: 0,
    seconds: 30,
  };

  startTimer = () => {
    this.myInterval = setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
        window.localStorage.setItem("seconds", `${seconds - 1}`);
      } else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
          window.localStorage.clear();
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
          window.localStorage.setItem("minutes", `${minutes - 1}`);
          window.localStorage.setItem("seconds", "59");
        }
      }
    }, 1000);
  };

  componentDidMount() {
    if (
      window.localStorage.getItem("minutes") ||
      window.localStorage.getItem("seconds")
    ) {
      let previousMinutes = parseInt(
        window.localStorage.getItem("minutes") || 0
      );
      let previousSeconds = parseInt(
        window.localStorage.getItem("seconds") || 0
      );
      this.setState({ minutes: previousMinutes, seconds: previousSeconds });
    }
    this.startTimer();
  }

  render() {
    const { minutes, seconds } = this.state;
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
