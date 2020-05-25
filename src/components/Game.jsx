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
import NextButton from "./NextButton";
import Totaliser from "./Totaliser";
import ResultsPage from "./ResultsPage";

class Game extends Component {
  state = {
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
    scoreArr: [],
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

  endRound = () => {
    const { playerMarker } = this.state;
    if (playerMarker !== null) {
      this.calculateScoreAndDistance();
    }
    this.setState((currState) => {
      return {
        totalScore: currState.totalScore + currState.roundScore,
        roundIsRunning: false,
      };
    });
  };

  updateRound = () => {
    this.setState((currState) => {
      if (currState.round === 10) {
        return {
          gameIsReady: false,
          gameIsRunning: false,
          gameIsFinished: true,
          roundIsRunning: false,
        };
      } else {
        return { round: currState.round++, roundIsRunning: true };
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
    const distance = Math.round(
      calculate.distance(markerPosition, question.position)
    );

    this.setState((currState) => {
      return {
        roundScore: score,
        roundDistance: distance,
        scoreArr: [...currState.scoreArr, score],
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
      gameIsFinished,
      userIsReady,
      gameIsRunning,
      roundIsRunning,
      questionArr,
      round,
      roundScore,
      roundDistance,
      totalScore,
      scoreArr,
    } = this.state;
    if (gameIsReady && !gameIsFinished) {
      return (
        <>
          {!gameIsRunning && !userIsReady && (
            <StartButton startGame={this.startGame} />
          )}
          {gameIsRunning && (
            <Question location={questionArr[round].location} round={round} />
          )}
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
            endRound={this.endRound}
            roundScore={roundScore}
            roundDistance={roundDistance}
            userIsReady={userIsReady}
            roundIsRunning={roundIsRunning}
          />
          <Score totalScore={totalScore} />
          {gameIsRunning && !roundIsRunning && (
            <>
              <NextButton updateRound={this.updateRound} round={round} />
              <Totaliser
                roundScore={roundScore}
                roundDistance={roundDistance}
              />
            </>
          )}
        </>
      );
    } else if (gameIsFinished) {
      return <ResultsPage scoreArr={scoreArr} />;
    } else {
      return <h1>loading</h1>;
    }
  }
}

export default Game;
