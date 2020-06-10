import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container, Typography } from '@material-ui/core';

import { useDashboardStyles } from '../Dashboard/Dashboard';
import Friends from '../Dashboard/Friends';
import PollImages from '../Dashboard/PollImages';
import PollPageHeader from './PollPageHeader';
import VoteList from './VoteList';
import { getPoll } from '../../util/api_util';

const useStyles = makeStyles((theme) => ({
  uColorGrey: {
    color: theme.palette.grey[500],
  },
  uPadding: {
    paddingLeft: theme.spacing(6),
  },
  backLinkText: {
    textDecoration: 'underline',
  },
  backLinkContainer: {
    cursor: 'pointer',
  },
  [theme.breakpoints.down('sm')]: {
    uPadding: {
      paddingTop: theme.spacing(0),
      paddingLeft: theme.spacing(2),
    },
  },
}));

export default function Poll() {
  const [error, setError] = useState(null);
  const [state, setState] = useState({ poll: {}, votes: [] });
  const dashboardClasses = useDashboardStyles();
  const classes = useStyles();
  const pollId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  React.useEffect(() => {
    getPoll(pollId, (err, data) => {
      if (err) {
        setError(err);
      } else {
        setState((prevState) => {
          return { ...prevState, ...data };
        });
      }
    });
  }, []);

  if (error) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ marginTop: '90px' }}
      >
        <Grid item>
          <Typography variant="h3"> {error} </Typography>
        </Grid>
      </Grid>
    );
  }

  if (!state.poll._id) {
    // poll is still loading
    return null;
  }

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
          className={`${dashboardClasses.rightSide} ${classes.uPadding}`}
        >
          <PollPageHeader poll={state.poll} />

          <PollImages
            justifyContainer="flex-start"
            images={state.poll.images}
            imageSize="15vh"
            favIconSize="5px"
          />
          <VoteList poll={state.poll} votes={state.votes} />
        </Grid>
      </Grid>
    </Container>
  );
}

Poll.propTypes = {
  history: PropTypes.object.isRequired,
};
