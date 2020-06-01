import React from "react";
import { Link } from "@reach/router";
import Leaderboard from "./Leaderboard";
import Title from './Title'
import { Paper, Typography, Button, Box, Grid } from "@material-ui/core";

const ResultsPage = ({ scoreArr, totalScore, participants }) => {
  return (
    <>
      <Title />
      <Grid container spacing={3}>
        <Grid container item xs={12} justify="center" spacing={1}>
          <Grid item xs={6}>
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
          </Grid >
          <Grid item xs={6}>
            <Leaderboard participants={participants} />
          </Grid>
          <Box>
            <Link to="/">
              <Button variant="contained" color="primary">
                BACK HOME
          </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResultsPage;
