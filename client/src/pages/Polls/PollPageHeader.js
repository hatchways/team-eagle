import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

function PollPageHeader(props) {
  const classes = useStyles();
  const voteTotal = props.mockPoll.images.reduce(
    (accum, img) => accum + img.votes,
    0
  );

  return (
    <>
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
        {props.mockPoll.title}
      </Typography>
      <span className={classes.uColorGrey}> {voteTotal} answers </span>
    </>
  );
}

PollPageHeader.propTypes = {
  history: PropTypes.object.isRequired,
  mockPoll: PropTypes.object.isRequired,
};

export default withRouter(PollPageHeader);
