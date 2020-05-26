import React from "react";
import { Button, Icon, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const SubmitButton = ({ submitMarker, scoreSubmitted }) => {
  return (
    <Paper id="submit-wrapper" elevation={5} square={true}>
      <ThemeProvider theme={theme}>
        <Button
          color="primary"
          onClick={submitMarker}
          disabled={scoreSubmitted}
        >
          <Icon fontSize="large">check_circle</Icon>
        </Button>
      </ThemeProvider>
    </Paper>
  );
};

export default SubmitButton;
