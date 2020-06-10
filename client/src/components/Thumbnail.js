import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Badge, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = (props) =>
  makeStyles((theme) => ({
    badge: {
      paddingRight: '7px',
    },
    icon: {
      color: theme.palette.common.white,
    },
  }));

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
      invisible={props.invisible !== false}
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
