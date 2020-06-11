import React from 'react';
import { PollsContext } from 'components/contexts/PollsContext';

import HorizontalFeed from 'components/HorizontalFeed';
import AddPollButton from 'components/polls/AddPollButton';
import Poll from './Poll';

export default function Polls(props) {
  const { polls } = React.useContext(PollsContext);

  return (
    <HorizontalFeed
      title={'Polls'}
      subtitle={`(${polls ? polls.length : 0})`}
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
