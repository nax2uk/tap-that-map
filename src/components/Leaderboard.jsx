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
    let count = 0;
    scores
      .orderByChild("score")
      .limitToLast(5)
      .on("child_added", (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        scoreArray.unshift(data);
        count++;
        if (count > 4) {
          this.setState({
            leaderArray: [...scoreArray],
          });
        }
      });
  };

  componentDidMount() {
    this.retrieveLeaderboard();
  }

  render() {
    const { leaderArray } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Paper>
          <Typography variant="h3">LeaderBoard</Typography>
          {leaderArray
            ? leaderArray.map((result, index) => {
                return (
                  <Typography variant="h2" key={index}>
                    {index + 1}: {result.score}
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
