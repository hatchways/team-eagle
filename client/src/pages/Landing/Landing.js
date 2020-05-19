import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, Container, Snackbar, Button } from "@material-ui/core";

import image from "../../images/woman-laptop.png";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const useStyles = makeStyles((theme) => ({
  nav: {
    position: "absolute",
  },
  link: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  wrapper: {
    width: "50%",
    height: "100vh",
    minHeight: "650px",
    display: "flex",
    backgroundColor: "white",
  },
  card: {
    margin: "auto",
    width: "400px",
    padding: "25px",
    backgroundColor: "white",
    boxShadow: "none",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "100vh",
    zIndex: "-1",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPositionX: "65%",
  },
  input: {
    width: "100%",
    marginBottom: "14px",
    textTransform: "uppercase",
  },
  heading: {
    marginBottom: "4rem",
  },
  [theme.breakpoints.down("sm")]: {
    imageContainer: {
      right: "inherit",
      width: "100%",
    },
    wrapper: {
      width: "calc(100% - 24px)",
      margin: "auto",
      backgroundColor: "transparent",
    },
    card: {
      boxShadow: theme.shadows[2],
    },
  },
}));

export default function AuthLayout(props) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.nav} component="nav">
        <Button
          component={RouterLink}
          variant="outlined"
          color="secondary"
          className={classes.link}
          to={props.form === "signup" ? "/login" : "/signup"}
        >
          {props.form === "signup" ? "Log In" : "Sign Up"}
        </Button>
      </Container>
      <Box className={classes.wrapper}>
        <Card className={classes.card}>
          {props.form === "signup" ? (
            <SignupForm classes={classes} />
          ) : (
            <LoginForm classes={classes} />
          )}
        </Card>
      </Box>
      <Box className={classes.imageContainer}></Box>
    </>
  );
}
