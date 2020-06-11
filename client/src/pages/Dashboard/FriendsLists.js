import React from 'react';
import { UserContext } from '../../components/contexts/UserContext';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Container } from '@material-ui/core';

import HorizontalFeed from 'components/HorizontalFeed';
import FriendsList from 'components/friendList/FriendsList';
import FriendListModal from 'components/friendList/FriendListModal';
import { getFriendLists } from 'util/api_util';

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
        subtitle={`(${state.lists ? state.lists.length : 0})`}
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
