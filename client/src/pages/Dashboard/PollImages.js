import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function PollImages(props) {
  const imageSize = props.imageSize ? props.imageSize : '65px';
  const favIconSize = props.favIconSize ? props.favIconSize : 'default';
  const justifyContainer = props.justifyContainer
    ? props.justifyContainer
    : 'center';

  return (
    <Grid justify={justifyContainer} container spacing={2}>
      {props.images.map((image, i) => {
        return (
          <Grid item key={i}>
            <img
              style={{ width: imageSize, height: imageSize }}
              src={image.url}
            />
            <Grid container justify="center">
              <Grid item>
                <FavoriteIcon fontSize={favIconSize} color="secondary" />
              </Grid>
              <Grid item>{image.numVotes}</Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

PollImages.propTypes = {
  images: PropTypes.array.isRequired,
  imageSize: PropTypes.string,
  favIconSize: PropTypes.string,
  justifyContainer: PropTypes.string,
};
