import React, { useState, useEffect, useContext } from 'react';
import Poll from '../Dashboard/Poll';
import { PollsContext } from '../../components/contexts/PollsContext';
import { PollContextProvider } from '../../components/contexts/PollContext';
import { getVotablePolls } from '../../util/api_util';
import {
  Container,
  Grid,
  makeStyles,
  Chip,
  CircularProgress,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

export default function PollHome(props) {
  document.title = 'Polls | Polls App';
  const classes = useStyles();
  const [state, setState] = useState({
    loading: true,
    perPage: 4,
    currentPage: 1,
  });
  const pollsCtx = useContext(PollsContext);
  const polls = pollsCtx.polls;
  debugger;

  useEffect(() => {
    getVotablePolls().then((data) => {
      setState({ ...state, loading: false });
      pollsCtx.setVotablePolls(data.polls);
    });
  }, []);

  const indexOfLastPoll = state.currentPage * state.perPage;
  const indexOfFirstPoll = indexOfLastPoll - state.perPage;
  debugger;
  const currentPolls = polls.slice(indexOfFirstPoll, indexOfLastPoll);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(polls.length / state.perPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (e, value) => {
    e.preventDefault();
    setState({ ...state, currentPage: value });
  };

  const sortPolls = (e, sortBy) => {
    e.preventDefault();
    let pollsTemp = [...polls];
    // Switch to choose the sorter
    switch (sortBy) {
      case 'votesAsc':
        //  Sorting by least votes
        pollsTemp.sort(function (a, b) {
          const aSum = a.images.reduce((accum, img) => accum + img.numVotes, 0);
          const bSum = b.images.reduce((accum, img) => accum + img.numVotes, 0);
          debugger;
          return aSum > bSum ? 1 : -1;
        });
        pollsCtx.setVotablePolls(pollsTemp);
        break;
      case 'votesDsc':
        // Sorting by most votes
        pollsTemp.sort(function (a, b) {
          const aSum = a.images.reduce((accum, img) => accum + img.numVotes, 0);
          const bSum = b.images.reduce((accum, img) => accum + img.numVotes, 0);
          debugger;
          return aSum > bSum ? -1 : 1;
        });
        pollsCtx.setVotablePolls(pollsTemp);
        break;
      case 'dateAsc':
        // Sorting by newest
        pollsTemp.sort(function (a, b) {
          return a.date - b.date;
        });
        pollsCtx.setVotablePolls(pollsTemp);
        break;
      case 'dateDsc':
        // Sorting by oldest
        pollsTemp.sort(function (a, b) {
          return b.date - a.date;
        });
        pollsCtx.setVotablePolls(pollsTemp);
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
      <Container alignContent="center">
        <h1 className={classes.h1}>
          Polls{' '}
          <span className={classes.subh1}>
            That require your attention ({polls.length})
          </span>
        </h1>
        <div className={classes.sorters}>
          Sorty By:
          <a href="#">
            <Chip
              label="Latest First"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'dateDsc')}
            />
          </a>
          <a href="#">
            <Chip
              label="Oldest First"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'dateAsc')}
            />
          </a>
          <a href="#">
            <Chip
              label="Most Voted"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'votesDsc')}
            />
          </a>
          <a href="#">
            <Chip
              label="Least Voted"
              className={classes.chip}
              onClick={(e) => sortPolls(e, 'votesAsc')}
            />
          </a>
        </div>
        <Grid container spacing={2}>
          {currentPolls.map((poll, key) => {
            return (
              <Grid item xs={6} key={key}>
                <PollContextProvider key={`pollProvider-${key}`}>
                  <Poll key={`poll-${key}`} {...poll} />
                </PollContextProvider>
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
  pagination: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  cardImg: {
    height: 0,
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
  },
  h1: {
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
