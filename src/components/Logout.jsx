import React from "react";
import { Link } from "@reach/router";
import { Paper, Typography, Button } from "@material-ui/core";

const Logout = () => {
  return (
    <Paper id="logout-wrapper" elevation={3}>

      <Typography variant="h3" gutterBottom={true}>
        Logged out
        </Typography>
      <Link to="/">
        <Button variant="contained" color="primary">
          Login
          </Button>
      </Link>

    </Paper>
  );
};

export default Logout;
