import React, { useState } from "react";

import {
  Box,
  Snackbar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

export default function LoginForm(props) {
  const classes = props.classes;
  const [state, setState] = useState({
    email: "",
    password: "",

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

    // Validation
    if (!email) {
      emailError = "This is a required field";
    } else if (email.search("@") === -1) {
      emailError = "Please provide a valid email address";
    }

    if (!password) {
      passwordError = "This is a required field";
    } else if (password.length < 6) {
      passwordError = "Password must contain at least 6 characters";
    }

    if (!emailError && !passwordError) {
      // Sends request to server
      alert("All Fields are valid");
    } else {
      snackbarOpen = true;
    }
    // Updates the state
    setState({
      ...state,
      emailError,
      passwordError,
      snackbarOpen,
    });
  }

  return (
    <Box>
      <Typography variant="h1" className={classes.heading}>
        Log In
      </Typography>
      <form>
        <TextField
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
          type="password"
          name="password"
          error={!!state.passwordError}
          helperText={state.passwordError}
          required
        />
        <div>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Log In
          </Button>
        </div>
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
        ) : (
          <Alert onClose={closeSnackbar} severity="success">
            All fields are valid!
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}
