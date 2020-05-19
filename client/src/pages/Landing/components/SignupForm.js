import React, { useState } from "react";

import {
  Box,
  Snackbar,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CheckIcon from "@material-ui/icons/Check";

let nameMinLength = 3;
let passwordMinLength = 6;

export default function SignupForm(props) {
  const classes = props.classes;

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",

    nameError: false,
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
    const { name, email, password } = state;

    let nameError = false;
    let emailError = false;
    let passwordError = false;
    let snackbarOpen = false;
    let loading = false;

    // Validation
    if (!name) {
      nameError = "This is a required field";
    } else if (name.length < nameMinLength) {
      nameError = `Name must contain at least ${nameMinLength} characters`;
    }

    if (!email) {
      emailError = "This is a required field";
    } else if (email.search("@") === -1) {
      emailError = "Please provide a valid email address";
    }

    if (!password) {
      passwordError = "This is a required field";
    } else if (password.length < passwordMinLength) {
      passwordError = `Password must contain at least ${passwordMinLength} characters`;
    }

    if (!nameError && !emailError && !passwordError) {
      // Sends request to server
      loading = true;
    } else {
      snackbarOpen = true;
    }
    // Updates the state
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      snackbarOpen,
      loading,
    });
  }

  return (
    <Box>
      <Typography variant="h1" className={classes.heading}>
        Create an account
      </Typography>
      <form>
        <TextField
          autoFocus
          className={classes.input}
          label="Your Name"
          variant="outlined"
          value={state.name}
          onChange={handleChange}
          type="text"
          name="name"
          error={!!state.nameError}
          helperText={state.nameError}
          required
        />
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
            Create
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
        {state.nameError || state.emailError || state.passwordError ? (
          <Alert onClose={closeSnackbar} severity="error">
            Some fields are invalid
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
}
