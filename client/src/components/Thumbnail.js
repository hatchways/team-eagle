import React, { useEffect } from 'react';
import { Avatar, Badge } from '@material-ui/core';
import Person from '@material-ui/icons/Person';

export default function Thumbnail(props) {
  return (
    <Badge color="primary" variant="dot" invisible={props.invisible}>
      <Avatar src={props.user.picture || ''} {...props}>
        {props.user.picture ? null : <Person />}
      </Avatar>
    </Badge>
  );
}
