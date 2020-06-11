import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
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
  const voteTotal = props.poll.images.reduce(
    (accum, img) => accum + img.numVotes,
    0
  );

  return (
    <div className={classes.root}>
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
        {props.poll.title}
      </Typography>
      <span className={classes.uColorGrey}> {voteTotal} answers </span>
    </div>
  );
}

PollPageHeader.propTypes = {
  history: PropTypes.object.isRequired,
  poll: PropTypes.object.isRequired,
};

export default withRouter(PollPageHeader);
