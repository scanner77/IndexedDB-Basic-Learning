const myComics = [
    {id: 0, title: 'The Call to the wild', published: '1999'},
    {id: 1, title: '14 Peaks', published: '2021'},
    {id: 2, title: 'Mission Impossible', published: '2018'},
    {id: 3, title: 'American Dream', published: '2040'}
];

//let's check for browser that supports indexedDB
if(window.indexedDB){

    //request to instantiate the database
    var request = indexedDB.open("comicsDB", 1);//version can be incremented when you are changing the schema of a database

    request.onerror = function(e){
        console.log(e)
    }

    request.onsuccess = function(e){
        console.log("success")
    }

    //it will run if the version of the schema on the user's local storage is a lower version than the version we have defined
    //since we are running this application for the first time, onupgradeneeded will run with the version 1
    request.onupgradeneeded = function(e){
        //this will give access to the database within this function
        var db = e.target.result;//this callback gunction will have access to the above request to the db

        //creating an object store. We will be storing our data into objectStore before it goes to database
        var objectStore = db.createObjectStore("comics", {keyPath: 'id'}); //keyGenerator will create a key on fly

        //creating indexes in our database
        objectStore.createIndex("title", "title", {unique: false});//title: value from the source, title: the value that we will be calling in the objectstore(title here has keypath primary keys), unique: we are trying to find if the title(second) is unique    }
        
        objectStore.transction.oncomplete = function(e){
            //this is where we start setting the values from our database or array
            var store = db.transction(["comics"], "readwrite").objectStore("comics"); //since we are creating a transction here. We have to define if it is a read only transction or read write transction or update to schema transction. Here .objectStore("comics") means that this transction will happen in comics object store
            for(var i = 0; i < myComics.length; i++){
                store.add(myComics[i])
            }
        }
    }
}