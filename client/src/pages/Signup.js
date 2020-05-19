import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Grid,
  Container,
  Typography,
  Hidden,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
// import { PrimaryButton, SecondaryButton } from '../components/Button';

import image from "../images/woman-laptop.png";

const useStyles = makeStyles((theme) => ({
  content: {},
  signIn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "100vh",
    zIndex: "-1",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
}));

function Signup() {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box className={classes.content}>
          <Typography variant="h1">Create an account</Typography>
          <FormControl>
            <TextField label="Your Name" variant="outlined" required />
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              required
            />
            <TextField
              label="Your Password"
              variant="outlined"
              type="password"
              required
            />
            <div>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </div>
          </FormControl>
        </Box>
        <Button
          component="a"
          variant="outlined"
          color="primary"
          className={classes.signIn}
        >
          Sign In
        </Button>
      </Container>
      <Hidden xsDown>
        <Box className={classes.imageContainer}>
          <img
            src={image}
            alt="Woman sitting on the floor smiling while using a laptop"
          />
        </Box>
      </Hidden>
    </>
  );
}

export default Signup;
