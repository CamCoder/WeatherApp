// API Vars
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "&appid=5bc07b36893e241b286b9987c65e1b57"
const unit = "&units=imperial"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


// Listen for submit
document.getElementById('generate').addEventListener('click', generateEntry)

// Called by EventListener
function generateEntry(e){
    const zipcode = document.querySelector('#zip').value;
    getWeather(baseURL,zipcode,apiKey,unit)

    .then(function(data){
        postWeather('/addData', data)
    })
    .then(() =>{
        addEntry()
    }
        
    )
    
}

// GET Web API
const getWeather = async (baseURL, zipcode, key, unit) => {
    // build url for api
    const res = await fetch(baseURL+zipcode+key+unit)
    try{
        const data = await res.json()
        return data;
    }catch(err){
        console.log('error: ', err);
    }
}

// Send data to server to be stored
const postWeather = async ( url = '', data = {})=>{
        const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
     // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}



// Add New Entry
const addEntry = async () =>{

    // change display from none to flex when entry is added
    // only changes on first function call
    document.getElementById('entryContainer').style.display = 'flex';

    const req = await fetch('/getData');

    try{
    const entryData = await req.json();

    // user input
    const feelings = document.querySelector('#feelings').value;

    // Create Element and add classes/id's
    const newEntry = document.createElement('div')
    newEntry.classList.add('holder', 'entry', 'card');
    const entryContainer = document.createElement('div');
    entryContainer.setAttribute('id', 'entryHolder');
    const entryTitle = document.createElement('div');
    entryTitle.setAttribute('class', 'title')
    const entryIcon = document.createElement('img');
    const entryWeather = document.createElement('div');
    const entryDate = document.createElement('div');
    entryDate.setAttribute('id', 'date')
    const entryTemp = document.createElement('div');
    entryTemp.setAttribute('id', 'temp')
    const entryContent = document.createElement('div');
    entryContent.setAttribute('id', 'content')
    
    // Add Content
    entryTitle.innerHTML = entryData.city
    entryIcon.setAttribute('src', `http://openweathermap.org/img/wn/${entryData.icon}@2x.png`)
    entryWeather.innerHTML = `Weather: ${entryData.weather}`;
    entryDate.innerHTML = `Date: ${newDate}`
    entryTemp.innerHTML = `Temp: ${entryData.temp} °F`
    entryContent.innerHTML = `Mood: ${feelings}`
    
    //Add Child to parent
    entryContainer.appendChild(entryDate)
    entryContainer.appendChild(entryIcon)
    entryContainer.appendChild(entryWeather)
    entryContainer.appendChild(entryTemp)
    entryContainer.appendChild(entryContent)
    newEntry.appendChild(entryTitle)
    newEntry.appendChild(entryContainer)
    const entryList = document.querySelector('#entryContainer');
    entryList.appendChild(newEntry);


    }catch(error){
        console.log('error', error);
    }   

}
