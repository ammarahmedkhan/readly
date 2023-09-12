const updateLocalStorage = (object,index,attr,value) => {
	let updatedLocalStorage = fetchFromLocalStorage(object);
	try{
	updatedLocalStorage[index][attr]=value;
	localStorage.setItem(object,JSON.stringify(updatedLocalStorage));
	}
	catch(e){
	}
}
const saveToLocalStorage = (key,value) =>{
	localStorage.setItem(key,JSON.stringify(value));
}
const getObjByURL = (url,store) =>{
	const localStoreObj = fetchFromLocalStorage(store);
	if(localStoreObj === null){ return undefined;} 
	const noteIndex = localStoreObj.findIndex((obj)=>{ return obj["url"] === url });
	return noteIndex === -1 ? undefined : { "object" : localStoreObj[noteIndex] , "index": noteIndex } ;
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


export {updateLocalStorage,fetchData, fetchFromLocalStorage,a11yProps,saveToLocalStorage,getObjByURL};