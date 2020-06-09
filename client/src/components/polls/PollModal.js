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
import ImageIcon from '@material-ui/icons/Image';
import { useDropzone } from 'react-dropzone';
import { UserContext } from '../contexts/UserContext';

export default function PollModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    title: '',
    images: [],
    loading: false,
    submitError: false,
    titleError: '',
    imagesError: '',
  });

  const user = React.useContext(UserContext);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length != 2) {
      alert('You can only upload only two files per poll. No less, no more.');
    } else {
      setState({
        ...state,
        images: acceptedFiles,
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value || e.target.files,
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
        setState({ ...state, submitError: true });
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
        ) : state.submitError ? (
          <>
            <Typography id="poll-modal-title" variant="h2">
              There was an error in creating your poll. Please try again later.
            </Typography>
          </>
        ) : (
          <>
            <Typography id="poll-modal-title" variant="h2">
              {props.edit ? 'Edit Poll' : 'Create Poll'}
            </Typography>
            <form className="poll-form" noValidate autoComplete="off">
              <TextField
                onChange={handleChange}
                name="title"
                fullWidth
                id="standard-basic"
                label="Title"
                helperText={state.titleError}
                error={!!state.titleError}
              />
              <div
                {...getRootProps()}
                className={classes.dropzone}
                style={{
                  border: state.imagesError ? '1px solid red' : 'none',
                }}
              >
                <input {...getInputProps()} />
                {state.images.length ? (
                  <List className={classes.list}>
                    {state.images.map((image, i) => {
                      return (
                        <ListItem key={i} dense={true}>
                          <ListItemIcon>
                            <ImageIcon />
                          </ListItemIcon>
                          {image.name}
                        </ListItem>
                      );
                    })}
                  </List>
                ) : isDragActive ? (
                  <p>Drop the files here</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select</p>
                )}
              </div>
              <Button
                mt={3}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                {props.edit ? 'Edit Poll' : 'Create poll'}
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
  list: {
    height: theme.spacing(6),
  },
  dropzone: {
    height: 300,
    maxHeight: '25vh',
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
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
