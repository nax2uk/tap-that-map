import React, { Component } from "react";
import { database } from "../firebaseInitialise";
import { Paper, Typography, Avatar } from "@material-ui/core";

class Leaderboard extends Component {
  state = {
    leaderArray: null,
  };

  retrieveLeaderboard = () => {
    const scores = database.ref("scores");
    scores
      .orderByChild("score")
      .limitToLast(5)
      .once("value")
      .then((data) => {
        const scoreObjects = data.val();
        const arrayOfScoresAndNames = Object.values(scoreObjects).map(
          ({ score, username }) => {
            return { score, username };
          }
        );
        arrayOfScoresAndNames.sort((a, b) => b.score - a.score);
        this.setState({ leaderArray: arrayOfScoresAndNames });
      });
  };

  componentDidMount() {
    this.retrieveLeaderboard();
  }

  render() {
    const { leaderArray } = this.state;
    const { participants } = this.props;
    if (participants) {
      return (
        <Paper elevation={3} id="leaderboard-wrapper">
          <Typography variant="h3" align="center">
            Game results
          </Typography>
          {Object.values(participants)
            .sort((a, b) => b.totalScore - a.totalScore)
            .map(({ displayName, totalScore, photoURL }, index) => {
              return (
                <Typography
                  variant="h4"
                  key={`${displayName}${index}`}
                  align="center"
                >
                  <Avatar src={photoURL} alt={displayName} />
                  {` ${totalScore} (${displayName})`}
                </Typography>
              );
            })}
        </Paper>
      );
    } else {
      return (
        <Paper elevation={3} id="leaderboard-wrapper">
          <Typography variant="h3" align="center">
            High Scores
          </Typography>
          {leaderArray &&
            leaderArray.map((result, index) => {
              return (
                <Typography
                  variant="h4"
                  key={`${result}${index}`}
                  align="center"
                >
                  {index + 1}: {`${result.score} (${result.username})`}
                </Typography>
              );
            })}
        </Paper>
      );
    }
  }
}

export default Leaderboard;
