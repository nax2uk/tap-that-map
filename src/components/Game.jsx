import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import generateCountryQuestions from "../utils/generateCountryQuestions";
import * as borderGeojson from "../resources/hq-borders.json";
import { database } from "../firebaseInitialise";
import Question from "./Question";
import Timer from "./Timer";
import * as calculate from "../utils/calculateFunctions";
import Score from "./Score";

class Game extends Component {
  state = {
    gameIsReady: false,
    userIsReady: false,
    gameIsRunning: false,
    roundIsRunning: false,
    gameIsFinished: false,
    questionArr: null,
    countryArr: null,
    playerMarker: null,
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

  recordPlayerMarker = (marker) => {
    this.setState({ playerMarker: marker });
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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.playerMarker !== this.state.playerMarker &&
      this.state.playerMarker !== null
    ) {
      const { playerMarker, questionArr, round } = this.state;
      const question = questionArr[round];

      const markerPosition = {
        lat: playerMarker.position.lat(),
        lng: playerMarker.position.lng(),
      };

      const score = calculate.score(markerPosition, question.position);
      const distance = calculate.distance(markerPosition, question.position);

      this.setState((currState) => {
        return {
          roundScore: score,
          roundDistance: distance,
          totalScore: currState.totalScore + score,
        };
      });
    }
  }

  render() {
    const { currentUserId } = this.props;
    const {
      gameIsReady,
      questionArr,
      round,
      roundScore,
      roundDistance,
      totalScore,
    } = this.state;
    if (gameIsReady) {
      return (
        <>
          <Question location={questionArr[round].location} round={round} />
          <GoogleMap
            currentUserId={currentUserId}
            round={round}
            question={questionArr[round]}
            recordPlayerMarker={this.recordPlayerMarker}
          />
          <Timer
            updateRound={this.updateRound}
            roundScore={roundScore}
            roundDistance={roundDistance}
          />
          <Score totalScore={totalScore} />
        </>
      );
    } else return <h1>loading</h1>;
  }
}

export default Game;
