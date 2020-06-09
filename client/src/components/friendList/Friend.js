import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Thumbnail from 'components/Thumbnail';

const useStyles = makeStyles((theme) => ({
  root: {},
  listItemIcon: {},
  addButton: {
    minWidth: '25px',
    marginRight: theme.spacing(3),
    color: theme.palette.success.light,
  },

  removeButton: {
    minWidth: '25px',
    marginRight: theme.spacing(3),
    color: theme.palette.error.light,
  },
}));

export default function Friend(props) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      {props.removeFriend ? (
        <IconButton
          onClick={() => props.removeFriend(props.friend._id)}
          className={classes.removeButton}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      {props.addFriend ? (
        <IconButton
          onClick={() => props.addFriend(props.friend._id)}
          className={classes.addButton}
        >
          <AddIcon />
        </IconButton>
      ) : null}
      <Thumbnail picture={props.friend.picture} />
      {props.friend.name}
    </ListItem>
  );
}
