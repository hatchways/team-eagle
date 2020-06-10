import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { getUserPolls } from 'util/api_util';

import HorizontalFeed from 'components/HorizontalFeed';
import AddPollButton from 'components/polls/AddPollButton';
import Poll from './Poll';

export default function Polls(props) {
  const [state, setState] = React.useState({
    polls: null, // null indicates the request hasn't been made yet
  });

  React.useEffect(() => {
    getUserPolls()
      .then((polls) => {
        console.log(polls);
        setState({
          ...state,
          polls,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <HorizontalFeed
      title={'Polls'}
      subtitle="(32)"
      button={<AddPollButton />}
      noContent={state.polls && !state.polls.length}
    >
      {state.polls
        ? state.polls.map((poll, i) => {
            return <Poll key={i} {...poll} />;
          })
        : null}
    </HorizontalFeed>
  );
}
