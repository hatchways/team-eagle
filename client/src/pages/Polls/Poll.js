import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container, Typography } from '@material-ui/core';

import { useDashboardStyles } from '../Dashboard/Dashboard';
import Friends from '../Dashboard/Friends';
import PollImages from '../Dashboard/PollImages';
import PollPageHeader from './PollPageHeader';
import VoteListItem from './VoteListItem';

const useStyles = makeStyles((theme) => ({
  uColorGrey: {
    color: theme.palette.grey[500],
  },
  uPaddingLeft: {
    paddingLeft: theme.spacing(6),
  },
  backLinkText: {
    textDecoration: 'underline',
  },
  backLinkContainer: {
    cursor: 'pointer',
  },
}));

export default function Poll() {
  const dashboardClasses = useDashboardStyles();
  const classes = useStyles();

  const mockPoll = {
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
  };

  const mockVotes = [
    {
      _id: '12412423123124',
      author: {
        _id: '131234234',
        name: 'David Smith',
        picture:
          'https://images.unsplash.com/photo-1511623785848-021573a3a04f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
      imageIdx: 0,
      createdAt: '2020-03-10T23:44:56.289Z',
      updatedAt: '2020-03-10T23:47:56.289Z',
    },
    {
      _id: '12412423123124',
      author: {
        _id: '131234234',
        name: 'Anna Devine',
        picture:
          'https://images.unsplash.com/photo-1559637621-d766677659e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
      imageIdx: 1,
      createdAt: '2020-03-10T23:44:56.289Z',
      updatedAt: '2020-03-10T23:49:56.289Z',
    },
    {
      _id: '12412423123124',
      author: {
        _id: '131234234',
        name: 'Lucy Berger',
        picture:
          'https://images.unsplash.com/photo-1558482240-4e3c42448028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
      imageIdx: 0,
      createdAt: '2020-03-10T23:44:56.289Z',
      updatedAt: '2020-03-10T23:50:56.289Z',
    },
  ];

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
          className={`${dashboardClasses.rightSide} ${classes.uPaddingLeft}`}
        >
          <PollPageHeader mockPoll={mockPoll} />

          <PollImages
            justifyContainer="flex-start"
            images={mockPoll.images}
            imageSize="15vh"
            favIconSize="5px"
          />
          {mockVotes.map((voteItem) => (
            <VoteListItem key={voteItem._id} vote={voteItem} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

Poll.propTypes = {
  history: PropTypes.object.isRequired,
};
