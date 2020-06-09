import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container, Typography } from '@material-ui/core';

import { useDashboardStyles } from '../Dashboard/Dashboard';
import Friends from '../Dashboard/Friends';
import PollImages from '../Dashboard/PollImages';
import PollPageHeader from './PollPageHeader';
import VoteList from './VoteList';
import { PollContext } from '../../components/contexts/PollContext';

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
  const [hasError, setHasError] = useState(false);
  const dashboardClasses = useDashboardStyles();
  const classes = useStyles();
  const pollCtx = useContext(PollContext);
  const pollId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  React.useEffect(() => {
    pollCtx.getPoll(pollId, (err) => {
      setHasError(true);
    });
  }, []);

  const poll = pollCtx.poll;
  const votes = pollCtx.votes;

  if (hasError) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ marginTop: '90px' }}
      >
        <Grid item>
          <Typography variant="h3"> Poll not found </Typography>
        </Grid>
      </Grid>
    );
  }

  if (!pollCtx.poll._id) {
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

Poll.propTypes = {
  history: PropTypes.object.isRequired,
};
