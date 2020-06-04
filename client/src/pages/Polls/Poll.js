import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container } from '@material-ui/core';

import Friends from '../Dashboard/Friends';

export default function Poll(props) {
  const classes = useStyles();

  const handleBack = () => {
    props.history.goBack();
  };

  return (
    <Container className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid item className={classes.leftSide}>
            <Friends />
          </Grid>
        </Hidden>
        <Grid item className={classes.rightSide}>
          <span
            onClick={handleBack}
            className={`${classes.backLinkContainer} ${classes.uColorGrey}`}
          >
            <span> &lt; </span>
            <span className={classes.backLinkText}> Back </span>
          </span>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    minHeight: '100vh',
    display: 'flex',
  },
  leftSide: {
    width: 200,
    paddingTop: theme.spacing(5),
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    height: '100%',
  },
  rightSide: {
    width: `calc(100% - 200px)`,
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
  },
  uColorGrey: {
    color: theme.palette.grey[500],
  },
  backLinkText: {
    textDecoration: 'underline',
  },
  backLinkContainer: {
    cursor: 'pointer',
  },
}));

Poll.propTypes = {
  history: PropTypes.object.isRequired,
};
