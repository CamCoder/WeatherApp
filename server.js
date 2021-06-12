/* Empty JS object to act as endpoint for all routes */
let projectData = {}


// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 8000;

// TODO-Spin up the server
const server = app.listen(process.env.PORT || port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};


// GET route
app.get('/getData', function (req,res) {
    res.send(projectData)
})

app.post('/addData', function (req, res) {
    let newData = req.body;
    let newEntry = {
        city: newData.name,
        weather: newData.weather[0].main,
        temp: newData.main.temp,
        icon: newData.weather[0].icon
    };
    projectData = newEntry
    res.send(req.body)
})