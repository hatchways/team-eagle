import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, Divider, TextField } from '@material-ui/core';

import FriendCollectionItem from './FriendCollectionItem';
import { debounce } from '../../util/util';
import { FriendsContext } from '../contexts/FriendsContext';
import { UserContext } from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 600,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  listContainer: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FriendCollection(props) {
  const classes = useStyles();
  const friends = React.useContext(FriendsContext);
  const user = React.useContext(UserContext);

  let initialState;
  switch (props.type) {
    case 'suggestions':
      initialState = friends.suggestions;
      break;
    case 'followers':
      initialState = friends.followers;
      break;
    case 'followings':
      initialState = friends.followings;
      break;
    default:
      initialState = [];
      break;
  }

  const [state, setState] = useState(initialState);
  const followingIdsSet = new Set(friends.followings.map((el) => el._id));

  // first mount
  React.useEffect(() => {
    switch (props.type) {
      case 'suggestions':
        friends.getSuggestions('', (err) => {
          throw new Error(err.message);
        });
        break;
      case 'followers':
        friends.getFollowers(user._id, (err) => {
          throw new Error(err.message);
        });
        break;
      case 'followings':
        friends.getFollowings(user._id, (err) => {
          throw new Error(err.message);
        });
        break;
      default:
        initialState = [];
        break;
    }
  }, []);

  // continous update
  React.useEffect(() => {
    setState(initialState);
  }, [initialState.length]);

  const handleSuggestionSearch = debounce((input) => {
    friends.getSuggestions(input, (err) => {
      throw new Error(err.message);
    });
  }, 250);

  /**
   * Typing in 'suggestions' input field cause
   * API calls since search is designed to be dynamic
   */
  const handleChange = (event) => {
    if (props.type === 'suggestions') {
      handleSuggestionSearch(event.target.value);
    } else {
      const searchRegex = new RegExp(event.target.value, 'i');
      setState(initialState.filter((user) => user.name.match(searchRegex)));
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        multiline={true}
        rows={1}
        id="outlined-basic"
        fullWidth
        label="Search"
        variant="outlined"
        onChange={handleChange}
      />
      <List dense className={classes.listContainer}>
        {state.map((user, idx) => {
          const labelId = `checkbox-list-secondary-label-${user._id}`;
          const isFollowable = !followingIdsSet.has(user._id);

          return (
            <>
              <FriendCollectionItem
                key={`${labelId}-parent`}
                user={user}
                labelId={labelId}
                isFollowable={isFollowable}
              />
              {idx === state.length - 1 ? null : (
                <Divider key={`${labelId}-divider`} light />
              )}
            </>
          );
        })}
      </List>
    </div>
  );
}

FriendCollection.propTypes = {
  type: PropTypes.string.isRequired,
};
