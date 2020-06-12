import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Chip,
  CardMedia,
  CardHeader,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import axios from 'axios';

const PollCard = (props) => {
  const { poll } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={poll.title} />
      <CardContent>
        <Grid container spacing={1} align="space-evenly">
          {poll.images.map((image, key) => {
            return (
              <Grid xs={6} item key={key}>
                <a onClick={(e) => props.handleVote(e, 'xyz123')}>
                  <CardMedia
                    component="img"
                    image={image.url}
                    className={classes.cardImg}
                  />
                </a>
                <ThumbUpIcon className={(classes.center, classes.thumb)} /> 500
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function PollHome(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    loading: true,
    perPage: 4,
    currentPage: 1,
    polls: [],
  });

  useEffect(() => {
    document.title = 'Polls | Polls App';
    axios.get('/polls/votable').then((response) => {
      setState({ ...state, polls: response.data.polls, loading: false });
    });
  }, []);

  const indexOfLastPoll = state.currentPage * state.perPage;
  const indexOfFirstPoll = indexOfLastPoll - state.perPage;
  const currentPolls = state.polls.slice(indexOfFirstPoll, indexOfLastPoll);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(state.polls.length / state.perPage); i++) {
    pageNumbers.push(i);
  }

  const handleVote = (e, imageId) => {
    e.preventDefault();
    alert('You just voted');
  };

  const changePage = (e, value) => {
    e.preventDefault();
    setState({ ...state, currentPage: value });
  };

  const sortPolls = (e, sortBy) => {
    e.preventDefault();
    let pollsTemp = state.polls;
    // Switch to choose the sorter
    switch (sortBy) {
      case 'votesAsc':
        //  Sorting by least votes
        pollsTemp.sort(function (a, b) {
          return a.votes - b.votes;
        });
        setState({ ...state, polls: pollsTemp });
        break;
      case 'votesDsc':
        // Sorting by most votes
        pollsTemp.sort(function (a, b) {
          return b.votes - a.votes;
        });
        setState({ ...state, polls: pollsTemp });
        break;
      case 'dateAsc':
        // Sorting by newest
        pollsTemp.sort(function (a, b) {
          return a.date - b.date;
        });
        setState({ ...state, polls: pollsTemp });
        break;
      case 'dateDsc':
        // Sorting by oldest
        pollsTemp.sort(function (a, b) {
          return b.date - a.date;
        });
        setState({ ...state, polls: pollsTemp });
        break;
      default:
        console.log('wrong options in sorter');
        break;
    }
  };

  if (state.loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress color="inherit" className={classes.loading} />
        </Grid>
      </Grid>
    );
  } else
    return (
      <Container>
        <Typography variant="h1" className={classes.h1}>
          Polls
        </Typography>
        <Typography variant="h3" className={classes.subh1}>
          That require your attention ({state.polls.length})
        </Typography>
        {/* <h1 className={classes.h1}>
          Polls{' '}
          <span className={classes.subh1}>
            
          </span>
        </h1> */}
        <div className={classes.sorters}>
          Sorty By:
          <a>
            <Chip
              label="Latest First"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'dateDsc')}
            />
          </a>
          <a>
            <Chip
              label="Oldest First"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'dateAsc')}
            />
          </a>
          <a>
            <Chip
              label="Most Voted"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'votesDsc')}
            />
          </a>
          <a>
            <Chip
              label="Least Voted"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'votesAsc')}
            />
          </a>
        </div>
        <Grid container spacing={2} alignItems="center">
          {currentPolls.map((poll, key) => {
            return (
              <Grid item xs={6} key={key}>
                <PollCard handleVote={handleVote} poll={poll} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          count={pageNumbers.length}
          variant="outlined"
          className={classes.pagination}
          page={state.currentPage}
          onChange={changePage}
        />
      </Container>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    minHeight: '100vh',
    display: 'flex',
  },
  pagination: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  cardImg: {
    height: '100%',
  },
  sorters: {
    marginTop: -20,
    marginBottom: 20,
  },
  chip: {
    marginLeft: 5,
    marginRight: 5,
  },
  subh1: {
    fontSize: 20,
    color: 'black',
    marginBottom: 50,
  },
  h1: {
    marginTop: 20,
    fontSize: 50,
    color: '#ec7063 ',
  },
  center: {
    marginLeft: '50%',
  },
  thumb: {
    marginTop: 2,
    color: '#ec7063 ',
  },
}));
