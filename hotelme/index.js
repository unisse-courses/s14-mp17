//imports
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

//express application
const app = express();
const port = 3000;

const mongoClient = mongodb.MongoClient;
const databaseURL = "mongodb://localhost:27017";
const hotelmedb = "hotelmedb";

const options = { useUnifiedTopology: true };

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
    },
    bold: function(text)
    {
      var x = `<b>${text}</b>`;
      return new handlebars.SafeString(x);
    }
  }
}));

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Creating collections
const hotelscollection = "hotels";
mongoClient.connect(databaseURL, options, function(err, db) {
  if(err) throw err;
  const dbo = db.db(hotelmedb);
  dbo.createCollection(hotelscollection, function(err, res) {
    if(err) throw err;
    console.log("Hotels collection created!");
    db.close();
  });
});
const bookingscollection = "bookings";
mongoClient.connect(databaseURL, options, function(err, db) {
  if(err) throw err;
  const dbo = db.db(hotelmedb);
  dbo.createCollection(bookingscollection, function(err, res) {
    if(err) throw err;
    console.log("Bookings collection created!");
    db.close();
  });
});
const userscollection = "users";
mongoClient.connect(databaseURL, options, function(err, db) {
  if(err) throw err;
  const dbo = db.db(hotelmedb);
  dbo.createCollection(userscollection, function(err, res) {
    if(err) throw err;
    console.log("Users collection created!");
    db.close();
  });
});




//home
app.get('/', function(req, res)
{
    res.render('home', {
      title: 'Find your ideal hotel at an affordable price!',
      viewhotels:
      [
        {
          image: 'img/bayfront-hotel.png',
          name: 'Bayfront Hotel',
          location: 'North Reclamation Area, Cebu',
          price: 'Starts at Php 3,134 per night!'
        },
        {
          image: 'img/belmont-hotel.png',
          name: 'Belmont Hotel',
          location: 'Newcoast Drive, Boracay',
          price: 'Starts at Php 3,886 per night!'
        },
        {
          image: 'img/dusit-thani.png',
          name: 'Dusit Thani',
          location: 'Mactan, Cebu',
          price: 'Starts at Php 6,430 per night!'
        },
        {
          image: 'img/heritage-hotel.png',
          name: 'Heritage Hotel',
          location: 'Pasay, Manila',
          price: 'Starts at Php 3,784 per night!'
        },
      ]
    });
});

//register
app.get('/register', function(req, res)
{
  res.render('register', {
    title: 'Create Your Account',
  });
});

//insert a user to the database
app.post('/registerUser', function(req, res) {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  };
  //insert data to database
  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(userscollection).insertOne(student, function(req, res) {
      if(err) throw err;
      console.log("Insert Successful!");
      client.close;
    });
    const result = {
      success: true,
      message: "User created!"
    }
    res.send(result);
  });
});

//login
app.get('/login', function(req,res)
{
  res.render('login', {
    title: 'Sign In to Your Account',
  });
});

//admin login
app.get('/admin', function(req, res)
{
  res.render('admin', {
    title: 'Sign In as Admin',
  });
});

//search results page
app.get('/searchresults', function(req, res)
{
  mongoClient.connect(databaseURL, options,function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(bookingscollection).find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log("Read Successful! [Search Results]");
      client.close();

      res.render('searchresults', {
        title: 'Search Results',
        searchresults: result,
      });
    });
  });
});

app.get('showSearchResults', function(req, res) {
  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(bookingscollection).find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      console.log("Read Successful [showSearchBookings]!");
      client.close();

      res.send(result);
    });
  });
});

//user - manage bookings
app.get('/usermanagebooking', function(req, res)
{
  mongoClient.connect(databaseURL, options, function(err, client) {

    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(bookingscollection).find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log("Read Successful! [User: Manage Booking]");
      client.close();

      res.render('usermanagebooking', {
        title: 'Manage Your Bookings',
        userbookings: result,
      });
    });
  });
});

app.post('/showAllUserBookings', function(req, res) {
  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(bookingscollection).find({status: 'Taken'}).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      console.log("Read Successful [showAllBookings]!");
      client.close();

      res.send(result);
    });
  });
});

app.post('/userSearchBooking', function(req, res) {
  var query = {
    hotelName: req.body.hotelName
  };
  console.log(query);
  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(bookingscollection).find({hotelName: req.body.hotelName, status: 'Taken'}).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      console.log("Read Successful [showAllBookings]!");
      client.close();

      res.send(result);
    });
  });
});

//admin - manage bookings
app.get('/adminmanagebooking', function(req, res)
{
  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(bookingscollection).find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log("Read Successful! [Admin: Manage Booking]");
      client.close();

      res.render('adminmanagebooking', {
        title: 'Manage Users\' Bookings',
        bookings: result,
      });
    });
  });
});

app.post('/showAllBookings', function(req, res) {
  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(bookingscollection).find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      console.log("Read Successful [showAllBookings]!");
      client.close();

      res.send(result);
    });
  });
});

//admin - manage users
app.get('/adminmanageuser', function(req, res)
{
  //reads data from the database
  mongoClient.connect(databaseURL, options, function (err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(userscollection).find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log("Read Successful!");
      client.close();

      res.render('adminmanageuser', {
        title: 'Manage Users',
        users: result,
      });
    });
  });
});

app.post('/showAllUsers', function(req, res) {
  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(userscollection).find({}).toArray(function(err, result) {
      if(err) throw err;
      console.log(result);
      console.log("Read Successful [showAllUsers]!");
      client.close();

      res.send(result);
    });
  });
});

app.post('/updateName', function(req, res) {
  var query = {
    firstName: req.body.oldFirstname
  };
  var update = {
    $set: {firstName: req.body.newFirstname}
  };

  mongoClient.connect(databaseURL, options, function(err, client) {
    if(err) throw err;
    const dbo = client.db(hotelmedb);
    dbo.collection(userscollection).updateOne(query, update, function(err, result) {
      if(err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});

app.use(express.static('public'));

app.listen(port, function() {
  console.log('App listening at port '  + port)
});
