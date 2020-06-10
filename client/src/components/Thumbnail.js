import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Badge } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      marginRight: props.marginRight ? theme.spacing(1) : 0,
    },
    badge: {
      paddingRight: '7px',
    },
  }));

// Custom props:
// props.picture (string) => image src, if falsy, renders PersonIcon
// props.marginRight (bool) => sets default marginRight
// props.visible (bool) => sets the active or not bage

export default function Thumbnail(props) {
  const classes = useStyles(props)();
  const picture = props.picture;
  if (props.user) {
    if (props.user.picture) {
      picture = props.user.picture;
    }
  }

  return (
    <Badge
      className={classes.badge}
      color="secondary"
      variant="dot"
      invisible={!props.visible}
    >
      <Avatar src={picture ? picture : ''} {...props}>
        {!picture && <PersonIcon />}
      </Avatar>
    </Badge>
  );
}
