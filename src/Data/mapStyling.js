const mapStyle = [
  {
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000e96",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#fbfffc",
      },
      {
        visibility: "on",
      },
      {
        weight: 3.5,
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
      {
        weight: 2,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
    ],
  },
];

export default mapStyle;
