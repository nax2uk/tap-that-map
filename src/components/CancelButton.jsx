import React from "react";
import { Button, Icon, Paper, Zoom } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const CancelButton = ({ removeMarker, marker, roundIsRunning }) => {
  return (

    <Zoom in={marker !== null && roundIsRunning}>
      <Paper id="cancel-wrapper" elevation={5} square={true}>
        <Button color="primary" onClick={removeMarker}>
          <Icon fontSize="large">remove_circle</Icon>
        </Button>
      </Paper>
    </Zoom>

  );
};

export default CancelButton;
