import React, { Component, createRef } from "react";
import { Paper } from "@material-ui/core";
import { database } from "../firebaseInitialise";
import API_KEY from "../API-KEYS/maps-api.js";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import ResultsPage from "./ResultsPage";
import mapStyle from "../Data/mapStyling";
import customMarker from "../resources/customMarker";
import customLine from "../resources/customLine";

class GoogleMap extends Component {
  state = {
    allOverlay: [],
    marker: null,
    linkLine: null,
    roundBounds: null,
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
    const { recordPlayerMarker } = this.props;
    const newMarker = new window.google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      draggable: true,
      icon: customMarker,
    });
    recordPlayerMarker(newMarker);
    return newMarker;
  };

  removeMarker = () => {
    const { marker } = this.state;
    marker.setMap(null);
    this.setState({ marker: null });
  };

  submitMarker = () => {
    const { endRound } = this.props;
    endRound();
  };

  plotLinkLine = () => {
    const { marker } = this.state;
    const { question } = this.props;
    const markerPosition = {
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    };
    const linkPath = [markerPosition, question.position];

    const linkLine = new window.google.maps.Polyline({
      path: linkPath,
      ...customLine,
    });

    linkLine.setMap(this.googleMap);

    this.setState({ linkLine });
  };

  removeLinkLine = () => {
    const { linkLine } = this.state;
    if (linkLine !== null) {
      linkLine.setMap(null);
    }

    this.setState({ linkLine: null });
  };

  plotCountryBorder = () => {
    const { question } = this.props;
    this.googleMap.data.addGeoJson(question.borderData);
    this.googleMap.data.setStyle({
      fillColor: "white",
      fillOpacity: 0.5,
      strokeColor: "black",
      strokeWeight: 0,
    });
  };

  createBounds = () => {
    const { question } = this.props;
    const { marker } = this.state;
    let resultBounds = new window.google.maps.LatLngBounds();

    resultBounds.extend(question.position);
    resultBounds.extend({ lat: marker.position.lat, lng: marker.position.lng });

    this.setState({ roundBounds: resultBounds });
  };

  panToBounds = () => {
    const { roundBounds } = this.state;
    this.googleMap.fitBounds(roundBounds);
    this.googleMap.panToBounds(roundBounds);
  };

  resetMapView = () => {
    this.googleMap.setCenter({ lat: 0, lng: 0 });
    this.googleMap.setZoom(2);
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
  componentDidUpdate(prevProps, prevState) {
    const { round, roundIsRunning } = this.props;
    const { marker } = this.state;
    const roundHasStopped =
      !roundIsRunning &&
      roundIsRunning !== prevProps.roundIsRunning &&
      marker !== null;
    if (roundHasStopped) {
      // this.createBounds();
      this.plotLinkLine();
      //this.plotCountryBorder();
      // this.panToBounds();
    }
    if (round !== prevProps.round) {
      this.removeLinkLine();
      this.removeMarker();
    }
  }

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      window.google.maps.event.addListener(this.googleMap, "click", (e) => {
        if (this.state.marker === null)
          this.setState({
            marker: this.placeMarker(e.latLng),
          });
      });
    });
  }

  render() {
    const { gameOver, scoreSubmitted, marker } = this.state;
    const { roundIsRunning } = this.props;
    if (gameOver) return <ResultsPage />;
    return (
      <>
        <Paper
          elevation={3}
          square={true}
          id="google-map"
          ref={this.googleMapRef}
          style={{
            width: 0.95 * window.innerWidth,
            height: 0.95 * window.innerHeight,
          }}
        />
        {marker !== null && roundIsRunning && (
          <>
            <SubmitButton
              submitMarker={this.submitMarker}
              scoreSubmitted={scoreSubmitted}
            />
            <CancelButton removeMarker={this.removeMarker} />
          </>
        )}
      </>
    );
  }
}

export default GoogleMap;
