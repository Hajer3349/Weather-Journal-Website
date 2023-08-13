// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// Cors is a package that allows the browser and server talk to eachother without any security interruptions
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
// pointing the app to the folder we want it to look at
// this line of code allows the server-side code to connect to the client-side code which would be in a folder called website
app.use(express.static('website'));

const port = 8200;

// Setup Server
const server = app.listen(port, listening);
// callback function to ensure the server is running
function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}
// GET route to send all the app data (end point)
app.get('/all', (req, res)=> {res.send(projectData);});
// POST route to save API data + user input in the end point and then sends back the project data
app.post('/addData', (req, res)=>
{
    // req.body = data brought by the calling line
    projectData = {
      temperature: req.body.temperature,
      date: req.body.date,
      feelings: req.body.feelings,
    };
    console.log(projectData);
    res.send(projectData);
}); 

