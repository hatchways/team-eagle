import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FriendListItem from './FriendListItem';
import TextField from '@material-ui/core/TextField';
import { debounce } from '../../util/util';
import { FriendsContext } from '../contexts/FriendsContext';

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

  let stateBasedOnType;
  switch (props.type) {
    case 'suggestions':
      stateBasedOnType = friends.suggestions;
      break;
    case 'followers':
      stateBasedOnType = friends.followers;
      break;
    case 'followings':
      stateBasedOnType = friends.followings;
      break;
    default:
      stateBasedOnType = [];
      break;
  }

  const [state, setState] = useState(stateBasedOnType);
  const [textField, setTextField] = useState('');

  /**
   * A user will have a follow button next to it if it's not in the current
   * user's list of friends.
   * And the opposite is true for unfollow
   */
  const handleChange = (event) => {
    debounce(() => {
      /* API util function here */
    }, 250);
    setTextField(event.target.value);
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
          return (
            <>
              <FriendListItem
                key={`${labelId}-parent`}
                labelId={labelId}
                name={user.name}
              />
              <Divider light />
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
