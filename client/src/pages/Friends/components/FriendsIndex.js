import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import testImg from '../../../images/img1.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15vh',
  },
  container: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
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

export default function FriendsIndex() {
  const classes = useStyles();
  const [state, setState] = useState([0, 1, 2, 3, 4]);
  /**
   * A user will have a follow button next to it if it's not in the current
   * user's list of friends.
   * And the opposite is true for unfollow
   */

  const handleClick = () => {
    return 'you clicked';
  };

  return (
    <div className={classes.root}>
      <List dense className={classes.container}>
        {state.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <>
              <ListItem key={value} button>
                <ListItemAvatar>
                  <Avatar alt={`Avatar n°${value + 1}`} src={testImg} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemSecondaryAction>
                  <Chip
                    className={
                      value % 2 === 0 ? classes.chipGreen : classes.chipRed
                    }
                    color={value % 2 === 0 ? 'primary' : 'secondary'}
                    label={value % 2 === 0 ? 'follow' : 'unfollow'}
                    onClick={handleClick}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider light />
            </>
          );
        })}
      </List>
    </div>
  );
}
