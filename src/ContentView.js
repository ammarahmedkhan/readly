import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {fetchData} from "./utilFunctions.js"
import CardView from "./CardView.js";
import CircularProgress from "@material-ui/core/CircularProgress";


const ContentView = (props) => {
  const { object ,classes, tabs, updArray, addToFavs} = props;
  const [content, setContent] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(() => {
	setContent({});
	const url = "https://api.rss2json.com/v1/api.json?rss_url=" + object?.url; fetchData(url,setContent);
  }, [props]);

  useEffect(() => {
  if(content !== {})
  {  setLoading(false);}
  else{
  setLoading(true);
  }
  },[]);
  
  const removeFeed = () =>{
	updArray(object["url"]);
  };
  
  const saveForLater = (object) =>{
	addToFavs(object);
  }
  return (
    <div>

	<Paper elevation={3}>
<Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
			gutterBottom
>
		Articles from the added feed.
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >

          </Typography>


	 
     </Paper>
		<Button size="small" color="primary"
		onClick={removeFeed}>
			 	 <img src="https://cdn-icons-png.flaticon.com/512/166/166475.png"
	 width = "30" height = "30" className={classes.content}
	 tooltip="remove feed"
	 >
	 </img>

          </Button>
	{
	
	( content?.items?.length < 0 && content?.items !== undefined )   ? <CircularProgress/>   : ""
	
	}

	 { 
		content?.items?.map( (obj)=>{return <CardView classes={classes} object = {obj} saveForLater={saveForLater}/>}  )
	 }

	
    </div>
  );
};

export default ContentView;