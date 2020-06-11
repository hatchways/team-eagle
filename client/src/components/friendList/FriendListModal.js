import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Modal,
  TextField,
  Container,
  CircularProgress,
  Paper,
  Typography,
  List,
  Grid,
  FormHelperText,
} from '@material-ui/core';
import { postFriendList, putFriendList, deleteFriendList } from 'util/api_util';
import { FriendsContext } from '../contexts/FriendsContext';
import Friend from 'components/friendList/Friend';
import ConfirmationWindow from 'components/ConfirmationWindow';

export default function FriendListModal(props) {
  const { followers } = React.useContext(FriendsContext);
  const [state, setState] = React.useState({
    title: props.list.title || '',
    friends: props.list.friends || [],

    loading: false,
    confirmationWindowOpen: false,

    query: '',

    titleError: '',
    friendsError: '',
  });
  const classes = useStyles(state)();

  const filteredFollowers = React.useMemo(() => {
    if (!state.query) return followers;

    let query = state.query.toLowerCase();

    return followers.filter((following) => {
      return following.name.toLowerCase().search(query) !== -1;
    });
  }, [state.query, state.friends, followers]);

  function toggleConfirmationWindow() {
    setState({
      ...state,
      confirmationWindowOpen: !state.confirmationWindowOpen,
    });
  }

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

    const friends = state.friends.map((friend) => friend._id);

    if (props.list._id) {
      putFriendList({
        _id: props.list._id,
        title: state.title,
        friends,
      })
        .then((data) => props.toggleModal(null, data))
        .catch((err) => console.log(err));
    } else {
      postFriendList({
        title: state.title,
        friends,
      })
        .then((data) => props.toggleModal(null, data))
        .catch((err) => console.log(err));
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setState({ ...state, confirmationWindowOpen: false, loading: true });

    deleteFriendList(props.list._id)
      .then((data) => {
        props.toggleModal(null, data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Modal
        open={true}
        onClose={() => props.toggleModal()}
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
                    <Box className={classes.nothingFoundWrapper}>
                      <Typography variant="subtitle1" align="center">
                        There's nothing here. Check your query or add friends!
                      </Typography>
                    </Box>
                  )}
                </List>
                {state.friendsError ? (
                  <FormHelperText error={true}>
                    {state.friendsError}
                  </FormHelperText>
                ) : null}

                <Grid
                  container
                  justify="space-between"
                  className={classes.buttonContainer}
                >
                  <Grid item>
                    {props.list._id ? (
                      <Button
                        mt={3}
                        variant="contained"
                        color="primary"
                        onClick={toggleConfirmationWindow}
                      >
                        Delete list
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <Button
                      mt={3}
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit}
                    >
                      {props.list._id ? 'Confirm Changes' : 'Create List'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </Paper>
      </Modal>
      {state.confirmationWindowOpen ? (
        <ConfirmationWindow
          title="Warning"
          titleComponent="h3"
          message="Are you sure you want to delete this list?"
          close={toggleConfirmationWindow}
          confirm={handleDelete}
        />
      ) : null}
    </>
  );
}

const useStyles = (state) =>
  makeStyles((theme) => ({
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
      marginTop: theme.spacing(5),
      boxShadow: theme.shadows[1],
      border: state.friendsError ? `1px solid red` : 'none',
    },
    nothingFoundWrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      marginTop: theme.spacing(5),
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
