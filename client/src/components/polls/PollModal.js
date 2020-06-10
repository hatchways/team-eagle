import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  TextField,
  Container,
  CircularProgress,
  Paper,
  Typography,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
import PollImages from './PollImages';
import ConfirmationWindow from 'components/ConfirmationWindow';
import { getFriendLists, deleteUserPoll } from 'util/api_util';
import { PollsContext } from 'components/contexts/PollsContext';

export default function PollModal(props) {
  const { updatePolls } = React.useContext(PollsContext);
  const classes = useStyles({
    extendFriendsList: !!props._id,
  })();
  const [state, setState] = React.useState({
    title: props.title || '',
    images: props.images || [],
    friendList: props.friendList || 'public',

    loading: false,
    friendLists: [],
    confirmationWindowOpen: false,

    titleError: '',
    imagesError: '',
    submitError: false,
  });

  React.useEffect(() => {
    getFriendLists()
      .then((friendLists) => setState({ ...state, friendLists }))
      .catch((err) => {
        throw err;
      });
  }, []);

  function toggleConfirmationWindow() {
    setState({
      ...state,
      confirmationWindowOpen: !state.confirmationWindowOpen,
    });
  }

  const handleChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let titleError = '';
    let imagesError = '';

    const requiredField = 'All fields are required';
    let errorCount = 0;

    if (!state.title) {
      titleError = requiredField;
      errorCount++;
    }
    if (!state.images.length) {
      imagesError = requiredField;
      errorCount++;
    }

    if (errorCount) {
      setState({
        ...state,
        titleError,
        imagesError,
      });
      return;
    }

    setState({ ...state, loading: true });

    const friendList = state.friendList === 'public' ? '' : state.friendList;

    const formData = new FormData();
    formData.set('title', state.title);
    formData.append('image1', state.images[0]);
    formData.append('image2', state.images[1]);
    formData.append('friendList', friendList);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await axios
      .post('/polls', formData, config)
      .then((response) => {
        props.toggle();
        updatePolls();
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          confirmationWindowOpen: false,
          submitError: true,
        });
      });
  };

  function handleDelete(e) {
    e.preventDefault();
    setState({ ...state, confirmationWindowOpen: false, loading: true });

    deleteUserPoll(props._id)
      .then((data) => {
        props.toggle();
        updatePolls();
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          confirmationWindowOpen: false,
          submitError: true,
        });
      });
  }

  return (
    <>
      <Modal
        open={true}
        onClose={props.toggle}
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
                Creating Your Poll...
              </Typography>
              <Container className={classes.progressContainer}>
                <CircularProgress />
              </Container>
            </>
          ) : state.submitError ? (
            <>
              <Typography id="poll-modal-title" variant="h2">
                There was an error in creating your poll. Please try again
                later.
              </Typography>
            </>
          ) : (
            <>
              <Typography id="poll-modal-title" variant="h2">
                {props._id ? 'Edit Poll' : 'Create Poll'}
              </Typography>
              <form className="poll-form" noValidate autoComplete="off">
                <TextField
                  onChange={(e) => handleChange('title', e.target.value)}
                  value={state.title}
                  name="title"
                  fullWidth
                  id="standard-basic"
                  label="Title"
                  helperText={state.titleError}
                  error={!!state.titleError}
                />
                <PollImages
                  handleChange={handleChange}
                  _id={props._id}
                  images={state.images}
                  imagesError={state.imagesError}
                />
                <Grid container justify="space-between" alignItems="flex-end">
                  <Grid item className={classes.friendListGridItem}>
                    <InputLabel id="friend-list-label">Friend List</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={state.friendList}
                      onChange={(e) =>
                        handleChange('friendList', e.target.value)
                      }
                    >
                      <MenuItem value="public">
                        <PublicIcon /> Public
                      </MenuItem>
                      {state.friendLists.map((list, i) => {
                        return (
                          <MenuItem key={i} value={list._id}>
                            {list.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item>
                    {props._id ? (
                      <Button
                        mt={3}
                        variant="contained"
                        color="primary"
                        onClick={toggleConfirmationWindow}
                      >
                        Delete Poll
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
                      {props._id ? 'Edit Poll' : 'Create poll'}
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
          message="Are you sure you want to exclude this list?"
          close={toggleConfirmationWindow}
          confirm={handleDelete}
        />
      ) : null}
    </>
  );
}

const useStyles = ({ extendFriendsList }) =>
  makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      maxHeight: '75vh',
      width: 400,
      maxWidth: '75vw',
      padding: theme.spacing(6),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
      },
    },
    friendListGridItem: {
      width: extendFriendsList ? '100%' : 'auto',
      marginBottom: extendFriendsList ? theme.spacing(3) : 0,
      '& .MuiSelect-select': {
        width: 140,
      },
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
