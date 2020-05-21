import React, { Component, createRef } from "react";
import API_KEY from "../API-KEYS/maps-api.js";
import { Fab } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import questionData from "../Data/questions.json"; //  array - country objects {name, position, lat/long}
import Timer from "./Timer";
import mapStyle from "../Data/mapStyling";
import Question from "./Question";
import Score from "./Score.jsx";

class GoogleMap extends Component {
  state = {
    marker: null,
    // markerAdded: false,
    question: questionData.questions[0],
    totalScore: 0,
    round: 0,
  };

  googleMapRef = createRef();

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

  generateQuestion = (questionDataArr) => {
    //pass this to Question in props
    const index = Math.floor(Math.random() * questionDataArr.length);
    this.setState({
      question: questionDataArr[index],
    });
    // console.log(questionDataArr[index].location);
  };

  updateRound = (currState) => {
    this.setState((currState) => {
      // console.log("Updated!", this.state.round)
      return { round: currState.round++ };
    });
  };

  placeMarker = (latLng) => {
    return new window.google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      animation: window.google.maps.Animation.DROP,
      // makes the marker draggable across the map, may not need to add a resubmit/change marker function.
      draggable: true,
    });
  };

  // The simplest method of calculating distance relies on some advanced-looking math.
  // Known as the Haversine formula, it uses spherical trigonometry to determine the great circle distance between two points.
  calculateDistance = (mk1, mk2) => {
    console.log(mk1.lat); //
    var R = 6371.071; // Radius of the Earth in miles 3958.8
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  };

  calculateScore = (event) => {
    event.preventDefault();
    const { marker, question } = this.state;
    if (marker !== null) {
      const distance = this.calculateDistance(
        { lat: marker.position.lat(), lng: marker.position.lng() },
        { lat: question.position.lat, lng: question.position.lng }
      );

      let circleOfEarth = 2 * Math.PI * 6371.071;
      const percentage = Math.floor(
        ((circleOfEarth - distance) / circleOfEarth) * 100
      );
      const score = (percentage - 50) * 2;
      this.setState((currState) => {
        return { totalScore: currState.totalScore + score };
      });
    } else {
      // need to look at adding material UI styling to the alert?
      window.alert("You need to place a marker before submitting!");
    }
  };

  componentDidUpdate() {
    // const googleMapScript = document.createElement("script");
    // googleMapScript.addEventListener("load", () => {
    //   this.googleMap = this.createGoogleMap();
    //   window.google.maps.event.addListener(this.googleMap, "click", (e) => {
    //     if (this.state.marker === null)
    //       this.setState({
    //         marker: this.placeMarker(e.latLng),
    //         // markerAdded: true,
    //       });
    //   });
    // });
  }



  componentDidMount() {
    const googleMapScript = document.createElement("script");

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    this.generateQuestion(questionData.questions);

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
    // console.log(this.state.question);
    const { totalScore, question } = this.state;
    return (
      <>
        <Question location={question.location} />
        <Score totalScore={totalScore} />
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: window.innerWidth, height: window.innerHeight }}
        />
        <div id="submit-wrapper">
          <Fab size="large" onClick={this.calculateScore}>
            <Icon fontSize="large">check_circle</Icon>
          </Fab>
        </div>
        <Timer updateRound={this.updateRound} />
      </>
    );
  }
}

export default GoogleMap;
