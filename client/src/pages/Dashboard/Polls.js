import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { getFriendsPolls } from 'util/api_util';

import HorizontalFeed from 'components/HorizontalFeed';
import AddPollButton from 'components/polls/AddPollButton';
import Poll from './Poll';

// Temporary
const polls = [
  {
    _id: '180938128',
    title: 'Which one is better?',
    images: [
      {
        url:
          'https://images-na.ssl-images-amazon.com/images/I/61mSyjeYXWL._AC_UX679_.jpg',
        numVotes: 12,
      },
      {
        url:
          'https://lp2.hm.com/hmgoepprod?set=quality[79],source[/94/36/9436b50129c000035f451e0524d74e0f08006338.jpg],origin[dam],category[kids_babyboy_topstshirts],type[DESCRIPTIVESTILLLIFE],res[s],hmver[1]&call=url[file:/product/main]',
        numVotes: 20,
      },
    ],
  },
  {
    _id: '12314124',
    title: 'Which color do you prefer?',
    images: [
      {
        url:
          'https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_Admirals_of_the_Blue_Squadron_Royal_Navy.png',
        numVotes: 2,
      },
      {
        url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/512px-Red.svg.png',
        numVotes: 5,
      },
    ],
  },
  {
    _id: '12125125',
    title: 'What should I get?',
    images: [
      {
        url:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        numVotes: 13,
      },
      {
        url:
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
        numVotes: 7,
      },
    ],
  },
];

export default function Polls(props) {
  const [state, setState] = React.useState({
    polls: null, // null indicates the request hasn't been made yet
  });

  React.useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        polls,
      });
    }, 2000);
    // getFriendsPolls((err, res) => {
    //   if (err) console.log(err);
    //   if (res) {
    //     console.log(res);
    //     setState({
    //       ...state,
    //       polls: res,
    //     });
    //   }
    // });
  }, []);

  return (
    <HorizontalFeed title={'Polls'} subtitle="(32)" button={<AddPollButton />}>
      {state.polls
        ? state.polls.map((poll, i) => {
            return <Poll key={i} {...poll} />;
          })
        : null}
    </HorizontalFeed>
  );
}
