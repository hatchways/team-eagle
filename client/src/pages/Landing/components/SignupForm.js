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
// import AddPollButton from '../../../components/polls/AddPollButton';
import PollModal from '../../../components/polls/PollModal';

let nameMinLength = 3;
let passwordMinLength = 6;

export default function SignupForm(props) {
  const classes = props.classes;

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',

    nameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,

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
    const { name, email, password, confirmPassword } = state;

    let nameError = false;
    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;
    let snackbarOpen = false;
    let loading = false;

    // Validation
    if (!name) {
      nameError = 'This is a required field';
    } else if (name.length < nameMinLength) {
      nameError = `Name must contain at least ${nameMinLength} characters`;
    }

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

    if (!confirmPassword) {
      confirmPasswordError = 'This is a required field';
    } else if (confirmPassword !== password) {
      confirmPasswordError = 'Passwords do not match';
    }

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
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
      confirmPasswordError,
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
        <TextField
          className={classes.input}
          label="Confirm Password"
          variant="outlined"
          value={state.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {state.confirmPassword.length >= passwordMinLength ? (
                  <CheckIcon className={classes.checkIcon} />
                ) : (
                  <span></span>
                )}
              </InputAdornment>
            ),
          }}
          type="password"
          name="confirmPassword"
          error={!!state.confirmPasswordError}
          helperText={state.confirmPasswordError}
          required
        />
        <Box className={classes.submitBox}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
          <PollModal view="add" />
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
        {state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.confirmPasswordError ? (
          <Alert onClose={closeSnackbar} severity="error">
            Some fields are invalid
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
}
