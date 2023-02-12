const updateLocalStorage = (object,index,attr,value) => {
	let updatedLocalStorage = fetchFromLocalStorage(object);
	updatedLocalStorage[index][attr]=value;
	localStorage.setItem("favs",JSON.stringify(updatedLocalStorage));
}

const saveToLocalStorage = (key,value) =>{
	//console.log(key,JSON.stringify(value));
	localStorage.setItem(key,JSON.stringify(value));
}

const fetchData = (url,handler) => {
    if(url === undefined){return {}}
	fetch(url).then((response) => {
        return response.json();
      })
      .then((data) => {
        handler(data);
      });
}

const fetchFromLocalStorage = (storageObjName) =>{
	let fetchedResult = [];
	try{
		 fetchedResult = (localStorage.getItem(storageObjName) !== undefined && localStorage.getItem(storageObjName) !== null ? 
		JSON.parse(localStorage.getItem(storageObjName)) : [] );
	}
	catch(e)
	{
		
	}
	return fetchedResult;
}

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}


export {updateLocalStorage,fetchData, fetchFromLocalStorage,a11yProps,saveToLocalStorage};