import React from "react";
import { Typography } from "@material-ui/core";

const Question = (props) => {
  const { location } = props;
  return (
    <div id="question-wrapper">
      <Typography variant="h2">{`${location}`}</Typography>
    </div>
  );
};

export default Question;
