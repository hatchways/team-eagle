import React, { useState } from 'react';
import {
  Box,
  Snackbar,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';

let passwordMinLength = 6;

export default function LoginForm(props) {
  const classes = props.classes;

  const [state, setState] = useState({
    email: '',
    password: '',

    emailError: false,
    passwordError: false,

    snackbarOpen: false,
  });

  function closeSnackbar() {
    setState({
      ...state,
      snackbarOpen: false,
    });
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = state;

    let emailError = false;
    let passwordError = false;
    let snackbarOpen = false;
    let loading = false;

    // Validation
    if (!email) {
      emailError = 'This is a required field';
    } else if (email.search('@') === -1) {
      emailError = 'Please provide a valid email address';
    }

    if (!password) {
      passwordError = 'This is a required field';
    } else if (password.length < passwordMinLength) {
      passwordError = `Password must contain at least ${passwordMinLength} characters`;
    }

    if (!emailError && !passwordError) {
      // Sends request to server
      loading = true;
    } else {
      snackbarOpen = true;
    }
    // Updates the state
    setState({
      ...state,
      emailError,
      passwordError,
      snackbarOpen,
      loading,
    });
  }

  return (
    <Box>
      <Typography variant="h1" className={classes.heading}>
        Log In
      </Typography>
      <form>
        <TextField
          autoFocus
          className={classes.input}
          label="Email Address"
          variant="outlined"
          value={state.email}
          onChange={handleChange}
          type="email"
          name="email"
          error={!!state.emailError}
          helperText={state.emailError}
          required
        />
        <TextField
          className={classes.input}
          label="Your Password"
          variant="outlined"
          value={state.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {state.password.length >= passwordMinLength ? (
                  <CheckIcon className={classes.checkIcon} />
                ) : (
                  <span></span>
                )}
              </InputAdornment>
            ),
          }}
          type="password"
          name="password"
          error={!!state.passwordError}
          helperText={state.passwordError}
          required
        />
        <Box className={classes.submitBox}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Log In
          </Button>
          {state.loading ? (
            <CircularProgress className={classes.progressIcon} />
          ) : null}
        </Box>
      </form>
      <Snackbar
        open={state.snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        {state.emailError || state.passwordError ? (
          <Alert onClose={closeSnackbar} severity="error">
            Some fields are invalid
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
}
