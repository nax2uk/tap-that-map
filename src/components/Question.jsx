import React from "react";

const Question = (props) => {
  const { location } = props;
  return <h2>{`Where is ${location} on the map?`}</h2>;
};

export default Question;
