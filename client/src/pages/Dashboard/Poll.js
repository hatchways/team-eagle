import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper, IconButton, Grid } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PollImages from './PollImages';
import { PollContextProvider } from 'components/contexts/PollContext';
import PollModal from 'components/polls/PollModal';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    borderRadius: 0,
    width: '100%',
    height: '100%',
    textTransform: 'none',
    cursor: 'pointer',
    boxShadow: theme.shadows[3],
    '& img': {
      width: 65,
      height: 65,
      objectFit: 'cover',
    },
  },
  pollLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  subtitle: {
    marginBottom: theme.spacing(3),
  },
}));

export default function Poll(props) {
  // const user = React.useContext(UserContext);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Paper className={classes.root} square={true}>
        <Grid container direction="row-reverse">
          <Grid item>
            <IconButton onClick={toggleModal}>
              <SettingsIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box>
          <Link className={classes.pollLink} to={`/polls/${props._id}`}>
            <Typography variant="h3">{props.title}</Typography>
            <Typography
              variant="subtitle1"
              component="div"
              className={classes.subtitle}
            >
              {props.images.reduce((acc, image) => {
                return acc + image.numVotes;
              }, 0) + ' answers'}
            </Typography>
          </Link>
          <PollImages
            pollId={props._id}
            votes={props.votesArr}
            images={props.images}
          />
        </Box>
      </Paper>
      {modalOpen ? (
        <PollModal
          toggle={toggleModal}
          _id={props._id}
          title={props.title}
          friendList={props.friendList}
          images={props.images}
        />
      ) : null}
    </>
  );
}
