import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: ".75rem",
        borderRadius: 50,
        minWidth: 120,
      },
      contained: {
        padding: "12px 16px",
      },
      outlined: {
        padding: "12px 16px",
      },
    },
    MuiInputLabel: {
      outlined: {
        "&[data-shrink='true']": {
          transform: "translate(0, -6px) scale(1)",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        marginTop: "16px",
        "& legend": {
          display: "none",
        },
      },
    },
    MuiContainer: {
      root: {
        position: "relative",
        marginTop: 50,
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
