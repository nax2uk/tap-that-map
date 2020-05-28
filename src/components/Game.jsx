import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import generateCountryQuestions from "../utils/generateCountryQuestions";
import { database, auth } from "../firebaseInitialise";
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
    questionArr: [],
    playerMarker: null,
    round: 0,
    roundScore: 0,
    roundDistance: 0,
    totalScore: 0,
    scoreArr: [],
  };

  toggleGameIsReady = () => {
    this.setState({ gameIsReady: true });
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

  endRound = () => {
    this.calculateScoreAndDistance();

    this.setState((currState) => {
      return {
        totalScore: currState.totalScore + currState.roundScore,
        roundIsRunning: false,
        playerMarker: null,
      };
    });
  };

  updateRound = () => {
    this.setState((currState) => {
      if (currState.round === 9) {
        this.saveScore();
        return {
          gameIsReady: false,
          gameIsRunning: false,
          gameIsFinished: true,
          roundIsRunning: false,
        };
      } else {
        return {
          round: currState.round + 1,
          roundIsRunning: true,
          playerMarker: null,
          roundDistance: 0,
          roundScore: 0,
        };
      }
    });
  };

  calculateScoreAndDistance = () => {
    let score = 0;
    let distance = 0;

    const { playerMarker, questionArr, round } = this.state;

    if (playerMarker !== null) {
      const question = questionArr[round];

      const markerPosition = {
        lat: playerMarker.position.lat(),
        lng: playerMarker.position.lng(),
      };
      distance = Math.round(
        calculate.distance(markerPosition, question.position)
      );
      score = calculate.score(distance);
    }

    this.setState(({ scoreArr, round }) => {
      const updatedScoreArr = [...scoreArr];
      updatedScoreArr[round] = score;
      return {
        roundScore: score,
        roundDistance: distance,
        scoreArr: updatedScoreArr,
      };
    });
  };

  saveScore = () => {
    const scores = database.ref("scores");
    const data = {
      UID: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      score: this.state.totalScore,
    };
    scores.push(data);
  };

  componentDidMount() {
    const countryArr = generateCountryQuestions(10);
    this.setState({ countryArr });

    countryArr.forEach((country) => {
      const request = database.ref(`countryList/${country}`);
      request.once("value", (response) => {
        const responsePosition = response.val();

        this.setState((currState) => {
          return {
            questionArr: [
              ...currState.questionArr,
              {
                location: country,
                position: responsePosition.centroid,
                borderData: {
                  type: "FeatureCollection",
                  features: [
                    { type: "Feature", geometry: responsePosition.border },
                  ],
                },
              },
            ],
          };
        });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionArr, gameIsReady } = this.state;
    const questionArrHasLoaded =
      questionArr !== prevState.questionArr && questionArr.length === 10;
    if (questionArrHasLoaded && !gameIsReady) {
      this.toggleGameIsReady();
    }
  }

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
            <>
              <Question location={questionArr[round].location} round={round} />
              <Timer
                updateRound={this.updateRound}
                endRound={this.endRound}
                userIsReady={userIsReady}
                roundIsRunning={roundIsRunning}
              />
              <Score totalScore={totalScore} />
            </>
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
          <NextButton
            gameIsRunning={gameIsRunning}
            roundIsRunning={roundIsRunning}
            updateRound={this.updateRound}
            round={round}
          />
          <Totaliser
            gameIsRunning={gameIsRunning}
            roundIsRunning={roundIsRunning}
            roundScore={roundScore}
            roundDistance={roundDistance}
          />
        </>
      );
    } else if (gameIsFinished) {
      return <ResultsPage scoreArr={scoreArr} totalScore={totalScore} />;
    } else {
      return <h1>loading</h1>;
    }
  }
}

export default Game;
