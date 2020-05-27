import React, { Component } from "react";
import { database } from "../firebaseInitialise";
import { Paper, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

class Leaderboard extends Component {
  state = {
    leaderArray: null,
  };

  retrieveLeaderboard = () => {
    const scores = database.ref("scores");
    let scoreArray = [];
    let count = 5;

    scores
      .orderByChild("score")
      .limitToLast(5)
      .on("child_added", (snapshot) => {
        const data = snapshot.val();

        if (count > -1) {
          scoreArray[count] = data;
          count--;
        }
        else {
          // need to check if new data should be in the leaderboard

        }

        if (count === -1) {
          this.setState({
            leaderArray: [...scoreArray.slice(0, 5)],
          });
        }
      });
  };

  componentDidMount() {
    this.retrieveLeaderboard();
  }

  render() {
    const { leaderArray } = this.state;
    console.log(leaderArray);
    return (
      <ThemeProvider theme={theme}>
        <Paper id="leaderboard-wrapper">
          <Typography variant="h3">LeaderBoard</Typography>
          {leaderArray
            ? leaderArray.map((result, index) => {
              return (
                <Typography variant="h2" key={index}>
                  {index + 1}: {`${result.score} (${result.username})`}
                </Typography>
              );
            })
            : null}
        </Paper>
      </ThemeProvider>
    );
  }
}

export default Leaderboard;