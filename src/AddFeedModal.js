import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import {styles,modalStyle} from "./customStyles.js";

const AddFeedModal = (props)=>{
  const {addToFeed} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [doneFetching,setDoneFetching] = React.useState(false);
  const handleAdd = () =>{ 
	addToFeed(title,url);
	
	handleClose();
  };
	useEffect( (props)=>{
		if(props?.open){
		handleOpen();
		}
	}  ,[]);
	const handleChange = (e) =>{
		if(e.target.id == 'title'){setTitle(e.target.value)};
		if(e.target.id == 'rss'){setUrl(e.target.value)};
		//console.log(e);
	}
	const getRSSDesc = (data) => {
		setDoneFetching(true);
	}
	const copyFromClipboard = ()=>{
	
		navigator.clipboard.readText()
		.then(text => {
		setUrl(text);
		//fetchData(text,getRSSDesc);
		})
		.catch(err => {
		console.error('Failed to read clipboard contents: ', err);
		});
	
	}
	
	
  return (
    <div>
      <Button onClick={handleOpen}>Add to feed</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a new Feed
            </Typography>

			<TextField
          required
          id="title"
          label="Name"
          defaultValue=""
		  value={title}
		  onChange={handleChange}
        />
		<div style={{padding:"2px"}}></div>
			<TextField
          required
          id="rss"
          label="Link"
          defaultValue=""
		  onChange={handleChange}
		  value={url}
        />
		<div style={{padding:"2px"}}></div>
      <Button onClick={copyFromClipboard}>Paste from clipbaord</Button>			
      <Button onClick={handleAdd}>Add to feed</Button>			
          </Box>
        </Fade>
      </Modal>	
    </div>
  );
}

export default AddFeedModal;