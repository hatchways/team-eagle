import React, { useEffect, useState } from 'react';
import { UserContext } from '../../components/contexts/UserContext';
import { FriendsContext } from '../../components/contexts/FriendsContext';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, List } from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import Friend from 'components/friendList/Friend';

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    paddingLeft: 0,
  },
  friend: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:visited': {
      color: theme.palette.text.primary,
    },
  },
}));

export default function Friends() {
  const friends = React.useContext(FriendsContext);
  const user = React.useContext(UserContext);
  const classes = useStyles();

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3001');
    setFollowers(friends.followers);
    socket.on('friendsUpdate', async () => {
      friends.getFollowers(user._id, (err) => {
        throw new Error(err.message);
      });
      setFollowers(friends.followers);
    });
  });

  return (
    <Box className={classes.root}>
      <Typography variant="h2">Friends</Typography>
      <List>
        {followers.map((friend, i) => {
          return <Friend key={i} friend={friend} />;
        })}
      </List>
    </Box>
  );
}
