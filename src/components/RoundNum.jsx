import React from "react";
import { Typography } from "@material-ui/core";

const RoundNum = (props) => {
  const { round } = props;
  return (
    <div>
      <Typography variant="h4">Round Number: {round + 1}</Typography>
    </div>
  );
};

export default RoundNum;
