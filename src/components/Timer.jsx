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
      if (seconds > 0)
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  componentDidMount() {
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
