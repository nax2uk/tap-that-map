import React from "react";
import { Button, Icon, Paper, Zoom } from "@material-ui/core";


const SubmitButton = ({ submitMarker, marker, roundIsRunning }) => {
  return (

    <Zoom in={marker !== null && roundIsRunning}>
      <Paper id="submit-wrapper" elevation={5} square={true}>
        <Button color="primary" onClick={submitMarker}>
          <Icon fontSize="large">check_circle</Icon>
        </Button>
      </Paper>
    </Zoom>

  );
};

export default SubmitButton;
