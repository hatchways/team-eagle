import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function PollImages(props) {
  return (
    <Grid container justify="center" spacing={2}>
      {props.images.map((image, i) => {
        return (
          <Grid item key={i}>
            <img src={image.url} />
            <Grid container justify="center">
              <Grid item>
                <FavoriteIcon color="secondary" />
              </Grid>
              <Grid item>{image.votes}</Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

PollImages.propTypes = {
  images: PropTypes.array.isRequired,
};
