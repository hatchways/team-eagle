import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, Container, Button } from "@material-ui/core";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";

import image from "../../images/woman-laptop.png";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const useStyles = makeStyles((theme) => ({
  nav: {
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 1,
  },
  link: {
    position: "absolute",
    top: 0,
    right: 0,
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  },
  forumIcon: {
    fontSize: 80,
    position: "absolute",
    top: 0,
    left: 0,
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
  heading: {
    marginBottom: "4rem",
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
  submitBox: {
    marginTop: "32px",
    display: "flex",
    justifyContent: "space-between",
  },
  checkIcon: {
    color: theme.palette.success.main,
  },
  progressIcon: {
    color: theme.palette.success.main,
    marginBottom: "-14px",
  },
  [theme.breakpoints.down("sm")]: {
    forumIcon: {
      display: "none",
    },
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
        <ForumRoundedIcon className={classes.forumIcon} />
        <Button
          component={RouterLink}
          variant="outlined"
          className={classes.link}
          to={props.form === "signup" ? "/login" : "/signup"}
        >
          {props.form === "signup" ? "Log In" : "Sign Up"}
        </Button>
      </Container>
      <Container>
        <Box className={classes.wrapper}>
          <Card className={classes.card}>
            {props.form === "signup" ? (
              <SignupForm classes={classes} />
            ) : (
              <LoginForm classes={classes} />
            )}
          </Card>
        </Box>
      </Container>
      <Box className={classes.imageContainer}></Box>
    </>
  );
}
