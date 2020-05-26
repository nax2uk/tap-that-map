import React, { Component } from "react";
import { database } from "../firebaseInitialise";

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
      <div>
        <h3>LeaderBoard</h3>
        {leaderArray
          ? leaderArray.map((result, index) => {
              return (
                <h2 key={index}>
                  {index + 1}: {result.score}
                </h2>
              );
            })
          : null}
      </div>
    );
  }
}

export default Leaderboard;
