import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
//import DeleteIcon from '@mui/icons-material/Delete';



import "./styles.css";

const styles = (muiBaseTheme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    },
	img : {		
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width:"50%"

	}
  }
});
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const img =
  "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg";

const img2 = "cool.png";

function TabPanel(props, classes) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}

    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const CardView = (props) => {
  const { object ,classes} = props;  
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
        <CardMedia image={img2} />
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

const AddFeedModal = (props)=>{
  const {addToFeed} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleAdd = () =>{ 
	console.log(title,url);
	
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
	
	const copyFromClipboard = ()=>{
	
		navigator.clipboard.readText()
		.then(text => {
		setUrl(text);		
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


const ContentView = (props) => {
  const { object ,classes, tabs, updArray} = props;
  const [content, setContent] = useState({});
  const [loading,setLoading] = useState(true);

  //  console.log(object["url"]);
  useEffect(() => {
    ///fetch(url)
	setContent({});
	
	console.log(tabs);

	const url = "https://api.rss2json.com/v1/api.json?rss_url=" + object?.url;
    fetch(url).then((response) => {
        return response.json();
      })
      .then((data) => {
        setContent(data);
        //console.log(data);
      });
    /*
     */
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
		content?.items?.map( (obj)=>{return <CardView classes={classes} object = {obj}/>}  )
	 }


    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
//https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toptalRss = "https://www.toptal.com/developers/feed2json/convert?url=https://feeds.washingtonpost.com/rss/business/technology?itid=lk_inline_manual_36";

  const [tabs,setTabs] = useState([
    {
      title: "Toptal",
      url:"https://feeds.washingtonpost.com/rss/business/technology?itid=lk_inline_manual_36"
    }
  ]);
  const addToFeed = (title,url) =>{
	setTabs(tabs => [...tabs, {title:title,url:url}]);
}

  const updArray = (url) =>{ 
	const filteredItems = tabs.filter((iter)=>{return iter['url'] !==  url});
	setTabs(filteredItems);
	console.log(filteredItems);
  };
  useEffect(()=>{
	//console.log('tabs updated!');  
	//console.log(tabs);
	if(JSON.parse(localStorage.getItem("object")) !== undefined && localStorage.getItem("object") !== null) 
		{
			setTabs(JSON.parse(localStorage.getItem("object")));
		}
  } ,[]);
  
  useEffect(()=>{
	//console.log('tabs updated!');  
	//console.log(tabs);
  	localStorage.setItem("object",JSON.stringify(tabs));
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
		  
        </Tabs>
      </AppBar>


      <TabPanel value={value} index={value}>
{
tabs?.length > 0 ?
 
 <ContentView classes={classes} object={tabs[value]} tabs = {tabs} updArray = {updArray} />
: ""
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