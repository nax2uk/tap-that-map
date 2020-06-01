import React from "react";
import { Link } from "@reach/router";
import Leaderboard from "./Leaderboard";
import { Paper, Typography, Button, Box } from "@material-ui/core";

const ResultsPage = ({ scoreArr, totalScore, participants }) => {
  return (
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
      <Leaderboard participants={participants} />
      <Box>
        <Link to="/">
          <Button variant="contained" color="primary">
            BACK HOME
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ResultsPage;
