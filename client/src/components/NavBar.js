import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Link, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    height: theme.spacing(10),
    color: theme.palette.common.black,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: theme.spacing(1),
  },
  grid: {
    width: "100%",
    flexGrow: 1,
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    fontWeight: 700,
  },
}));

export default function NavBar(props) {
  const user = useContext(UserContext);
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Grid container className={classes.grid} spacing={3}>
        <Grid item className={classes.logo}>
          [LOGO HERE]
        </Grid>
        <Grid item>
          <Link component={RouterLink} className={classes.link} to="/friends">
            Friends
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            className={classes.link}
            to="/friends-polls"
          >
            Friends' Polls
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} className={classes.link} to="/opinions">
            Opinions
          </Link>
        </Grid>
        <Grid item>
          <Button
            component={RouterLink}
            className={classes.link}
            to="/create-poll"
          >
            Create Poll
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={RouterLink}
            className={classes.link}
            to="/dashboard"
          >
            <img className={classes.thumbnail} src={user.image} alt="User" />
            My Profile
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
}
