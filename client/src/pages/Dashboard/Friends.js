import React from 'react';
import { UserContext } from '../../components/contexts/UserContext';
import { FriendsContext } from '../../components/contexts/FriendsContext';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, List, ListItem, Grid } from '@material-ui/core';
import Friend from 'components/friendList/Friend';
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
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h2">Friends</Typography>
      <List>
        {friends.followers.map((friend, i) => {
          return <Friend key={i} friend={friend} />;
        })}
      </List>
    </Box>
  );
}
