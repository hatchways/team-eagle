import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, List, ListItem, ListItemIcon } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDropzone } from 'react-dropzone';

export default function PollImages(props) {
  const classes = useStyles({
    editable: !props._id,
  })();

  const [imagesData, setImagesData] = React.useState([]);

  function readImageData(files) {
    let promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function (e) {
          resolve({
            name: file.name,
            src: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises)
      .then((results) => {
        setImagesData(results);
      })
      .catch((err) => console.log(err));
  }

  function onDrop(files) {
    if (files.length !== 2) {
      alert('You can only upload only two files per poll.');
    } else {
      props.handleChange('images', files);
      readImageData(files);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // If the user is editing the poll, they can't change the images
  if (props._id) {
    return (
      <Grid container className={classes.root}>
        {props.images.map((image, i) => {
          return (
            <Grid item key={i}>
              <img
                src={props.images[i].url}
                alt="Poll image"
                className={classes.image}
              />
              <Grid container className={classes.votes}>
                <Grid item>
                  <FavoriteIcon color="secondary" />
                </Grid>
                <Grid item>{image.numVotes}</Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={classes.root}
      style={{
        border: props.imagesError ? '1px solid red' : 'none',
      }}
    >
      <input {...getInputProps()} />
      {imagesData.length ? (
        imagesData.map((image, i) => {
          return (
            <Grid item key={i}>
              <img src={image.src} alt="Poll image" className={classes.image} />
              <Box>{image.name}</Box>
            </Grid>
          );
        })
      ) : isDragActive ? (
        <p>Drop the files here</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select</p>
      )}
    </div>
  );
}

const useStyles = ({ editable }) =>
  makeStyles((theme) => ({
    root: {
      height: 300,
      backgroundColor: theme.palette.grey[200],
      marginBottom: theme.spacing(4),
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      cursor: editable ? 'pointer' : 'inherit',
    },
    image: {
      width: 120,
      height: 120,
      objectFit: 'cover',
    },
    votes: {
      justifyContent: 'center',
    },
  }));
