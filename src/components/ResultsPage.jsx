import React from "react";
import { Link } from "@reach/router";
import Leaderboard from "./Leaderboard";
// import { auth } from "../firebaseInitialise";
import { Paper, Typography, Button, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const ResultsPage = ({ scoreArr, totalScore }) => {
  // let user = auth.currentUser;

  return (
    <ThemeProvider theme={theme}>
      <Box id="results-wrapper">
        <Paper id="player-results-wrapper">
          <Typography variant="h3">{`🌎  Results  🌎  ${totalScore}  🌎`}</Typography>
          {scoreArr.map((score, index) => {
            return (
              <Typography variant="h4" key="index">
                Round {index} : {score}
              </Typography>
            );
          })}
        </Paper>
        <Leaderboard />
        <Link to="/">
          <Button variant="contained" color="primary">
            BACK HOME
          </Button>
        </Link>
      </Box>
    </ThemeProvider>
  );
};

export default ResultsPage;
