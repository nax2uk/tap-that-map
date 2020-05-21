import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    // used to represent primary interface elements for a user
    primary: {},

    // used to represent secondary interface elements for a user
    secondary: {},

    // used to represent interface elements that the user should be made aware of
    error: {},

    // used to represent potentially dangerous actions or important messages
    info: {},

    // used to present information to the user that is neutral and not necessarily important
    warning: {},

    // used to indicate the successful completion of an action that user triggered
    success: {},
  },

  // can import our own fonts, instructions here https://material-ui.com/customization/typography/
  typography: { fontFamily: ["Roboto"].join(","), fontSize: 14 },

  // allows us to override css sheets in this file, instructions here https://material-ui.com/customization/globals/
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;
