import React, { useEffect, useState } from 'react';
import { UserContext } from '../../components/contexts/UserContext';
import { FriendsContext } from '../../components/contexts/FriendsContext';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, List, ListItem, Grid } from '@material-ui/core';
import socketIOClient from 'socket.io-client';

import Thumbnail from 'components/Thumbnail';

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
          return (
            <ListItem key={i} className={classes.listItem}>
              <Grid
                component={RouterLink}
                to={`/user/${friend._id}`}
                container
                alignItems="center"
                className={classes.friend}
              >
                <Thumbnail
                  picture={friend.picture}
                  marginRight={true}
                  component="span"
                  visible={friend.active}
                />
                {friend.name}
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
