const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

//  OpenWeather API token - keep this secret!
const openWeatherToken = process.env.OPEN_WEATHER_TOKEN;

// Proxy endpoint
app.get("/openweather/:cityName", async (req, res) => {
  const { cityName } = req.params;
  // console.log(cityName);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherToken}`;

  axios
    .get(apiUrl)
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching OpenWeather data");
    });
});

// Eventbrite API token - keep this secret!
const eventbriteToken = process.env.EVENT_BRITE_TOKEN;

// Proxy endpoint
app.get("/eventbrite", async (req, res) => {
  const apiUrl = `https://www.eventbriteapi.com/v3/users/me?token=${eventbriteToken}`;

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching Eventbrite data");
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
