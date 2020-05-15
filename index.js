// all imports
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');

// imports for deployment
const { envPort, sessionKey } = require('./config');

// other routes
const authRouter = require('./routes/authRoutes');
const indexRouter = require('./routes/indexRoutes');
const userRouter = require('./routes/userRoutes');
const searchResultsRouter = require('./routes/searchRoutes');
const adminRouter = require('./routes/adminRoutes');

// create the express application
const app = express();
const port = envPort || 3000;

// create an engine called hbs using the express-handlebars
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  
  helpers: {
    dateformat: function(context, block) {
      var x = " ";
      var f = block.hash.format || "MMMM DD, YYYY";
      if(f === "December 31, 1999")
      {
        return x.toString();
      }
      return moment(new Date(context), "YYYY-MM-DD").format(f);
    }
  }
}));

// set the view engine to the express-handlebar engine
app.set('view engine', 'hbs');

// configuration for handling API endpoint data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

// sessions - server configuration
app.use(session({
  secret: sessionKey, 
  // secret: 'somegibberishsecret',
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
  res.locals.isAuthenticated = req.session.user ? true : false;
  next();
});

app.use('/', authRouter); // login/register routes
app.use('/', indexRouter); // main/home route
app.use('/', searchResultsRouter); // search results
app.use('/', userRouter); // user routes when user is logged in
app.use('/', adminRouter); // admin routes

// serve static files
app.use(express.static('public'));

// listen to the port provided
app.listen(port, () => {
  console.log('App listening at port ' + port);
});