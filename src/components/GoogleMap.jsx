import React, { Component, createRef } from "react";
import { Paper } from "@material-ui/core";

import API_KEY from "../API-KEYS/maps-api.js";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import ResultsPage from "./ResultsPage";
import mapStyle from "../Data/mapStyling";
import customMarker from "../resources/customMarker";
import customLine from "../resources/customLine";

class GoogleMap extends Component {
  state = {
    marker: null,
    linkLine: null,
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
    if (marker !== null) {
      marker.setMap(null);
    }
    this.setState({ marker: null });
  };

  submitMarker = () => {
    const { endRound } = this.props;
    endRound();
  };

  plotLinkLine = () => {
    const { marker } = this.state;
    const { question } = this.props;
    if (marker !== null && question.position !== null) {
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
    }
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
    if (question.borderData) {
      this.googleMap.data.addGeoJson(question.borderData);
      this.googleMap.data.setStyle({
        fillColor: "white",
        fillOpacity: 0.5,
        strokeColor: "white",
        strokeWeight: 0.5,
      });
    }
  };

  createAndPanToBounds = () => {
    const { question } = this.props;
    const { marker } = this.state;
    if (marker !== null) {
      const lat = marker.position.lat();
      const lng = marker.position.lng();
      let resultBounds = new window.google.maps.LatLngBounds();
      resultBounds.extend({ lat, lng });
      resultBounds.extend(question.position);
      this.googleMap.fitBounds(resultBounds);
      this.googleMap.panToBounds(resultBounds);
    }
  };

  resetMapView = () => {
    this.googleMap.setCenter({ lat: 0, lng: 0 });
    this.googleMap.setZoom(2);
  };

  handleMapClick = (e) => {
    this.removeMarker();
    this.setState({
      marker: this.placeMarker(e.latLng),
    });
  };

  /******** REACT LIFE CYCLES ********/
  componentDidUpdate(prevProps, prevState) {
    const { round, roundIsRunning } = this.props;
    const { marker } = this.state;
    const roundHasStopped =
      !roundIsRunning &&
      roundIsRunning !== prevProps.roundIsRunning &&
      marker !== null;
    const roundHasStarted =
      roundIsRunning && roundIsRunning !== prevProps.roundIsRunning;

    if (roundHasStarted) {
      window.google.maps.event.addListener(
        this.googleMap,
        "click",
        this.handleMapClick
      );
    }
    if (roundHasStopped) {
      this.plotLinkLine();
      this.plotCountryBorder();
      this.createAndPanToBounds();
      window.google.maps.event.clearListeners(this.googleMap, "click");
    }
    if (round !== prevProps.round) {
      this.removeLinkLine();
      this.removeMarker();
      this.resetMapView();
    }
  }

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
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
