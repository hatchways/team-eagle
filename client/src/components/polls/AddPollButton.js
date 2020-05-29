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
        Add Poll
      </Button>
    </div>
  );
}

export default AddPollButton;
