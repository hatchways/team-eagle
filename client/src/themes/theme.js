import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  // Use the overrides to set defaults
  overrides: {
    MuiButton: {
      root: {
        fontSize: '.75rem',
        borderRadius: 50,
        minWidth: 120,
      },
      contained: {
        padding: '12px 16px',
      },
      outlined: {
        padding: '12px 16px',
      },
    },
    MuiInputLabel: {
      outlined: {
        fontWeight: 700,
        "&[data-shrink='true']": {
          transform: 'translate(0, -6px) scale(1)',
        },
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 20,
      },
    },
    MuiOutlinedInput: {
      root: {
        marginTop: '16px',
        '& legend': {
          display: 'none',
        },
        '& input[type="password"]': {
          font: 'large Verdana,sans-serif',
          letterSpacing: '1px',
        },
      },
    },
    MuiContainer: {
      root: {
        position: 'relative',
        paddingLeft: 0,
        paddingRight: 0,
        width: 'calc(100% - 24px)',
        '@media (min-width: 600px)': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: 12,
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    a: {
      display: 'none',
    },
  },
  palette: {
    primary: {
      main: '#000000', // Black
    },
    secondary: {
      main: '#FF5D5D', // Pink
    },
  },
});
