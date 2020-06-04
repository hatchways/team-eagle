import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const PollCard = (props) => {
  const { poll } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <h3>{poll.title}</h3>
        <Grid container spacing={3}>
          {poll.images.map((image) => {
            return (
              <Grid item spacing={1}>
                <a href="#" onClick={(e) => props.handleVote(e, 'xyz123')}>
                  <img src={image.url} style={{ maxWidth: 250 }} />
                </a>
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
    ],
  });

  useEffect(async () => {
    document.title = 'Polls | Polls App';
  });

  const handleVote = (e, imageId) => {
    e.preventDefault();
    alert('You just voted');
  };

  return (
    <Container alignContent="center">
      <h1 className={classes.h1}>
        Polls <span className={classes.subh1}>({state.polls.length})</span>
      </h1>
      <Grid container spacing={2}>
        {state.polls.map((poll) => {
          return (
            <Grid item xs={6}>
              <PollCard handleVote={handleVote} poll={poll} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
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
