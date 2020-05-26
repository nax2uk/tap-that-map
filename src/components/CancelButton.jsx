import React from "react";
import { Button, Icon, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";

const CancelButton = ({ removeMarker }) => {
  return (
    <Paper id="cancel-wrapper" elevation={5} square={true}>
      <ThemeProvider theme={theme}>
        <Button color="primary" onClick={removeMarker}>
          <Icon fontSize="large">remove_circle</Icon>
        </Button>
      </ThemeProvider>
    </Paper>
  );
};

export default CancelButton;
