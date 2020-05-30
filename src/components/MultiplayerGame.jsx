import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import generateCountryQuestions from "../utils/generateCountryQuestions";
import { database, auth } from "../firebaseInitialise";
import Question from "./Question";
import Timer from "./Timer";
import * as calculate from "../utils/calculateFunctions";
import Score from "./Score";
import MultiplayerStartButton from "./MultiplayerStartButton";
import MultiplayerNextButton from "./MultiplayerNextButton";
import Totaliser from "./Totaliser";
import ResultsPage from "./ResultsPage";
import MultiplayerScoresTracker from "./MultiplayerScoresTracker";

class MultiplayerGame extends Component {
  state = {
    userIsReady: false,
    participantsAreReady: false,
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
    allPlayersMarkers: {},
    allPlayersScores: [],
  };

  toggleGameIsReady = () => {
    this.setState({ gameIsReady: true });
  };

  recordPlayerMarker = (marker) => {
    this.setState({ playerMarker: marker });
  };

  userReady = () => {
    const { gameId, currentUserId } = this.props;
    const game = database.ref("multiplayerGame");

    game
      .child(gameId)
      .child("participants")
      .child(currentUserId)
      .child("userIsReady")
      .set(true);
    this.setState({ userIsReady: true });
  };

  startGame = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");

