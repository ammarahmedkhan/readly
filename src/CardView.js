import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import AddNotesModal from "./AddNotesModal.js";

const CardView = (props) => {
  const { object ,classes,saveForLater,isFav} = props;
  const saveForLaterTabHandler = (object) =>{
	  //save this link and its parent tab name as well. 
	  //object?.link
	  saveForLater(object);
  }
  
  const openUrl = () =>{	
	if(object?.link !== undefined)
	{
	navigator.clipboard
      .writeText(object?.link)
      .then(() => {
        window.open(object?.link);
      })
      .catch(() => {
        alert("something went wrong");
      });
	
	
		//window.open(object?.link);
	}
	
  };
  
  return (
    <div>
	  <Card className={classes.card}>
        <CardMedia  />
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {object?.title}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
			{object?.description}
          </Typography>
        </CardContent>
		<CardActions>
          <Button size="small" color="primary"
			onClick={openUrl}>
            Learn More
          </Button>
		{!isFav && <Button size="small" color="primary"  onClick={()=>saveForLaterTabHandler(object)}>Save</Button>}
		{isFav && <AddNotesModal object={object}/>}
		</CardActions>
		
      </Card>
  <Divider light />
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
		
          </Typography>

    </div>
  );
};

export default CardView;