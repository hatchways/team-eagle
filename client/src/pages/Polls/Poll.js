import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container, Typography } from '@material-ui/core';

import { dashboardUseStyles } from '../Dashboard/Dashboard';
import Friends from '../Dashboard/Friends';

const useStyles = makeStyles((theme) => ({
  uColorGrey: {
    color: theme.palette.grey[500],
  },
  uPaddingLeft: {
    paddingLeft: theme.spacing(6),
  },
  backLinkText: {
    textDecoration: 'underline',
  },
  backLinkContainer: {
    cursor: 'pointer',
  },
}));

export default function Poll(props) {
  const dashboardClasses = dashboardUseStyles();
  const classes = useStyles();

  return (
    <Container className={dashboardClasses.root}>
      <Grid container>
        <Hidden smDown>
          <Grid item className={dashboardClasses.leftSide}>
            <Friends />
          </Grid>
        </Hidden>
        <Grid
          item
          className={`${dashboardClasses.rightSide} ${classes.uPaddingLeft}`}
        >
          <span
            onClick={props.history.goBack}
            className={`${classes.backLinkContainer} ${classes.uColorGrey}`}
          >
            <span> &lt; </span>
            <span className={classes.backLinkText}> Back </span>
          </span>
          <br />
          <br />
          <Typography variant="h2" gutterBottom>
            Which one do you like?
          </Typography>
          <span className={classes.uColorGrey}> 24 answers </span>
        </Grid>
      </Grid>
    </Container>
  );
}

Poll.propTypes = {
  history: PropTypes.object.isRequired,
};
