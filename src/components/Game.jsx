import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import generateCountryQuestions from "../utils/generateCountryQuestions";
import * as borderGeojson from "../resources/hq-borders.json";
import { database } from "../firebaseInitialise";
import Question from "./Question";
import Timer from "./Timer";

class Game extends Component {
  state = {
    gameIsReady: false,
    userIsReady: false,
    gameIsRunning: false,
    roundIsRunning: false,
    gameIsFinished: false,
    questionArr: null,
    countryArr: null,
    round: 0,
    roundScore: 0,
    roundDistance: 0,
    totalScore: 0,
    scoreSubmitted: false,
    scoreArray: [],
  };

  getQuestionGeojson = ({ location }) => {
    const locationGeojson = borderGeojson.features.find(
      (feature) => feature.location === location
    );
    const questionBorderData = {
      type: "FeatureCollection",
      features: [locationGeojson],
    };
    return questionBorderData;
  };

  updateRoundScore = (roundScore) => {
    this.setState({ roundScore });
  };

  updateRoundDistance = (roundDistance) => {
    this.setState({ roundDistance });
  };

  updateRound = () => {
    this.setState((currState) => {
      if (currState.round === 9) {
        return { round: currState.round++, gameIsFinished: true };
      } else {
        return { round: currState.round++ };
      }
    });
  };
  componentDidMount() {
    const countryArr = generateCountryQuestions(10);

    const questionArr = countryArr.map((country) => {
      return { location: country, position: null, borderData: null };
    });

    questionArr.forEach((question) => {
      const request = database.ref(`countries/${question.location}`);
      request.on("value", (response) => {
        question.position = response.val();
      });
      question.borderData = this.getQuestionGeojson(question);
    });

    this.setState({ countryArr, questionArr, gameIsReady: true });
  }

  render() {
    const { currentUserId } = this.props;
    const { gameIsReady, questionArr, round, roundDistance } = this.state;
    if (gameIsReady) {
      return (
        <>
          <Question
            location={questionArr[round].location}
            round={round}
            updateRoundScore={this.updateRoundScore}
            updateRoundDistance={this.updateRoundDistance}
          />
          <GoogleMap currentUserId={currentUserId} />
          <Timer updateRound={this.updateRound} roundDistance={roundDistance} />
        </>
      );
    } else return <h1>loading</h1>;
  }
}

export default Game;
