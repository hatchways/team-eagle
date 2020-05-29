import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Grid,
  IconButton,
  Paper,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import Thumbnail from 'components/Thumbnail';

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
    background: 'transparent',
    textAlign: 'left',
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  list: {
    overflowY: 'auto',
    height: `calc(100% - ${headerHeight + theme.spacing(2)}px)`,
  },
}));

export default function FriendsListsItem(props) {
  // const user = React.useContext(UserContext);
  const classes = useStyles();

  function subtitle() {
    let friendsLength = props.friends.length;
    let output = `${friendsLength} friend`;
    if (friendsLength > 1 || !friendsLength) output += 's';
    return output;
  }

  function handleClick(e) {
    alert('open');
  }

  return (
    <Paper className={classes.root} square={true} onClick={handleClick}>
      <Grid container alignItems="center" className={classes.header}>
        <Grid item className={classes.heading} component="button">
          <Typography variant="h3">{props.title}</Typography>
          <Typography variant="subtitle1">{subtitle()}</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <List className={classes.list}>
        {props.friends.map((friend, i) => {
          return (
            <ListItem key={i} component={RouterLink} to={'/' + friend._id}>
              <ListItemIcon component={RouterLink} to={'/'}>
                <CloseIcon />
              </ListItemIcon>
              <Thumbnail picture={friend.picture} marginRight={true} />
              {friend.name}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
