import React from "react";
import { Typography, Paper, LinearProgress } from "@material-ui/core";
import Title from "./Title";

const LoadingScreen = () => {
  return (
    <div>
      <Title/>
      <Paper elevation={3} id="loader-wrapper">
        <LinearProgress />
        <Typography variant="h3" align="center">
          Loading Game
        </Typography>
      </Paper>
    </div>
  );
};
export default LoadingScreen;
