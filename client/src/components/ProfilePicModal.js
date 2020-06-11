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
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';

export default function ProfilePicModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    picture: '',
    loading: false,
  });

  function changeImage(e) {
    e.preventDefault();
    setState({ ...state, picture: e.target.files[0] });
  }

  function uploadPicture(e) {
    const formData = new FormData();
    formData.append('picture', state.picture);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/users/changePic', formData, config)
      .then((response) => {
        alert('Profile picture changed');
        props.toggle();
        document.location.reload();
      })
      .catch((error) => {
        alert('There was some error');
      });
  }

  return (
    <Modal open={true} onClose={props.toggle} className={classes.modal}>
      <Paper className={classes.paper}>
        <h3>Choose a new profile picture</h3>
        <form>
          <input
            type="file"
            name="profilepic"
            onChange={(e) => changeImage(e)}
            style={{ marginRight: 100 }}
          />
        </form>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 40 }}
          onClick={uploadPicture}
        >
          Change Profile Picture
        </Button>
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
}));
