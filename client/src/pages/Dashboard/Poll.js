import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, Paper } from '@material-ui/core';
import PollImages from './PollImages';
import { PollContextProvider } from 'components/contexts/PollContext';
import PollModal from 'components/polls/PollModal';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    borderRadius: 0,
    width: '100%',
    height: '100%',
    textTransform: 'none',
    boxShadow: theme.shadows[3],
    '& img': {
      width: 65,
      height: 65,
      objectFit: 'cover',
    },
  },
  subtitle: {
    marginBottom: theme.spacing(3),
  },
}));

export default function Polls(props) {
  // const user = React.useContext(UserContext);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Button
        className={classes.root}
        square={true}
        component={Paper}
        onClick={toggleModal}
      >
        <Box>
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
          <PollContextProvider>
            <PollImages pollId={props._id} images={props.images} />
          </PollContextProvider>
        </Box>
      </Button>
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
