import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Button, Modal} from "@material-ui/core";

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 20 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

export default function PollModal(props){
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () =>{        
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    const body = (
        <div>
            <div style={{top:"30%", marginLeft:"35vw", marginRight:"auto"}} className={classes.paper}>
                <h2 id="poll-modal-title">
                    {(props.view == "add")?"Add New Poll":"Edit poll"}
                </h2>
                <p id="poll-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>            
            </div>
            <PollModal />
        </div>                
    )    

    return(
        <div>
            <Button color="primary" onClick={handleOpen}>
                Add Poll
            </Button>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="poll-modal-title"
                aria-describedby="poll-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));