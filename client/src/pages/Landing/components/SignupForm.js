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
import PollModal from '../../../components/polls/PollModal';
import { UserContext } from '../../../components/UserContext';

let nameMinLength = 3;
let passwordMinLength = 6;

export default function SignupForm(props) {
  const classes = props.classes;
  const user = React.useContext(UserContext);

  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',

    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',

    snackbarMessage: '',
  });

  function closeSnackbar() {
    setState({
      ...state,
      snackbarMessage: '',
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
    const { name, email, password, confirmPassword } = { ...state };

    const requiredFieldMessage = 'This is a required field';
    const nameMinLengthMessage = `Name must contain at least ${nameMinLength} characters`;
    const validEmailMessage = 'Please provide a valid email address';

    const passwordMinLengthMessage = `Password must contain at least ${passwordMinLength} characters`;
    const mismatchPasswords = 'Passwords do not match';

    const genericSnackbarMessage = 'Some fields are invalid';
    const serverErrorSnackbarMessage = 'Server error';

    let nameError = '';
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    let loading = false;

    // Validation
    if (!name) {
      nameError = requiredFieldMessage;
    } else if (name.length < nameMinLength) {
      nameError = nameMinLengthMessage;
    }

    if (!email) {
      emailError = requiredFieldMessage;
    } else if (email.search('@') === -1) {
      emailError = validEmailMessage;
    }

    if (!password) {
      passwordError = requiredFieldMessage;
    } else if (password.length < passwordMinLength) {
      passwordError = passwordMinLengthMessage;
    }

    if (!confirmPassword) {
      confirmPasswordError = requiredFieldMessage;
    } else if (confirmPassword !== password) {
      confirmPasswordError = mismatchPasswords;
    }

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      // No errors
      setState({
        ...state,
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        snackbarMessage: '',
        loading: true,
      });
      // Sends request to server
      user.signup(
        {
          name: state.name,
          email: state.email,
          password: state.password,
        },
        (err) => {
          if (err) {
            if (err.status === 400) {
              console.log(state);
              setState({
                ...state,
                nameError: err.name || '',
                emailError: err.email || '',
                passwordError: err.password || '',
                confirmPasswordError: '',
              });
            } else {
              setState({
                ...state,
                nameError: '',
                emailError: '',
                passwordError: '',
                snackbarMessage: serverErrorSnackbarMessage,
                loading: false,
              });
            }
          }
        }
      );
    } else {
      // Form has errors
      setState({
        ...state,
        nameError,
        emailError,
        passwordError,
        confirmPasswordError,
        snackbarMessage: genericSnackbarMessage,
        loading,
      });
    }
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
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create
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
        {state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.confirmPasswordError ? (
          <Alert onClose={closeSnackbar} severity="error">
            {state.snackbarMessage}
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
}
