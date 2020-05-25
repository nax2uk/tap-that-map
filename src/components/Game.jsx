import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import generateCountryQuestions from "../utils/generateCountryQuestions";
import * as borderGeojson from "../resources/hq-borders.json";
import { database } from "../firebaseInitialise";
import Question from "./Question";
import Timer from "./Timer";
import * as calculate from "../utils/calculateFunctions";
import Score from "./Score";
import StartButton from "./StartButton";

class Game extends Component {
  state = {
    gameIsReady: false,
    userIsReady: false,
    gameIsRunning: false,
    roundIsRunning: false,
    gameIsFinished: false,
    questionArr: null,
    playerMarker: null,
    round: 0,
    roundScore: 0,
    roundDistance: 0,
    totalScore: 0,
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

  startGame = () => {
    this.setState({
      userIsReady: true,
      gameIsRunning: true,
      roundIsRunning: true,
    });
  };

  endGame = () => {};

  startRound = () => {
    this.setState({ roundIsRunning: true });
  };

  endRound = () => {
    this.setState({ roundIsRunning: false });
    this.calculateScoreAndDistance();
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

  calculateScoreAndDistance = () => {
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
  };

  componentDidMount() {
    const countryArr = generateCountryQuestions(10);

    const questionArr = countryArr.map((country) => {
      return { location: country, position: null, borderData: null };
    });

    questionArr.forEach((question) => {
      const request = database.ref(`countries/${question.location}`);
      request.once("value", (response) => {
        question.position = response.val();
      });
      question.borderData = this.getQuestionGeojson(question);
    });

    this.setState(() => {
      return { countryArr, questionArr, gameIsReady: true };
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { currentUserId } = this.props;
    const {
      gameIsReady,
      userIsReady,
      gameIsRunning,
      roundIsRunning,
      questionArr,
      round,
      roundScore,
      roundDistance,
      totalScore,
      timerInSeconds,
    } = this.state;
    if (gameIsReady) {
      return (
        <>
          {!gameIsRunning && !userIsReady && (
            <StartButton startGame={this.startGame} />
          )}
          <Question location={questionArr[round].location} round={round} />
          <GoogleMap
            currentUserId={currentUserId}
            round={round}
            question={questionArr[round]}
            recordPlayerMarker={this.recordPlayerMarker}
            gameIsRunning={gameIsRunning}
            roundIsRunning={roundIsRunning}
            endRound={this.endRound}
          />
          <Timer
            updateRound={this.updateRound}
            startRound={this.startRound}
            timerInSeconds={timerInSeconds}
            roundScore={roundScore}
            roundDistance={roundDistance}
            userIsReady={userIsReady}
          />
          <Score totalScore={totalScore} />
        </>
      );
    } else return <h1>loading</h1>;
  }
}

export default Game;
