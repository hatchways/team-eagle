import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import HorizontalFeed from 'components/HorizontalFeed';
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
        votes: 12,
      },
      {
        url:
          'https://lp2.hm.com/hmgoepprod?set=quality[79],source[/94/36/9436b50129c000035f451e0524d74e0f08006338.jpg],origin[dam],category[kids_babyboy_topstshirts],type[DESCRIPTIVESTILLLIFE],res[s],hmver[1]&call=url[file:/product/main]',
        votes: 20,
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
        votes: 2,
      },
      {
        url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/512px-Red.svg.png',
        votes: 5,
      },
    ],
  },
  {
    _id: '12125125',
    title: 'Which one is better',
    images: [
      {
        url:
          'https://images-na.ssl-images-amazon.com/images/I/61mSyjeYXWL._AC_UX679_.jpg',
        votes: 12,
      },
      {
        url:
          'https://lp2.hm.com/hmgoepprod?set=quality[79],source[/94/36/9436b50129c000035f451e0524d74e0f08006338.jpg],origin[dam],category[kids_babyboy_topstshirts],type[DESCRIPTIVESTILLLIFE],res[s],hmver[1]&call=url[file:/product/main]',
        votes: 20,
      },
    ],
  },
];

export default function Polls(props) {
  // const user = React.useContext(UserContext);
  return (
    <HorizontalFeed
      title={'Polls'}
      subtitle="(32)"
      button={
        <Button variant="outlined" component={RouterLink} to="/create-poll">
          Create Poll
        </Button>
      }
    >
      {polls.map((poll, i) => {
        return (
          <Grid item key={i}>
            <Poll {...poll} />
          </Grid>
        );
      })}
    </HorizontalFeed>
  );
}
