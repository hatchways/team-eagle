import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FriendListItem from './FriendListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15vh',
  },
  container: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FriendsIndex() {
  const classes = useStyles();
  const [state, setState] = useState([0, 1, 2, 3, 4]);
  /**
   * A user will have a follow button next to it if it's not in the current
   * user's list of friends.
   * And the opposite is true for unfollow
   */

  return (
    <div className={classes.root}>
      <List dense className={classes.container}>
        {state.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <>
              <FriendListItem labelId={labelId} value={value} />
              <Divider light />
            </>
          );
        })}
      </List>
    </div>
  );
}