    game.child(gameId).child("startRound1").set(true);
  };

  endRound = () => {
    this.calculateScoreAndDistance();

    this.setState((currState) => {
      return {
        totalScore: currState.totalScore + currState.roundScore,
        roundIsRunning: false,
        userIsReady: false,
      };
    });
  };

  updateRound = () => {
    const { gameId } = this.props;
    const { round } = this.state;
    const game = database.ref("multiplayerGame");

    game
      .child(gameId)
      .child("round")
      .set(round + 1);

    game
      .child(gameId)
      .child("participants")
      .once("value")
      .then((data) => {
        const participantsObj = data.val();
        return Object.keys(participantsObj);
      })
      .then((keys) =>
        keys.forEach((key) => {
          game
            .child(gameId)
            .child("participants")
            .child(key)
            .child("userIsReady")
            .set(false);
        })
      );
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

  listenForQuestionArray = () => {
    const { gameId } = this.props;

    const game = database.ref("multiplayerGame");
    game
      .child(gameId)
      .child("questionArr")
      .on("value", (snapshot) => {
        const databaseQuestionArr = snapshot.val();
        this.setState({ questionArr: databaseQuestionArr });
      });
  };

  listenForPlayersAreReady = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");

    game
      .child(gameId)
      .child("participants")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const userIdList = Object.keys(data);
        if (userIdList.every((user) => data[user].userIsReady === true)) {
          this.setState({
            participantsAreReady: true,
          });
        } else {
          this.setState({ participantsAreReady: false });
        }
      });
  };

  listenForStartRound1 = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");

    game
      .child(gameId)
      .child("startRound1")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data === true) {
          this.setState({
            userIsReady: true,
            gameIsRunning: true,
            roundIsRunning: true,
          });
        }
      });
  };

  listenForRoundChange = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");

    game
      .child(gameId)
      .child("round")
      .on("value", (snapshot) => {
        const newRound = snapshot.val();
        this.setState(() => {
          if (newRound === 10) {
            return {
              gameIsReady: false,
              gameIsRunning: false,
              gameIsFinished: true,
              roundIsRunning: false,
            };
          } else if (newRound !== 0) {
            return {
              round: newRound,
              roundIsRunning: true,
              playerMarker: null,
              roundDistance: 0,
              roundScore: 0,
            };
          }
        });
      });
  };

  listenForParticipantMarkers = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");

    game
      .child(gameId)
      .child("participants")
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const participantsIds = Object.keys(data);

        participantsIds.forEach((participantId) => {
          if (participantId !== auth.currentUser.uid) {
            game
              .child(gameId)
              .child("participants")
              .child(participantId)
              .child("marker")
              .on("value", (markerSnap) => {
                const partMarker = markerSnap.val();

                this.setState((currentState) => {
                  const workingCopy = { ...currentState.allPlayersMarkers };
                  workingCopy[participantId] = partMarker;
                  return { allPlayersMarkers: workingCopy };
                });
              });
          }
          // if (participantId !== auth.currentUser.uid) {
          //   game
          //     .child(gameId)
          //     .child("participants")
          //     .child(participantId)
          //     .on("value", (snapshot) => {
          //       const { photoURL, marker } = snapshot.val();
          //       this.setState((currentState) => {
          //         const workingCopy = { ...currentState.allPlayersMarkers };
          //         workingCopy[participantId] = { photoURL, marker };
          //         return { allPlayersMarkers: workingCopy };
          //       });
          //     });
          // }
        });
      });
  };

  listenForParticipantScores = () => {
    const { gameId } = this.props;
    const game = database.ref("multiplayerGame");

    game
      .child(gameId)
      .child("participants")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const participantsIds = Object.keys(data);
        const partRoundScoreArray = [];

        participantsIds.forEach((participantId) => {
          if (participantId !== auth.currentUser.uid) {
            partRoundScoreArray.push({
              displayName: data[participantId].displayName,
              roundScore: data[participantId].roundScore,
            });
          }
        });

        this.setState({ allPlayersScores: partRoundScoreArray });
      });
  };

  componentDidMount() {
    const { isHost, gameId } = this.props;

    this.listenForQuestionArray();
    this.listenForStartRound1();
    this.listenForRoundChange();
    this.listenForParticipantMarkers();
    this.listenForParticipantScores();

    if (isHost) {
      this.listenForPlayersAreReady();
      const countryArr = generateCountryQuestions(10);
      this.setState({ countryArr });

      const questionArrayForDatabase = [];

      countryArr.forEach((country) => {
        const request = database.ref(`countryList/${country}`);
        request.once("value", (response) => {
          const responsePosition = response.val();

          questionArrayForDatabase.push({
            location: country,
            position: responsePosition.centroid,
            borderData: {
              type: "FeatureCollection",
              features: [
                { type: "Feature", geometry: responsePosition.border },
              ],
            },
          });

          if (questionArrayForDatabase.length === 10) {
            const game = database.ref("multiplayerGame");
            game
              .child(gameId)
              .child("questionArr")
              .set(questionArrayForDatabase);
          }
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      questionArr,
      gameIsReady,
      gameIsFinished,
      roundIsRunning,
      userIsReady,
      playerMarker,
      roundScore,
      totalScore,
    } = this.state;
    const { gameId, currentUserId } = this.props;

    const questionArrHasLoaded =
      questionArr !== null &&
      questionArr !== prevState.questionArr &&
      questionArr.length === 10;

    const game = database.ref("multiplayerGame");

    if (questionArrHasLoaded && !gameIsReady) {
      this.toggleGameIsReady();
    }
    if (roundIsRunning !== prevState.roundIsRunning) {
      game
        .child(gameId)
        .child("participants")
        .child(currentUserId)
        .child("roundIsRunning")
        .set(roundIsRunning);
    }
    if (userIsReady !== prevState.userIsReady) {
      game
        .child(gameId)
        .child("participants")
        .child(currentUserId)
        .child("userIsReady")
        .set(userIsReady);
    }
    if (playerMarker !== prevState.playerMarker) {
      let markerLatLng = null;
      if (playerMarker !== null) {
        markerLatLng = {
          lat: playerMarker.position.lat(),
          lng: playerMarker.position.lng(),
        };
      }

      game
        .child(gameId)
        .child("participants")
        .child(currentUserId)
        .child("marker")
        .set(markerLatLng);
    }

    if (totalScore !== prevState.totalScore) {
      game
        .child(gameId)
        .child("participants")
        .child(currentUserId)
        .child("totalScore")
        .set(totalScore);
    }

    if (roundScore !== prevState.roundScore) {
      game
        .child(gameId)
        .child("participants")
        .child(currentUserId)
        .child("roundScore")
        .set(roundScore);
    }

    if (gameIsFinished !== prevState.gameIsFinished) {
      this.saveScore();
    }
  }

  render() {
    const { currentUserId, isHost } = this.props;
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
      participantsAreReady,
      allPlayersMarkers,
      allPlayersScores,
    } = this.state;
    if (gameIsReady && !gameIsFinished) {
      return (
        <>
          {!gameIsRunning && (
            <MultiplayerStartButton
              startGame={this.startGame}
              userReady={this.userReady}
              isHost={isHost}
              participantsAreReady={participantsAreReady}
            />
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
            allPlayersMarkers={allPlayersMarkers}
          />
          <MultiplayerNextButton
            gameIsRunning={gameIsRunning}
            roundIsRunning={roundIsRunning}
            updateRound={this.updateRound}
            round={round}
            isHost={isHost}
            participantsAreReady={participantsAreReady}
            userReady={this.userReady}
          />
          <Totaliser
            gameIsRunning={gameIsRunning}
            roundIsRunning={roundIsRunning}
            roundScore={roundScore}
            roundDistance={roundDistance}
          />
          <MultiplayerScoresTracker
            gameIsRunning={gameIsRunning}
            roundIsRunning={roundIsRunning}
            allPlayersScores={allPlayersScores}
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

export default MultiplayerGame;
