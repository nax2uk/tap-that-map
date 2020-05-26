export const distance = (mk1, mk2) => {
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

export const score = (distance) => {
  let score = 0;
  // const calculatedDistance = distance(
  //   { lat: p1.lat, lng: p1.lng },
  //   { lat: p2.lat, lng: p2.lng }
  // );

  // let circleOfEarth = 2 * Math.PI * 6371.071;
  // const percentage = Math.floor(
  //   ((circleOfEarth - calculatedDistance) / circleOfEarth) * 100
  // );

  // const score = (percentage - 50) * 2;
  if (distance < 5000) {
    score = Math.round(((5000 - distance) / 5000) * 100);
  }
  return score;
};
