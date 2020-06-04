import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Container, Typography } from '@material-ui/core';

import { useDashboardStyles } from '../Dashboard/Dashboard';
import Friends from '../Dashboard/Friends';
import PollImages from '../Dashboard/PollImages';

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

export default function Poll(props) {
  const dashboardClasses = useDashboardStyles();
  const classes = useStyles();
  const mockImages = [
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
          <span
            onClick={props.history.goBack}
            className={`${classes.backLinkContainer} ${classes.uColorGrey}`}
          >
            <span> &lt; </span>
            <span className={classes.backLinkText}> Back </span>
          </span>
          <br />
          <br />
          <Typography variant="h2" gutterBottom>
            Which one do you like?
          </Typography>
          <span className={classes.uColorGrey}> 24 answers </span>

          <PollImages
            justifyContainer="flex-start"
            images={mockImages}
            imageSize="12vh"
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
