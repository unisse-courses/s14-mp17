const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');

exports.registerUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/register');
  } 
  else
  {
    //const { name, email, password } = req.body;

    userModel.getOne({ email: req.body.email }, (err, result) => {
      if (result) 
      {
        console.log(result);
        req.flash('error_msg', 'User already exists. Please login.');
        res.redirect('/login');
      } 
      else 
      {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hashed) => {
          const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashed
          };

          userModel.create(newUser, (err, user) => {
            if (err) {
              req.flash('error_msg', 'Could not create user. Please try again.');
              res.redirect('/register');
            } else {
              console.log(user);
              req.flash('success_msg', 'You are now registered! Login below.');
              res.redirect('/login');
            }
          });
        });
      }
    });
  }
};

exports.loginUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {
      email,
      password
    } = req.body;

    userModel.getOne({ email: email }, (err, user) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (user) {
          // User found!
          // Check password with hashed value in the database
          bcrypt.compare(password, user.password, (err, result) => {
            // passwords match (result == true)
            if (result) {
              // Update session object once matched!
              req.session.user = user._id;
              req.session.name = user.name;

              console.log(req.session);

              res.redirect('/');
            } else {
              // passwords don't match
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
        } else {
          // No user found
          req.flash('error_msg', 'No registered user with that email. Please register.');
          res.redirect('/register');
        }
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.redirect('/login')
    });
  }
};

// admin login
exports.adminLogin = (req, res) => {
    if(req.body.username == "admin" && req.body.password == "1234")
    {
        res.redirect('/adminmanagebooking');
    }
};

exports.getAllUsers = (req, res) => {
    userModel.getAllUsers({name: 1}, function(users) {
        res.render('adminmanageuser', {title: 'Manage Users', users: users});
    })
};

exports.searchUser = (req, res) => {
    var pattern = '^' + req.body.firstname + ' ' + req.body.lastname;
    var query = {name: {$regex: pattern}};
    userModel.searchUser(query, function(users) {
        res.send(users);
    });
};