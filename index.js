//express and handlebars
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const app = express();
const port = 3000;

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

app.engine( 'hbs', exphbs
({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),

  helpers: {
    em: function(text)
    {
      var x = `<em>${text}</em>`;
      return new handlebars.SafeString(x);
    }
  }
}));

app.set('view engine', 'hbs');

//home
app.get('/', function(req, res)
{
    res.render('home', {
      title: 'Find your ideal hotel at an affordable price!',
      batchone:
      [
        {
          image: 'img/bayfront-hotel.png',
          name: 'Bayfront Hotel',
          location: 'Mactan, Cebu',
          price: 'Starts at Php 5,701!',
        },
        {
          image: 'img/belmont-hotel.png',
          name: 'Belmont Hotel',
          location: 'Boracay, Boracay',
          price: 'Starts at !',
        },
        {
          image: 'img/dusit-thani.png',
          name: 'Dusit Thani',
          location: 'Mactan, Cebu',
          price: 'Starts at !',
        },
        {
          image: 'img/heritage-hotel.png',
          name: 'Heritage Hotel',
          location: 'Manila',
          price: 'Starts at !',
        },
      ],
      batchtwo:
      [
        {
          name: 'Diamond Residences',
          location: 'Makati',
          price: 'Starts at !',
        },
        {
          name: 'Manila Hotel',
          location: 'Ermita, Manila',
          price: 'Starts at !',
        },
        {
          name: 'Marco Polo Plaza',
          location: 'Cebu',
          price: 'Starts at !',
        },
        {
          name: 'Marriot Hotel',
          location: 'Manila',
          price: 'Starts at !',
        },
      ],
      batchthree:
      [
        {
          name: 'Okada',
          location: 'Entertainment City, Manila',
          price: 'Starts at !',
        },
        {
          name: 'Richmonde Hotel',
          location: 'Ortigas',
          price: 'Starts at !',
        },
        {
          name: 'Waterfront Hotel',
          location: 'Cebu City, Cebu',
          price: 'Starts at !',
        },    
        {
          name: 'Shangri-la Hotel',
          location: 'Manila',
          price: 'Starts at !',
        },
      ]
    })
});

//register
app.get('/register', function(req, res)
{
  res.render('register', {
    title: 'Register',
  })
});

app.use(express.static('public'));

app.listen(port, function() {
  console.log('App listening at port '  + port)
});
