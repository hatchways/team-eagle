import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, Divider } from '@material-ui/core';

import VoteListItem from './VoteListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
    marginTop: theme.spacing(5),
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function VoteList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.mockVotes.map((voteItem) => {
        return (
          <>
            <Divider key={`${voteItem._id}-divider`} light />
            <VoteListItem
              key={voteItem._id}
              poll={props.poll}
              vote={voteItem}
            />
          </>
        );
      })}
    </List>
  );
}

VoteList.propTypes = {
  mockVotes: PropTypes.array.isRequired,
  poll: PropTypes.object.isRequired,
};
