import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { PollsContext } from 'components/contexts/PollsContext';

import HorizontalFeed from 'components/HorizontalFeed';
import AddPollButton from 'components/polls/AddPollButton';
import Poll from './Poll';

export default function Polls(props) {
  const { polls } = React.useContext(PollsContext);

  return (
    <HorizontalFeed
      title={'Polls'}
      subtitle="(32)"
      button={<AddPollButton />}
      noContent={polls && !polls.length}
    >
      {polls
        ? polls.map((poll, i) => {
            return <Poll key={i} {...poll} />;
          })
        : null}
    </HorizontalFeed>
  );
}
