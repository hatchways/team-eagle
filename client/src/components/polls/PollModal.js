import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';

export default function PollModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [image1, setImage1] = React.useState('');
  const [image2, setImage2] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState('1234');

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
      case 'image1':
        console.log(e.target.files[0]);
        setImage1(e.target.files[0]);
        break;
      case 'image2':
        console.log(e.target.files[0]);
        setImage2(e.target.files[0]);
        break;
      default:
        console.log('nada');
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
      .post('http://localhost:3001/polls', formData, config)
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
          <label>Select first image</label>
          <TextField
            onChange={(e) => handleChange(e, 'image1')}
            fullWidth
            id="standard-basic"
            label="Upload Image 1"
            type="file"
            style={{ marginBottom: 20 }}
          />
          <label>Select second image</label>
          <TextField
            onChange={(e) => handleChange(e, 'image2')}
            fullWidth
            id="standard-basic"
            label="Upload Image 1"
            type="file"
          />
          <Button onClick={() => handleSubmit()}>Submit Form</Button>
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
      <Button color="primary" onClick={handleOpen}>
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
