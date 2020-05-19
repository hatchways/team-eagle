import { createMuiTheme } from "@material-ui/core";

const MuiButton = {
  root: {
    fontSize: ".75rem",
    borderRadius: 50,
    minWidth: 120,
  },
  contained: {
    padding: "16px",
  },
  outlined: {
    padding: "16px",
  },
};

export const theme = createMuiTheme({
  overrides: {
    MuiButton,
    MuiContainer: {
      root: {
        position: "relative",
        paddingLeft: 0,
        paddingRight: 0,
        width: "calc(100% - 24px)",
        "@media (min-width: 600px)": {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      fontSize: "2rem",
    },
    a: {
      fontFamily: '"Roboto"',
      display: "none",
    },
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});
