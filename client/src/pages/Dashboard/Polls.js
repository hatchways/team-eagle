import React from 'react';
import { PollsContext } from 'components/contexts/PollsContext';

import HorizontalFeed from 'components/HorizontalFeed';
import AddPollButton from 'components/polls/AddPollButton';
import Poll from './Poll';
import { PollContextProvider } from '../../components/contexts/PollContext';

export default function Polls(props) {
  const { polls } = React.useContext(PollsContext);

  return (
    <HorizontalFeed
      title={'Polls You Created'}
      subtitle={`(${polls ? polls.length : 0})`}
      button={<AddPollButton />}
      noContent={polls && !polls.length}
    >
      {polls
        ? polls.map((poll, i) => {
            return (
              <PollContextProvider key={`pollProvider-${i}`}>
                <Poll key={i} {...poll} />
              </PollContextProvider>
            );
          })
        : null}
    </HorizontalFeed>
  );
}
