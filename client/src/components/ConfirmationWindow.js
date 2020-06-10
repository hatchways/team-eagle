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

export default function ConfirmationWindow(props) {
  const classes = useStyles();

  function renderTitle() {
    if (!props.title) return '';
    return (
      <Typography component={props.titleComponent || 'h3'} variant="h3">
        {props.title}
      </Typography>
    );
  }

  return (
    <Modal open={true} onClose={props.close} className={classes.modal}>
      <Paper className={classes.paper}>
        {renderTitle()}
        <Typography variant="body1">{props.message || ''}</Typography>
        <Grid container justify="space-between">
          <Grid item>
            <Button mt={3} variant="contained" onClick={props.close}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              mt={3}
              variant="contained"
              color="primary"
              onClick={props.confirm}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
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
    width: 350,
    maxWidth: '75vw',
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
    '& p': {
      margin: `${theme.spacing(3)}px 0`,
    },
  },
}));
