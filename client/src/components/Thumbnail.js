import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Badge, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = (props) =>
  makeStyles((theme) => ({
    badge: {
      paddingRight: '7px',
      border: '1px solid white',
    },
    icon: {
      color: theme.palette.common.white,
    },
  }));

// Custom props:
// props.picture (string) => image src, if falsy, renders PersonIcon
// props.marginRight (bool) => sets default marginRight
// props.visible (bool) => sets the active or not badge

export default function Thumbnail(props) {
  const classes = useStyles(props)();

  function renderPictureOrIcon() {
    return !props.picture && <PersonIcon className={classes.icon} />;
  }

  return (
    <Badge
      className={classes.badge}
      color="secondary"
      variant="dot"
      overlap="circle"
      invisible={!props.visible}
    >
      <Avatar src={props.picture ? props.picture : ''} {...props}>
        {props.url ? (
          <IconButton component={RouterLink} to={props.url}>
            {renderPictureOrIcon()}
          </IconButton>
        ) : (
          renderPictureOrIcon()
        )}
      </Avatar>
    </Badge>
  );
}
