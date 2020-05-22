import React from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {Button, Modal, TextField} from "@material-ui/core";

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
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState("");
    const [image1, setImage1] = React.useState(null);
    const [image2, setImage2] = React.useState(null);

    console.log(image1, image2, title);

    const handleOpen = () =>{        
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    const handleChange = (e, type) =>{
        switch(type){
            case "title":
                setTitle(e.target.value);                
                break;
            case "image1":
                setImage1(e.target.value);
                break;
            case "image2":
                setImage2(e.target.value);
                break;
            default:
                console.log("nada");
        }        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();        
        if(props.view == "add"){
            const query = {
                title: {title},
                image1: {image1},
                image2: {image2}
            }
            axios({
                method:"post",
                url: "http://localhost:3001/polls",
                data: query
            }).then((respons)=>{
                alert("New poll has been created");                
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        if(props.view == "edit"){
            console.log("editing a new poll");            
        }
    }

    const body = (
        <div>
            <div style={{top:"30%", marginLeft:"35vw", marginRight:"auto"}} className={classes.paper}>
                <h2 id="poll-modal-title">
                    {(props.view == "add")?"Add New Poll":"Edit poll"}
                </h2>
                <form className="poll-form" noValidate autoComplete="off">
                    <TextField onChange={(e)=>handleChange(e,"title")} name="title" fullWidth id="standard-basic" label="Title of the Poll" style={{marginBottom:20}} />                        
                    <label>Select first image</label>
                    <TextField onChange={(file)=>setImage1(file)} fullWidth id="standard-basic" label="Upload Image 1" type="file" style={{marginBottom:20}} />
                    <label>Select second image</label>
                    <TextField onChange={(file)=>setImage2(file)} fullWidth id="standard-basic" label="Upload Image 1" type="file" />
                    <Button onClick={(e)=>handleSubmit(e)}>
                        Submit Form
                    </Button>
                </form>                    
            </div>            
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