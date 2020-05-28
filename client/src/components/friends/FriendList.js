import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FriendListItem from './FriendListItem';
import TextField from '@material-ui/core/TextField';
import { debounce } from '../../util/util';
import { FriendsContext } from '../contexts/FriendsContext';
import { UserContext } from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    width: '100%',
    maxWidth: 500,
  },
}));

export default function FriendList(props) {
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
   * Changes in search of suggestions tab cause an
   * API call since it's dynamic
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
        className={classes.textField}
        id="outlined-basic"
        fullWidth
        label="Search"
        variant="outlined"
        onChange={handleChange}
      />
      <List dense className={classes.container}>
        {state.map((user) => {
          const labelId = `checkbox-list-secondary-label-${user._id}`;
          const isFollowable = !followingIdsSet.has(user._id);

          return (
            <>
              <FriendListItem
                key={`${labelId}-parent`}
                user={user}
                labelId={labelId}
                isFollowable={isFollowable}
              />
              <Divider key={`${labelId}-divider`} light />
            </>
          );
        })}
      </List>
    </div>
  );
}

FriendList.propTypes = {
  type: PropTypes.string.isRequired,
};
