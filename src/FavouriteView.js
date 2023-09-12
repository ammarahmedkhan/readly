import React, { useEffect, useState } from "react";
import CardView from "./CardView.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {fetchFromLocalStorage,saveToLocalStorage} from "./utilFunctions.js"


const FavouriteView = (props) => {
  const { classes,favsList , deleteFav, addNoteToStorage} = props;
  const [content, setContent] = React.useState([]);
  const [loading,setLoading] = React.useState(true);

  useEffect(() => {
    ///fetch(url)
	if(favsList?.length == 0)
	{
		setContent(fetchFromLocalStorage("favs"));
	}
	else{
			setContent(favsList);
	}
}, [props]);
//https://stackoverflow.com/questions/57788721/react-hook-delayed-useeffect-firing
 useEffect(() => {
      setTimeout(()=>{
		setContent(favsList);
      }, 50)
 
    }, [favsList])
  
  
  useEffect(()=>{
	saveToLocalStorage("favs",favsList);
  } ,[content]);
  
  const deleteFavourite = (object) => {
	 deleteFav(object);
  }
  
  return (
    <div>

	<Paper elevation={3}>

          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >

          </Typography>


	 
     </Paper>
	
	
	 { 
		content?.map( (obj)=>{return <CardView classes={classes} object = {obj} isFav={true} saveForLater={()=>{}} deleteFavourite = {deleteFavourite} addNote = {addNoteToStorage}  />}  )
	 }

	
    </div>
  );
};

export default FavouriteView;