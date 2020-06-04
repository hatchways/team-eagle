import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container, Typography } from '@material-ui/core';

import { useDashboardStyles } from '../Dashboard/Dashboard';
import Friends from '../Dashboard/Friends';
import PollImages from '../Dashboard/PollImages';
import PollPageHeader from './PollPageHeader';

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
        votes: 12,
      },
      {
        url:
          'https://lp2.hm.com/hmgoepprod?set=quality[79],source[/94/36/9436b50129c000035f451e0524d74e0f08006338.jpg],origin[dam],category[kids_babyboy_topstshirts],type[DESCRIPTIVESTILLLIFE],res[s],hmver[1]&call=url[file:/product/main]',
        votes: 20,
      },
    ],
  };

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
        </Grid>
      </Grid>
    </Container>
  );
}

Poll.propTypes = {
  history: PropTypes.object.isRequired,
};
