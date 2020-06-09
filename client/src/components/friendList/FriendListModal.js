import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  TextField,
  Container,
  CircularProgress,
  Paper,
  Typography,
  List,
  Grid,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { postFriendList, putFriendList } from 'util/api_util';
import { FriendsContext } from '../contexts/FriendsContext';
import Friend from 'components/friendList/Friend';

const followers = [
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
];

export default function FriendListModal(props) {
  const classes = useStyles();
  // const { followers } = React.useContext(FriendsContext);
  const [state, setState] = React.useState({
    title: props.list.title || '',
    friends: props.list.friends || [],
    loading: false,
    query: '',

    titleError: '',
    friendsError: '',
  });

  const filteredFollowers = React.useMemo(() => {
    if (!state.query) return followers;

    let query = state.query.toLowerCase();

    return followers.filter((following) => {
      return following.name.toLowerCase().search(query) !== -1;
    });
  }, [state.query, state.friends, followers]);

  function handleChange(key, value) {
    setState({
      ...state,
      [key]: value,
    });
  }

  function removeFriend(_id) {
    let friends = state.friends.filter((friend) => {
      return friend._id !== _id;
    });
    setState({ ...state, friends });
  }

  function addFriend(_id) {
    let friends = [
      ...state.friends,
      followers.find((follower) => follower._id === _id),
    ];
    setState({ ...state, friends });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let titleError = '';
    let friendsError = '';
    let errorCount = 0;

    const requiredField = 'All fields are required';
    const requiredFriends = 'The list cannot be empty';

    if (!state.title) {
      titleError = requiredField;
      errorCount++;
    }
    if (!state.friends.length) {
      friendsError = requiredFriends;
      errorCount++;
    }

    if (errorCount) {
      setState({
        ...state,
        titleError,
        friendsError,
      });
      return;
    }
    setState({ ...state, loading: true });

    const friendIds = state.friends.map((friend) => friend._id);

    if (props.list._id) {
      putFriendList({
        _id: props.list._id,
        title: state.title,
        friendIds,
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
      postFriendList({
        title: state.title,
        friendIds,
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  }

  function handleDelete() {}

  return (
    <Modal
      open={true}
      onClose={props.toggleModal}
      aria-labelledby="poll-modal-title"
      aria-describedby="poll-modal-description"
      className={classes.modal}
    >
      <Paper className={classes.paper}>
        {state.loading ? (
          <>
            <Typography
              id="poll-modal-title"
              variant="h2"
              component="p"
              align="center"
            >
              {props.list._id ? 'Saving your changes...' : 'Creating List...'}
            </Typography>
            <Container className={classes.progressContainer}>
              <CircularProgress />
            </Container>
          </>
        ) : (
          <>
            <Typography variant="h2">
              {props.list._id ? 'Edit List' : 'Create List'}
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                onChange={(e) => handleChange('title', e.target.value)}
                value={state.title}
                fullWidth
                label="Title"
                helperText={state.titleError}
                error={!!state.titleError}
              />
              <TextField
                onChange={(e) => handleChange('query', e.target.value)}
                value={state.query}
                label="Find Friends"
              />
              <List className={classes.friendList}>
                {filteredFollowers.length ? (
                  filteredFollowers.map((follower, i) => {
                    let isInList = state.friends.find(
                      (friend) => friend._id === follower._id
                    );
                    return (
                      <Friend
                        key={i}
                        friend={follower}
                        addFriend={isInList ? null : addFriend}
                        removeFriend={isInList ? removeFriend : null}
                      />
                    );
                  })
                ) : (
                  <Typography variant="subtitle1" align="center">
                    There's nothing here. Check your query or add friends!
                  </Typography>
                )}
              </List>
              <Grid container justify="space-between">
                <Grid item>
                  <Button
                    mt={3}
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                  >
                    {props.list._id ? 'Edit List' : 'Create List'}
                  </Button>
                </Grid>
                <Grid item>
                  {props.list._id ? (
                    <Button
                      mt={3}
                      variant="contained"
                      color="primary"
                      onClick={handleDelete}
                    >
                      Delete list
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Paper>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    outline: 'none',
    maxHeight: '75vh',
    width: 400,
    maxWidth: '75vw',
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  friendList: {
    height: 200,
    overflow: 'auto',
    margin: `${theme.spacing(5)}px 0`,
    boxShadow: theme.shadows[1],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    '& svg': {
      color: theme.palette.secondary.main,
    },
  },
}));
