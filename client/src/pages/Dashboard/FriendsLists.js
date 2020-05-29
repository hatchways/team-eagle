import React from 'react';
import { UserContext } from '../../components/contexts/UserContext';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Container } from '@material-ui/core';

import HorizontalFeed from 'components/HorizontalFeed';
import FriendsListsItem from './FriendsListsItem';

// Temporary
const lists = [
  {
    _id: '124124124',
    title: 'Fashion',
    friends: [
      {
        _id: '12412423123124',
        name: 'David Smith',
        picture:
          'https://images.unsplash.com/photo-1511623785848-021573a3a04f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
      {
        _id: '1222',
        name: 'James Walker',
      },
      {
        _id: '414142',
        name: 'Anna Devine',
        picture:
          'https://images.unsplash.com/photo-1559637621-d766677659e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
      {
        _id: '142124',
        name: 'Lucy Berger',
        picture:
          'https://images.unsplash.com/photo-1558482240-4e3c42448028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
    ],
  },
  {
    _id: '5152512',
    title: 'School',
    friends: [
      {
        _id: '414142',
        name: 'Anna Devine',
        picture:
          'https://images.unsplash.com/photo-1559637621-d766677659e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
      {
        _id: '142124',
        name: 'Lucy Berger',
        picture:
          'https://images.unsplash.com/photo-1558482240-4e3c42448028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
    ],
  },
  {
    _id: '1225125',
    title: 'Work',
    friends: [
      {
        _id: '1222',
        name: 'James Walker',
      },
      {
        _id: '142124',
        name: 'Lucy Berger',
        picture:
          'https://images.unsplash.com/photo-1558482240-4e3c42448028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
    ],
  },
];

export default function FriendsLists(props) {
  const [state, setState] = React.useState({
    lists: null,
  });
  React.useEffect(() => {
    // Placeholder to simulate fetch
    setTimeout(() => {
      setState({
        ...state,
        lists,
      });
    }, 1500);
  }, []);
  return (
    <HorizontalFeed
      title={'Friends Lists'}
      subtitle=""
      button={
        <Button
          variant="outlined"
          component={RouterLink}
          to="/create-friends-list"
        >
          Create List
        </Button>
      }
    >
      {state.lists
        ? state.lists.map((list, i) => {
            return <FriendsListsItem key={i} {...list} />;
          })
        : null}
    </HorizontalFeed>
  );
}
