import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import testImg from '../../images/img1.png';

const useStyles = makeStyles((theme) => ({
  chipGreen: {
    width: 100,
    backgroundColor: green[300],
    '&:hover': {
      backgroundColor: green[400],
    },
  },
  chipRed: {
    width: 100,
    backgroundColor: red[300],
    '&:hover': {
      backgroundColor: red[400],
    },
  },
}));

export default function FriendListItem(props) {
  const classes = useStyles();
  // Props are going to include an instance of a user

  const handleClick = () => {
    /**
     * Pass prop from parent saying whether this user is followed or not.
     * Make API call based on above info.
     */
    return 'you clicked';
  };

  const name = props.name;
  const labelId = props.labelId;
  const value = 2;
  return (
    <ListItem key={value} button>
      <ListItemAvatar>
        <Avatar alt={`${name}'s avatar`} src={testImg} />
      </ListItemAvatar>
      <ListItemText id={labelId} primary={name} />
      <ListItemSecondaryAction>
        <Chip
          className={value % 2 === 0 ? classes.chipGreen : classes.chipRed}
          color={value % 2 === 0 ? 'primary' : 'secondary'}
          label={value % 2 === 0 ? 'follow' : 'unfollow'}
          onClick={handleClick}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
