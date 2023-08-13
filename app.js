/* Global Variables */
const apiKey = '&appid=df83409b63575ae04d2363f17473c9d5&units=imperial';
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;


// the following operation brings the weather data from the weather website using the getWeatherData function
// then saves the date, temp, and user input to the project end point using an object variable and a POST route
// and finally calls the updateUI function to update the browser with the given info
  const generateButton = async () => {
  const newZIP = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  // Fetch weather data from the OpenWeatherMap API
  const weatherData = await getWeatherData(newZIP);
  console.log(weatherData);
  // Create a new object with the weather data and user's feelings
  const object = {
    // Create a new date instance dynamically with JS
    date: new Date().toLocaleDateString(),
    temperature: weatherData.main.temp,
    feelings: feelings,
  };

  console.log(object);

  // Post the object data to the server
  await postObject('/addData', object);

  // Update the UI with the latest entry data
  updateUI();
};

// the following async function fetch the data from the weather site by combining the baseURL, zip code and the API key
// converts the acquired data to json string and returns it
  const getWeatherData = async (zip) => {
  const url = baseURL+zip+apiKey;
  try {
  const response = await fetch(url);
  const data = await response.json();
  return data;
  }catch(error) {
    console.log('error', error);
  }
};

// the following operation sets up the POST route async function
  const postObject = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try{
  const resData = await response.json();
  return resData;
  }catch(error) {
    console.log('error', error);
  }
};

// Function to update the UI with the latest entry data
  const updateUI = async () => {
  const response = await fetch('/all');
  try{
  const data = await response.json();
  console.log(data);
  document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}°F`;
  document.getElementById('date').innerHTML = `Date: ${data.date}`;
  document.getElementById('content').innerHTML = `Feelings: ${data.feelings}`;
  }catch(error) {
    console.log('erro', error);
  }
};

// Add an event listener to the generate button
document.getElementById('generate').addEventListener('click', generateButton);