import React, { Component } from "react";
import { database } from "../firebaseInitialise";
import { Paper, Typography, Avatar, Grid } from "@material-ui/core";

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
          <Grid container justify="center">
            {Object.values(participants)
              .sort((a, b) => b.totalScore - a.totalScore)
              .map(({ displayName, totalScore, photoURL }, index) => {
                return (
                  <Grid container item xs={12} alignItems="center" key={index}>
                    <Grid item xs={4} align="right"><Avatar src={photoURL} alt={displayName} /></Grid>
                    <Grid item xs={1} align="center"><Typography>{` ${totalScore}  `}</Typography></Grid>
                    <Grid item xs={7} align="left"><Typography>{`  (${displayName})`}</Typography> </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Paper >
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
