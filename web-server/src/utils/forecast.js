const request = require('request');
require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
  const access_key = process.env.API_KEY_FORECAST;
  const query = `${latitude},${longitude}`;
  const units = 'm';

  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}&units=${units}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined, undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`,
        body.current.weather_icons[0]
      );
    }
  });
};

module.exports = forecast;
