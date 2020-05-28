import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
}));

export default function FriendListItem(props) {
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

  const value = 2;
  return (
    <ListItem key={value} button>
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

FriendListItem.propTypes = {
  user: PropTypes.object.isRequired,
  labelId: PropTypes.string.isRequired,
  isFollowable: PropTypes.bool.isRequired,
};
