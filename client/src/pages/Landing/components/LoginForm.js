import React from 'react';
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
import { UserContext } from '../../../components/UserContext';

let passwordMinLength = 6;

export default function LoginForm(props) {
  const classes = props.classes;
  const user = React.useContext(UserContext);

  const [state, setState] = React.useState({
    email: '',
    password: '',

    emailError: false,
    passwordError: false,

    snackbarMessage: '',
    loading: false,
  });

  function closeSnackbar() {
    setState({
      ...state,
      snackbarMessage: false,
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

    const requiredMessage = 'This is a required field';
    const invalidEmailMessage = 'Please provide a valid email address';
    const passwordMinMessage = `Password must contain at least ${passwordMinLength} characters`;
    const invalidCredentialsMessage = 'Invalid credentials';
    const serverErrorMessage = 'Server Error';
    const fieldsInvalidMessage = 'Some fields are invalid';

    let emailError = false;
    let passwordError = false;
    let snackbarMessage = '';
    let loading = false;

    // Validation
    if (!email) {
      emailError = requiredMessage;
    } else if (email.search('@') === -1) {
      emailError = invalidEmailMessage;
    }

    if (!password) {
      passwordError = requiredMessage;
    } else if (password.length < passwordMinLength) {
      passwordError = passwordMinMessage;
    }

    if (!emailError && !passwordError) {
      // Updates the state before the request
      setState({
        ...state,
        emailError,
        passwordError,
        snackbarMessage: '',
        loading: true,
      });
      // Sends request to server
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      }).then(function (res) {
        if (res.status === 200) {
          // On success
          res.json().then(function (data) {
            user.setUser(data);
          });
        } else if (res.status === 400) {
          // Invalid credentials
          setState({
            ...state,
            emailError: invalidCredentialsMessage,
            passwordError: invalidCredentialsMessage,
            snackbarMessage: invalidCredentialsMessage,
            loading: false,
          });
        } else {
          // Other errors
          setState({
            ...state,
            snackbarMessage: serverErrorMessage,
            loading: false,
          });
        }
      });
    } else {
      // Updates the state showing errors
      setState({
        ...state,
        emailError,
        passwordError,
        snackbarMessage: fieldsInvalidMessage,
        loading,
      });
    }
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
        open={!!state.snackbarMessage}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="error">
          {state.snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
