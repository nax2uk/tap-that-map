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
        <Paper elevation={3} id="player-results-wrapper">
          <Box className="two-item-box">
            <Typography variant="h3">Your result</Typography>
            <Typography variant="h3">{totalScore}</Typography>
          </Box>
          {scoreArr.map((score, index) => {
            return (
              <Typography variant="h4" key={`${score}${index}`} align="center">
                Round {index + 1} : {score}
              </Typography>
            );
          })}
        </Paper>
        <Leaderboard />
        <Box>
          <Link to="/">
            <Button variant="contained" color="primary">
              BACK HOME
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResultsPage;
