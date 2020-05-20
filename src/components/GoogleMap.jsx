import React, { Component, createRef } from "react";
import API_KEY from "../API-KEYS/maps-api";
// import { Container } from "@material-ui/core";

class GoogleMap extends Component {
state = {
  marker: null,
  // markerAdded: false, 

}

  googleMapRef = createRef();

  createGoogleMap = () => {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 10,
      center: {
        lat: 1.3521,
        lng: 103.8198,
      },
      disableDefaultUI: true,
    });
  };

  placeMarker = (latLng) => {
    return new window.google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      // makes the marker draggable across the map, may not need to add a resubmit/change marker function.
      draggable: true, 
    });
  };

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
          // markerAdded: true,
        }) 
      });
    });
  }

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: window.innerWidth, height: window.innerHeight }}
      />
    );
  }
}

export default GoogleMap;
