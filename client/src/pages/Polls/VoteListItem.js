import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export default function VoteListItem(props) {
  const classes = useStyles();

  return <div>hello world</div>;
}

VoteListItem.propTypes = {
  vote: PropTypes.object.isRequired,
};
