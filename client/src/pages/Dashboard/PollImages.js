import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { vote, unvote } from '../../util/api_util';
import { UserContext } from 'components/contexts/UserContext';
import { PollContext } from 'components/contexts/PollContext';
import { PollsContext } from 'components/contexts/PollsContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  voteNumsContainer: {
    display: 'flex',
  },
}));

function PollImages(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const pollCtx = useContext(PollContext);
  const pollsCtx = useContext(PollsContext);
  const imageSize = props.imageSize ? props.imageSize : '65px';
  const currURL = props.history.location.pathname;
  const favIconSize = props.favIconSize ? props.favIconSize : 'default';
  const justifyContainer = props.justifyContainer
    ? props.justifyContainer
    : 'center';
  const votes = props.votes ? props.votes : [];
  // has max length of 2 & only includes 0 and 1
  const currUserVotesImageIdxs = votes.map((vote) => {
    if (vote.userId._id === user._id) {
      return vote.pollImageIdx;
    }
  });

  const handleVote = (imageIdx) => {
    vote(props.pollId, imageIdx, (err, data) => {
      if (err) {
        alert(err);
      } else {
        if (currURL.match(new RegExp('^/polls/'))) {
          // update '/polls/:pollId' page context
          pollCtx.setPollState(data);
        } else if (currURL.match(new RegExp('^/polls'))) {
          // update '/polls' page content
          pollsCtx.updateVotablePolls();
        } else {
          // update '/' page content
          pollsCtx.updateDashboardPolls();
        }
      }
    });
  };

  const handleUnvote = (imageIdx) => {
    unvote(props.pollId, imageIdx, (err, data) => {
      if (err) {
        alert(err);
      } else {
        if (currURL.match(new RegExp('^/polls/'))) {
          pollCtx.setPollState(data);
        } else {
          pollsCtx.updateDashboardPolls();
        }
      }
    });
  };

  const imageStyles = {
    width: imageSize,
    height: imageSize,
    marginBottom: '10px',
    objectFit: 'cover',
  };

  return (
    <Grid justify={justifyContainer} container spacing={2}>
      {props.images.map((image, idx) => {
        return (
          <Grid item key={idx}>
            {props.pollId ? (
              <Link to={`/polls/${props.pollId}`}>
                <img style={imageStyles} src={image.url} />
              </Link>
            ) : (
              <img style={imageStyles} src={image.url} />
            )}
            <Grid container justify="center">
              <Grid item>
                <IconButton>
                  {currUserVotesImageIdxs.includes(idx) ? (
                    <FavoriteIcon
                      onClick={() => handleUnvote(idx)}
                      ontSize={favIconSize}
                      color="secondary"
                    />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={() => handleVote(idx)}
                      fontSize={favIconSize}
                      htmlColor="lightgrey"
                    />
                  )}
                </IconButton>
              </Grid>
              <Grid
                className={classes.voteNumsContainer}
                item
                alignItems="center"
              >
                {image.numVotes}
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

PollImages.propTypes = {
  history: PropTypes.object.isRequired,
  pollId: PropTypes.string.isRequired,
  votes: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  imageSize: PropTypes.string,
  favIconSize: PropTypes.string,
  justifyContainer: PropTypes.string,
};

export default withRouter(PollImages);
