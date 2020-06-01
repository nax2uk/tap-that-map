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
    h2: {
      fontSize: 52,
      '@media screen and (min-width:1024px)': {
        fontSize: 44,
      },
      '@media screen and (min-width:768px)': {
        fontSize: 36,
      },
      '@media screen and (min-width:568px)': {
        fontSize: 24,
      },
      '@media screen and (min-width:320px)': {
        fontSize: 20,
      },
    },
    h3: {
      fontSize: 48,

      '@media screen and (min-width:1024px)': {
        fontSize: 40,
      },
      '@media screen and (min-width:768px)': {
        fontSize: 32,
      },
      '@media screen and (min-width:568px)': {
        fontSize: 24,
      },
      '@media screen and (min-width:320px)': {
        fontSize: 20,
      },
    },
    h4: {
      fontSize: 40,
      '@media screen and (min-width:1024px)': {
        fontSize: 32,
      },
      '@media screen and (min-width:768px)': {
        fontSize: 24,
      },
      '@media screen and (min-width:568px)': {
        fontSize: 18,
      },
      '@media screen and (min-width:320px)': {
        fontSize: 16,
      },
    }
  },

  // allows us to override css sheets in this file, instructions here https://material-ui.com/customization/globals/
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;
