import React, { useEffect, useState } from "react";


import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

import {styles,modalStyle,useStyles} from "./customStyles.js";
import AddFeedModal from "./AddFeedModal.js";
import CardView from "./CardView.js";
import ContentView from "./ContentView.js";
import FavouriteView from "./FavouriteView.js";
import TabPanel from "./TabPanel.js";
import {updateLocalStorage,fetchData, fetchFromLocalStorage,a11yProps,saveToLocalStorage,getObjByURL} from "./utilFunctions.js"

import "./styles.css";

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [tabs,setTabs] = useState([
    {
      title: "first feed",
      url:"https://feeds.washingtonpost.com/rss/business/technology?itid=lk_inline_manual_36"
    }
  ]);
  const [favsList,setFavsList] = useState([]);
  const addToFavs = (object) =>{
	
	favsList === {} ? 
	setFavsList([object]):
	setFavsList( favsList => [...favsList,object] );
		}
  const deleteFav = (object) =>{
		if(favsList.length === 1){setFavsList([]);return; }
		const matchedIndex = favsList.findIndex((iter)=>{return iter['link'] ===  object['link']});
		const tempFavCopy = [...favsList];
		tempFavCopy.splice(matchedIndex,1);
		setFavsList(tempFavCopy);
		//console.log("demo",tempFavCopy);
  }
  const addNoteToStorage = (url,note) =>{
	//fetch from local storage first
	let notes = fetchFromLocalStorage("notes");
	//check if the notes are already created.
	const existingNoteObject = getObjByURL(url,"notes");
	if(!Array.isArray(notes)){
		//if not, create for the first time.
		saveToLocalStorage("notes",[{"url":url,"note":note}]);
	}
	else{//if yes, save to existing ones.
		//check if the note for this url already exists -  if yes, update, if not, save it.

		if(existingNoteObject === undefined )
		{
			notes.push({"url":url,"note":note});
			saveToLocalStorage("notes",notes);
		}
		else{
			updateLocalStorage("notes",existingNoteObject["index"],"note",note)
		}
	}
  }
  
  const addToFeed = (title,url) =>{
	setTabs(tabs => [...tabs, {title:title,url:url}]);
}

  useEffect( ()=>{
	fetchFromLocalStorage("object")?.map( (obj)=>{addToFeed(obj)}  );
  },[]);

	const updArray = (url) =>{
	const filteredItems = tabs.filter((iter)=>{return iter['url'] !==  url});
	setTabs(filteredItems);
  };
  useEffect(()=>{
	setTabs(fetchFromLocalStorage("object"));
	fetchFromLocalStorage("favs")?.map( (obj)=>{addToFavs(obj)}  );
  } ,[]);
  
  useEffect(()=>{
  	//localStorage.setItem("object",JSON.stringify(tabs));
	saveToLocalStorage("object",tabs);
  } ,[tabs]);
  
  const handleModalOpen = () =>{
	setOpenModal(true);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" style={{position: "sticky", top:"0"}}>
	  <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
		tabs?.length > 0 ?  {
		  tabs.map((obj, ind) => {
            return <Tab label={obj["title"]} {...a11yProps(ind)} />;
          })
		} : ""
		{<Tab label={"favs"} {...a11yProps(1)} />}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={value}>
{
tabs?.length > 0 ?
 
 <ContentView 
 classes={classes} 
 object={tabs[value]} 
 addToFavs = {addToFavs} 
 tabs = {tabs} 
 updArray = {updArray} 
 />
: ""
}

{
tabs[value] === undefined ? <FavouriteView
classes={classes} favsList = {favsList} deleteFav = {deleteFav} addNoteToStorage = {addNoteToStorage}/>  :  ""
}
{

tabs?.length < 1 ?
<div  className = {classes.img}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            No feeds to show
          </Typography>
		<div color="success">
		  <AddFeedModal  addToFeed = {addToFeed}/>
		</div>
<img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNK5gP_76VrDdcNDiYK-vmYqcN3BhoumE7w&usqp=CAU"/>


</div>


: ""
}

      </TabPanel>
	  <Fab variant="extended" size="medium" color="warning" aria-label="add"
	  onclick = {handleModalOpen}
	  style={{
		  position: 'fixed',
		  bottom: 16,
		  right: 16,
	  }}
	  >
	  
<AddFeedModal addToFeed = {addToFeed}/>
</Fab>

    </div>
  );
}
//when the feed doesnt contain any articles, how to ?
//http://feeds.washingtonpost.com/rss/rss_plum-line?itid=lk_inline_manual_12

//https://www.thestar.com.my/rss/News/Regional
//https://www.thestar.com.my/rss/News/Environment
//https://www.thestar.com.my/rss