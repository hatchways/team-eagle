import React from 'react';
import { Avatar } from '@material-ui/core';
import Person from '@material-ui/icons/Person';

export default function Thumbnail(props) {
  return (
    <Avatar src={props.user.picture || ''} {...props}>
      {props.user.picture ? null : <Person />}
    </Avatar>
  );
}
