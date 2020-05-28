import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FriendListItem from './FriendListItem';
import TextField from '@material-ui/core/TextField';
import { debounce } from '../../util/util';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '15vh',
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

export default function FriendList() {
  const classes = useStyles();
  const [state, setState] = useState([0, 0, 1, 3, 4, 5, 8, 9, 10, 12]);
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
        {state.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <>
              <FriendListItem
                key={`${labelId}-parent`}
                labelId={labelId}
                value={value}
              />
              <Divider light />
            </>
          );
        })}
      </List>
    </div>
  );
}
