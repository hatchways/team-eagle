import React, { useEffect } from 'react';
import { PollsContext } from 'components/contexts/PollsContext';

import HorizontalFeed from 'components/HorizontalFeed';
import AddPollButton from 'components/polls/AddPollButton';
import Poll from './Poll';
import { PollContextProvider } from '../../components/contexts/PollContext';

export default function Polls(props) {
  const pollsCtx = React.useContext(PollsContext);
  const polls = pollsCtx.polls;

  useEffect(() => {
    pollsCtx.updateDashboardPolls();
  }, []);

  return (
    <HorizontalFeed
      title={'Polls you Created'}
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
