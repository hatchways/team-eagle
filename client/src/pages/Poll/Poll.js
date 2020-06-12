import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container, Typography } from '@material-ui/core';

import { PollContext } from '../../components/contexts/PollContext';
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
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
}));

export default function Poll() {
  const [error, setError] = useState(null);
  const pollCtx = useContext(PollContext);
  const poll = pollCtx.poll;
  const votes = pollCtx.votes;
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
        pollCtx.setPollState(data);
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

  if (!poll._id) {
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
          <PollPageHeader poll={poll} />

          <PollImages
            pollId={poll._id}
            votes={votes}
            justifyContainer="flex-start"
            images={poll.images}
            imageSize="15vh"
            favIconSize="5px"
          />
          <VoteList poll={poll} votes={votes} />
        </Grid>
      </Grid>
    </Container>
  );
}
