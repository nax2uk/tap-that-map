import React, { Component, createRef } from "react";
import API_KEY from "../API-KEYS/maps-api";
// import { Container } from "@material-ui/core";

class GoogleMap extends Component {
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

  addMarker = ({ coords, icon, content }) => {
    let marker = new window.google.maps.Marker({
      position: coords,
      map: this.googleMap,
      icon: icon,
    });
    if (content) {
      let infoWindow = new window.google.maps.InfoWindow({
        content: content,
      });
      marker.addListener("click", () => {
        infoWindow.open(this.googleMap, marker);
      });
    }
    return marker;
  };

  componentDidMount() {
    const googleMapScript = document.createElement("script");

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap(); 
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
