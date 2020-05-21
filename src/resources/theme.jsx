import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    // used to represent primary interface elements for a user
    primary: {
      main: "#00008B",
    },
    // used to represent secondary interface elements for a user
    secondary: {
      main: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: ["Permanent Marker", "Roboto"].join(","),
    fontSize: 14,
  },

  // allows us to override css sheets in this file, instructions here https://material-ui.com/customization/globals/
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;
