import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Container, Button } from '@material-ui/core';

function AddPollButton(props){    
    return(
        <Box>
            <Button color="primary">
                Add Poll
            </Button>
        </Box>        
    )
}

export default AddPollButton;