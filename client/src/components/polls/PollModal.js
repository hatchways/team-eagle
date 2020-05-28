import React, { useCallback, useEffect, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { UserContext } from '../UserContext';

export default function PollModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [image1, setImage1] = React.useState('');
  const [image2, setImage2] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState('1234');
  const user = React.useContext(UserContext);

  useEffect(() => {
    setUserId(user._id);
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length != 2) {
      alert('You can only upload only two files per poll. No less, no more.');
    } else {
      setImage1(acceptedFiles[0]);
      setImage2(acceptedFiles[1]);
    }
    console.log(image1, image2);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, type) => {
    switch (type) {
      case 'title':
        setTitle(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    console.log(loading);
    formData.set('title', title);
    formData.set('userId', userId);
    formData.append('image1', image1);
    formData.append('image2', image2);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await axios
      .post('/polls', formData, config)
      .then((response) => {
        alert('Poll has been created');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const body = (
    <div>
      <div
        style={{ top: '30%', marginLeft: '35vw', marginRight: 'auto' }}
        className={classes.paper}
      >
        <h2 id="poll-modal-title">
          {props.view === 'add' ? 'Add New Poll' : 'Edit poll'}
        </h2>
        <form className="poll-form" noValidate autoComplete="off">
          <TextField
            onChange={(e) => handleChange(e, 'title')}
            name="title"
            fullWidth
            id="standard-basic"
            label="Title of the Poll"
            style={{ marginBottom: 20 }}
          />
          <div {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <Button
            mt={3}
            variant="contained"
            color="secondary"
            onClick={() => handleSubmit()}
          >
            Create/Update Poll
          </Button>
        </form>
      </div>
    </div>
  );

  const loadingBody = (
    <div>
      <div
        style={{ top: '30%', marginLeft: '35vw', marginRight: 'auto' }}
        className={classes.paper}
      >
        <h2 id="poll-modal-title" style={{ textAlign: 'center' }}>
          Creating Your Poll.
          <br /> Please wait for few seconds.
          <br /> Good things come to those who wait.
        </h2>
      </div>
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        style={useStyles.button}
      >
        Add Poll
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="poll-modal-title"
        aria-describedby="poll-modal-description"
      >
        {loading ? loadingBody : body}
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    width: 350,
    height: 300,
    backgroundColor: '#e8e8e8',
    padding: 20,
    color: 'black',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
