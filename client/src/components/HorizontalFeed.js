import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Grid, Container } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    marginBottom: theme.spacing(5),
  },
  header: {
    flexGrow: 1,
  },
  gridOfPolls: {
    position: 'relative',
    flexWrap: 'nowrap',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  scrollButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: 100,
    borderRadius: 0,
    boxShadow: 'inset -102px 0px 38px -24px rgba(255,255,255,1)',
    '&:hover': {
      background: 'transparent',
    },
  },
}));

export default function HorizontalFeed(props) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item className={classes.header}>
          <Typography variant="h2">
            {props.title}
            <Typography variant="subtitle1" component="span">
              {' ' + props.subtitle}
            </Typography>
          </Typography>
        </Grid>
        <Grid item>{props.button}</Grid>
      </Grid>
      <Grid container spacing={2} className={classes.gridOfPolls}>
        {props.children}
        {props.children.length > 2 ? (
          <IconButton className={classes.scrollButton}>
            <ArrowForwardIosIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Container>
  );
}
