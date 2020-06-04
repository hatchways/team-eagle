import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import VoteListItem from './VoteListItem';

const useStyles = makeStyles((theme) => ({}));

export default function VoteList(props) {
  const classes = useStyles();

  return (
    <>
      {props.mockVotes.map((voteItem) => (
        <VoteListItem key={voteItem._id} vote={voteItem} />
      ))}
    </>
  );
}

VoteList.propTypes = {
  mockVotes: PropTypes.array.isRequired,
};
