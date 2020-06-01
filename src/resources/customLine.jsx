const lineSymbol = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 4,
};

const customLine = {
  geodesic: false,
  strokeColor: "#FF0000",
  strokeOpacity: 0,
  strokeWeight: 4,
  icons: [{ icon: lineSymbol, offset: "0", repeat: "20px" }],
};

export default customLine;
