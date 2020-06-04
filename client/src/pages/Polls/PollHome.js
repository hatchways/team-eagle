import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Chip,
  CardMedia,
  CardHeader,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const PollCard = (props) => {
  const { poll } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={poll.title} />
      <CardContent>
        {/* <h3>{poll.title}</h3>         */}
        <Grid container spacing={1} alignContent="stretch" alignItems="center">
          {poll.images.map((image) => {
            return (
              <Grid xs={6} item alignContent="center" alignItems="center">
                <CardMedia
                  component="img"
                  image={image.url}
                  classes={classes.cardImg}
                />
                {/* <a href="#" onClick={(e) => props.handleVote(e, 'xyz123')}>
                  <img src={image.url} style={{ maxWidth: 250 }} />
                </a> */}
                <br />
                <ThumbUpIcon className={[classes.center, classes.thumb]} /> 500
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
    perPage: 4,
    currentPage: 1,
    polls: [
      {
        title: 'What is your favorite type car?',
        userId: 'abcd2505342',
        date: Date.now,
        images: [
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
        ],
      },
      {
        title: 'What is your favorite type car eh?',
        userId: 'abcd2505342',
        date: Date.now,
        images: [
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
        ],
      },
      {
        title: 'What is your favorite type car?',
        userId: 'abcd2505342',
        date: Date.now,
        images: [
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
        ],
      },
      {
        title: 'What is your favorite type car?',
        userId: 'abcd2505342',
        date: Date.now,
        images: [
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
          {
            url:
              'https://images.summitmedia-digital.com/topgear/images/2019/05/17/honda-brv-main-1558085308.jpg',
          },
        ],
      },
    ],
  });

  const indexOfLastPoll = state.currentPage * state.perPage;
  const indexOfFirstPoll = indexOfLastPoll - state.perPage;
  const currentPolls = state.polls.slice(indexOfFirstPoll, indexOfLastPoll);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(state.polls.length / state.perPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(async () => {
    document.title = 'Polls | Polls App';
  });

  const handleVote = (e, imageId) => {
    e.preventDefault();
    alert('You just voted');
  };

  const changePage = (e, value) => {
    e.preventDefault();
    setState({ currentPage: value, ...state });
  };

  return (
    <Container alignContent="center">
      <h1 className={classes.h1}>
        Polls{' '}
        <span className={classes.subh1}>
          That require your attention ({state.polls.length})
        </span>
      </h1>
      <div className={classes.sorters}>
        <a href="#">
          <Chip label="Sort by newest to oldest" className={classes.chip} />
        </a>
        <a href="#">
          <Chip label="Sort by oldest to lowest" className={classes.chip} />
        </a>
        <a href="#">
          <Chip label="Sort by most voted" className={classes.chip} />
        </a>
        <a href="#">
          <Chip label="Sort by least voted" className={classes.chip} />
        </a>
      </div>
      <Grid container spacing={2}>
        {currentPolls.map((poll) => {
          return (
            <Grid item xs={6}>
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
  pagination: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  cardImg: {
    height: 0,
  },
  sorters: {
    marginTop: -20,
    marginBottom: 20,
  },
  chip: {
    marginRight: 20,
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
