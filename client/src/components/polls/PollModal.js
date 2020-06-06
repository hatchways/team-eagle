import React, { useCallback, useEffect, useContext } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import { UserContext } from '../contexts/UserContext';
import PollImages from './PollImages';

export default function PollModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    title: props.title || '',
    images: props.images || [],
    friendList: props.friendList || '',
    loading: false,

    titleError: '',
    imagesError: '',
  });

  const user = React.useContext(UserContext);

  const handleChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
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

    const formData = new FormData();
    formData.set('title', state.title);
    formData.set('userId', user._id);
    formData.append('image1', state.images[0]);
    formData.append('image2', state.images[1]);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await axios
      .post('/polls', formData, config)
      .then((response) => {
        alert('Poll has been created');
        props.toggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
        ) : (
          <>
            <Typography id="poll-modal-title" variant="h2">
              {props._id ? 'Edit Poll' : 'Create Poll'}
            </Typography>
            <form className="poll-form" noValidate autoComplete="off">
              <TextField
                onChange={(e) => handleChange('title', e.target.value)}
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
              <Button
                mt={3}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                {props._id ? 'Edit Poll' : 'Create poll'}
              </Button>
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
    maxHeight: '75vh',
    width: 400,
    maxWidth: '75vw',
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
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
