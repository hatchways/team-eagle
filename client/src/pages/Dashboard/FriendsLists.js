import React from 'react';
import { UserContext } from '../../components/contexts/UserContext';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Container } from '@material-ui/core';

import HorizontalFeed from 'components/HorizontalFeed';
import FriendsList from 'components/friendList/FriendsList';
import FriendListModal from 'components/friendList/FriendListModal';
import { getFriendLists } from 'util/api_util';

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
    listToEdit: false,
  });
  React.useEffect(() => {
    getFriendLists()
      .then((lists) => {
        console.log(lists);
        setState({
          ...state,
          lists,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  function toggleModal(list, updatedLists) {
    let value = state.listToEdit ? false : list;
    console.log(updatedLists);
    setState({
      ...state,
      lists: updatedLists || state.lists,
      listToEdit: value,
    });
  }

  return (
    <>
      <HorizontalFeed
        title={'Followers Lists'}
        subtitle=""
        button={
          <Button variant="outlined" onClick={() => toggleModal({})}>
            Create List
          </Button>
        }
      >
        {state.lists
          ? state.lists.map((list, i) => {
              return (
                <FriendsList key={i} toggleModal={toggleModal} list={list} />
              );
            })
          : null}
      </HorizontalFeed>
      {state.listToEdit ? (
        <FriendListModal toggleModal={toggleModal} list={state.listToEdit} />
      ) : null}
    </>
  );
}
