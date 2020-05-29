import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      marginRight: props.marginRight ? theme.spacing(1) : 0,
    },
  }));

// Custom props:
// props.picture (string) => image src, if falsy, renders PersonIcon
// props.marginRight (bool) => sets default marginRight

export default function Thumbnail(props) {
  const classes = useStyles(props)();
  return (
    <Avatar src={props.picture || ''} className={classes.root}>
      {props.picture ? null : <PersonIcon />}
    </Avatar>
  );
}
