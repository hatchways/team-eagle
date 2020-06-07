import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid, Button, Paper } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
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

  function getVotes(imageIndex) {
    return props.images[imageIndex].voteIds.length;
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
            {getVotes(0) + getVotes(1) + ' answers'}
          </Typography>
          <Grid container justify="center" spacing={2}>
            {props.images.map((image, i) => {
              return (
                <Grid item key={i}>
                  <img src={image.url} alt="Poll image" />
                  <Grid container justify="center">
                    <Grid item>
                      <FavoriteIcon color="secondary" />
                    </Grid>
                    <Grid item>{getVotes(i)}</Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
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
