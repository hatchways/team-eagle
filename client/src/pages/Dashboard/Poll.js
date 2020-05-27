import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid, Button, Paper } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 280,
    height: 280,
    textAlign: 'center',
    borderRadius: 0,
    boxShadow: theme.shadows[3],
    textTransform: 'none',
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

  function handleClick(e) {
    alert('open');
  }

  return (
    <Button
      className={classes.root}
      square={true}
      component={Paper}
      onClick={handleClick}
    >
      <Box>
        <Typography variant="h3">{props.title}</Typography>
        <Typography
          variant="subtitle1"
          component="div"
          className={classes.subtitle}
        >
          {props.images.reduce((acc, image) => {
            return acc + image.votes;
          }, 0) + ' answers'}
        </Typography>
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
      </Box>
    </Button>
  );
}
