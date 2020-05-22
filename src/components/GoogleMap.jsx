import React, { Component, createRef } from "react";
import API_KEY from "../API-KEYS/maps-api.js";
import { Fab, Icon } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import Timer from "./Timer";
import mapStyle from "../Data/mapStyling";
import Question from "./Question";
import Score from "./Score.jsx";
import { database } from "../firebaseInitialise";
import calculateScore from "../utils/calculateScore";
import generateCountryQuestions from "../utils/generateCountryQuestions";
// import RoundNum from "./RoundNum.jsx";

class GoogleMap extends Component {
  state = {
    allMarkers: [],
    marker: null,
    // markerAdded: false,
    question: null,
    countryArr: null,
    totalScore: 0,
    round: 0,
    gameOver: false,
    scoreSubmitted: false,
  };

  googleMapRef = createRef();

  /******** MAP FUNCTIONS ********/
  createGoogleMap = () => {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 2,
      center: {
        lat: 0,
        lng: 0,
      },
      disableDefaultUI: true,
      styles: mapStyle,
    });
  };

  placeMarker = (latLng) => {
    let newMarker = new window.google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      animation: window.google.maps.Animation.DROP,
      draggable: true,
    });
    const { allMarkers } = this.state;
    this.setState({ allMarkers: [newMarker, ...allMarkers] });
    return newMarker;
  };

  setMapOnAll = (map) => {
    const { allMarkers } = this.state;

    for (var i = 0; i < allMarkers.length; i++) {
      allMarkers[i].setMap(map);
    }
  };

  removeMarker = () => {
    this.setMapOnAll(null);
  };

  //called when submit button is clicked
  submitMarker = (event) => {
    event.preventDefault();
    const { marker, question } = this.state;
    if (marker !== null) {
      const markerPosition = {
        lat: marker.position.lat(),
        lng: marker.position.lng(),
      };
      const score = calculateScore(markerPosition, question.position);

      this.setState((currState) => {
        return {
          totalScore: currState.totalScore + score,
          scoreSubmitted: true,
        };
      });
    } else {
      // need to look at adding material UI styling to the alert?
      window.alert("You need to place a marker before submitting!");
    }
  };

  /******** QUESTION FUNCTIONS ********/
  // called in componentDidMount and componentDidUpdate
  getQuestion = () => {
    const { countryArr, round } = this.state;
    const location = countryArr[round];

    var country = database.ref(`countries/${location}`);
    country.on("value", (data) => {
      const countryData = data.val();
      const countryObj = { location: location, position: countryData };
      this.setState({
        question: countryObj,
      });
    });
  };

  /********* ROUND FUNCTIONS ********/
  updateRound = () => {
    if (this.state.round < 9) {
      this.setState((currState) => {
        this.removeMarker();
        return {
          round: currState.round++,
          scoreSubmitted: false,
          marker: null,
        };
      });
    } else this.setState({ gameOver: true });
  };

  setRound = (roundsNum) => {
    this.setState({
      round: roundsNum,
    });
  };

  saveScore = () => {
    const scores = database.ref("scores");
    const data = {
      UID: this.props.currentUserId,
      score: this.state.totalScore,
    };
    scores.push(data);
  };

  /******** REACT LIFE CYCLES ********/
  componentDidUpdate(prevProp, prevState) {
    if (prevState.round !== this.state.round) {
      this.getQuestion();
    }
    if (prevState.gameOver !== this.state.gameOver) {
      this.saveScore();
    }
  }

  componentDidMount() {
    const googleMapScript = document.createElement("script");

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    //this.generateQuestion(questionData.questions);
    this.setState(
      {
        countryArr: generateCountryQuestions(10),
      },
      () => {
        this.getQuestion();
      }
    );

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      window.google.maps.event.addListener(this.googleMap, "click", (e) => {
        if (this.state.marker === null)
          this.setState({
            marker: this.placeMarker(e.latLng),
            // markerAdded: true,
          });
      });
    });
  }

  render() {
    const {
      totalScore,
      round,
      question,
      gameOver,
      scoreSubmitted,
    } = this.state;
    if (gameOver) return <h1>END OF GAME/Results... </h1>;
    return (
      <>
        {question !== null ? <Question location={question.location} /> : null}
        <Score totalScore={totalScore} round={round} />

        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: window.innerWidth, height: window.innerHeight }}
        />
        <div id="submit-wrapper">
          <ThemeProvider theme={theme}>
            <Fab
              size="large"
              onClick={this.submitMarker}
              disabled={scoreSubmitted}
              color="secondary"
            >
              <Icon fontSize="large">check_circle</Icon>
            </Fab>
          </ThemeProvider>
        </div>
        <Timer
          updateRound={this.updateRound}
          round={round}
          setRound={this.setRound}
        />
      </>
    );
  }
}

export default GoogleMap;
