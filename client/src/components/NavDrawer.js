import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from './contexts/UserContext';

const list = [
  {
    label: 'Friends',
    Icon: EmojiPeopleIcon,
    url: '/friends',
  },
  {
    label: "Friends' Polls",
    Icon: RecentActorsIcon,
    url: '/friends-polls',
  },
  {
    label: 'Opinions',
    Icon: ContactSupportIcon,
    url: '/opinions',
  },
  {
    label: 'Create Poll',
    Icon: AddIcon,
    url: '/create-poll',
  },
  {
    label: 'My Profile',
    Icon: PersonIcon,
    url: '/dashboard',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& span': {
      fontSize: '1.3rem',
    },
    '& a': {
      '&:visited': {
        color: theme.palette.text.primary,
      },
    },
  },
}));

export default function NavDrawer(props) {
  const classes = useStyles();
  const user = useContext(UserContext);

  return (
    <Drawer
      className={classes.root}
      anchor="right"
      open={props.isOpen}
      onClose={props.toggleDrawer}
    >
      <List>
        {list.map(function (item, i) {
          return (
            <React.Fragment key={i}>
              <ListItem component={RouterLink} to={item.url}>
                <ListItemIcon>
                  <item.Icon />
                </ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
}
