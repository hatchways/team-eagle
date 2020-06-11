import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  List,
  Grid,
  IconButton,
  Paper,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Friend from 'components/friendList/Friend';

const headerHeight = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    boxShadow: theme.shadows[3],
    '& a': {
      color: theme.palette.text.primary,
    },
  },
  header: {
    height: headerHeight,
  },
  heading: {
    border: 'none',
    width: '60%',
    background: 'transparent',
    textAlign: 'left',
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  list: {
    overflowY: 'auto',
    height: `calc(100% - ${headerHeight + theme.spacing(2)}px)`,
  },
}));

export default function FriendsList(props) {
  // const user = React.useContext(UserContext);
  const classes = useStyles();

  function subtitle() {
    let friendsLength = props.list.friends.length;
    let output = `${friendsLength} friend`;
    if (friendsLength > 1 || !friendsLength) output += 's';
    return output;
  }

  return (
    <Paper className={classes.root} square={true}>
      <Grid container alignItems="center" className={classes.header}>
        <Grid item className={classes.heading}>
          <Typography variant="h3" className={classes.title}>
            {props.list.title}
          </Typography>
          <Typography variant="subtitle1">{subtitle()}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => props.toggleModal(props.list)}>
            <SettingsIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <List className={classes.list}>
        {props.list.friends.map((friend, i) => {
          return <Friend key={i} friend={friend} />;
        })}
      </List>
    </Paper>
  );
}
