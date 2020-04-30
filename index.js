// all imports
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');

// imports for sessions
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');

// imports for deployment
const { envPort, sessionKey } = require('./config');

// import the routes for the collections in the database
const userRouter = require('./routes/userRoutes');
const hotelRouter = require('./routes/hotelRoutes');
const bookingRouter = require('./routes/bookingRoutes');

// user authentication routes
const authRouter = require('./routes/authRoutes');
const indexRouter = require('./routes/indexRoutes');

// other routes
const userPrivateRouter = require('./routes/userPrivateRoutes');
const searchResultsRouter = require('./routes/searchRoutes');

// create the express application
const app = express();
const port = envPort || 3000;

// listen to the port provided
app.listen(port, () => {
  console.log('App listening at port ' + port);
});

// create an engine called hbs using the express-handlebars
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  
  dateFormat: function(context, block) {
      var f = block.hash.format || "MMMM DD YYYY, h:mm a";
      return moment(new Date(context), "YYYY-MM-DDTHH:mm:ss.SSSZ").format(f);
    }
}));

// set the view engine to the express-handlebar engine
app.set('view engine', 'hbs');

// configuration for handling API endpoint data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));

// sessions - server configuration
app.use(session({
  secret: sessionKey,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// flash
app.use(flash());

// global variable messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

// USER
app.use('/', authRouter); // login/register routes
app.use('/', indexRouter); // main/home route
app.use('/', searchResultsRouter); // search results


// login an admin
app.get('/admin', function(req, res) {
  res.render('admin', {title: 'Login As Admin'});
});

// view all bookings - ADMIN
app.get('/adminmanagebooking', function(req, res) {
  res.render('adminmanagebooking', {title: 'Manage Users\' Bookings'});
});

app.use('/adminmanagebooking', bookingRouter);

// view all users - ADMIN
app.use('/adminmanageuser', userRouter);
