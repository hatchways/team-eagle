import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Container, Button } from '@material-ui/core';
import PollModal from './PollModal';

function AddPollButton(props) {
  const [mode, setMode] = React.useState(false);

  const toggleMode = () => {
    setMode(!mode);
  };

  return (
    <div>
      {mode && <PollModal toggle={toggleMode} mode={mode} />}
      <Button variant="contained" color="secondary" onClick={toggleMode}>
        {props.edit ? 'Edit Poll' : 'Create poll'}
      </Button>
    </div>
  );
}

export default AddPollButton;
