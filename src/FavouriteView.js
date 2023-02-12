import React, { useEffect, useState } from "react";
import CardView from "./CardView.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {fetchFromLocalStorage,saveToLocalStorage} from "./utilFunctions.js"


const FavouriteView = (props) => {
  const { classes,favsList } = props;
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
  
  
  useEffect(()=>{
  	//localStorage.setItem("favs",JSON.stringify(favsList));
	saveToLocalStorage("favs",favsList);
  } ,[content]);
  
  
  
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
		content?.map( (obj)=>{return <CardView classes={classes} object = {obj} isFav={true} saveForLater={()=>{}}/>}  )
	 }

	
    </div>
  );
};

export default FavouriteView;