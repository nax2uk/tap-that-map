import React from "react";
import { Link } from "@reach/router";
import Leaderboard from "./Leaderboard";
import { Paper, Typography, List, ListItem, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const ResultsPage = ({ scoreArr, totalScore }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Typography variant="h1">
          {"Thanks for playing TAP THAT MAP 🌎"}
        </Typography>
        <Typography variant="h2">Here are your results:</Typography>
        <List>
          <ListItem>Round 1:{scoreArr[0]}</ListItem>
          <ListItem>Round 2:{scoreArr[1]}</ListItem>
          <ListItem>Round 3:{scoreArr[2]}</ListItem>
          <ListItem>Round 4:{scoreArr[3]}</ListItem>
          <ListItem>Round 5:{scoreArr[4]}</ListItem>
          <ListItem>Round 6:{scoreArr[5]}</ListItem>
          <ListItem>Round 7:{scoreArr[6]}</ListItem>
          <ListItem>Round 8:{scoreArr[7]}</ListItem>
          <ListItem>Round 9:{scoreArr[8]}</ListItem>
          <ListItem>Round 10:{scoreArr[9]}</ListItem>
          <ListItem>Total: {totalScore}</ListItem>
        </List>
        <Button>
          <Link to="/">BACK HOME</Link>
        </Button>
      </Paper>
      <Leaderboard />
    </ThemeProvider>
  );
};

export default ResultsPage;
