import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import {styles,modalStyle} from "./customStyles.js";
import {updateLocalStorage,fetchFromLocalStorage} from "./utilFunctions.js"


const AddNotesModal = (props)=>{
  const {object} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [doneFetching,setDoneFetching] = React.useState(false);
  
  const matchURL =(iterObj)=>{
	return iterObj["link"]==object["link"];
	}
  const handleAdd = () =>{
	let matchedObjectIndex = fetchFromLocalStorage("favs").findIndex(matchURL);
	updateLocalStorage("favs",matchedObjectIndex,"note",note);
	handleClose();
  };
	useEffect( (props)=>{
		setNote(object?.note);
		if(props?.open){
		handleOpen();
		}
	}  ,[]);
	const handleChange = (e) =>{
		if(e.target.id == 'notes'){setNote(e.target.value)};
	}
	
	
  return (
    <div>
      <Button onClick={handleOpen}>Add Notes</Button>
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
              Add a Note
            </Typography>

		<div style={{padding:"2px"}}></div>
		<TextField
		  multiline
          rows={4}
          id="notes"
          label="Notes"
          defaultValue=""
		  onChange={handleChange}
		  value={note}
        />
		<div style={{padding:"2px"}}></div>
      <Button onClick={handleAdd}>Add Note</Button>			
          </Box>
        </Fade>
      </Modal>	
    </div>
  );
}

export default AddNotesModal;