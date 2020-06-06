import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Chip,
  Avatar,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import testImg from '../../images/img1.png';
import { FriendsContext } from '../contexts/FriendsContext';

const useStyles = makeStyles((theme) => ({
  chipGreen: {
    width: 100,
    backgroundColor: green[300],
    '&:hover': {
      backgroundColor: green[400],
    },
    '&:focus': {
      backgroundColor: green[300],
    },
  },
  chipRed: {
    width: 100,
    backgroundColor: red[300],
    '&:hover': {
      backgroundColor: red[400],
    },
    '&:focus': {
      backgroundColor: red[300],
    },
  },
  [theme.breakpoints.down('sm')]: {
    chipGreen: {
      width: 70,
    },
    chipRed: {
      width: 70,
    },
  },
}));

export default function FriendCollectionItem(props) {
  const classes = useStyles();
  const friends = React.useContext(FriendsContext);
  const user = props.user;
  const labelId = props.labelId;
  const [isFollowable, setIsFollowable] = useState(props.isFollowable);

  const handleClick = () => {
    if (isFollowable) {
      friends
        .follow(user._id, (err) => {
          throw new Error(err.message);
        })
        .then(() => {
          setIsFollowable(false);
        });
    } else {
      friends
        .unfollow(user._id, (err) => {
          throw new Error(err.message);
        })
        .then(() => {
          setIsFollowable(true);
        });
    }
  };

  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt={`${user.name}'s avatar`} src={testImg} />
      </ListItemAvatar>
      <ListItemText id={labelId} primary={user.name} />
      <ListItemSecondaryAction>
        <Chip
          className={isFollowable ? classes.chipGreen : classes.chipRed}
          color={isFollowable ? 'primary' : 'secondary'}
          label={isFollowable ? 'follow' : 'unfollow'}
          onClick={handleClick}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

FriendCollectionItem.propTypes = {
  user: PropTypes.object.isRequired,
  labelId: PropTypes.string.isRequired,
  isFollowable: PropTypes.bool.isRequired,
};
