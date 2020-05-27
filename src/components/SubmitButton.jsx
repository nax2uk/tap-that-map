import React from "react";
import { Button, Icon, Paper, Zoom } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const SubmitButton = ({ submitMarker, marker, roundIsRunning }) => {
  return (
    <ThemeProvider theme={theme}>
      <Zoom in={marker !== null && roundIsRunning}>
        <Paper id="submit-wrapper" elevation={5} square={true}>
          <Button color="primary" onClick={submitMarker}>
            <Icon fontSize="large">check_circle</Icon>
          </Button>
        </Paper>
      </Zoom>
    </ThemeProvider>
  );
};

export default SubmitButton;
