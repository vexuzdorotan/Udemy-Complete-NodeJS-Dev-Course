const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// express paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// static directory
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'MINImalist Weather',
    name: 'VeXuZ',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    content: 'I created this small app to practice Node.js 😅',
    name: 'VeXuZ',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText:
      "This small weather app is using Mapbox [Forward] Geocoding API to get the latitude and longitude of the users' input address. Then, the coordinates will be sent to WeatherStack REST API to retrieve instant, accurate weather information for any location in the world in lightweight JSON format.",
    title: 'Help',
    name: 'VeXuZ',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address.',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData, imgURL) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          imgURL,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.',
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    name: 'VeXuZ',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'VeXuZ',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
