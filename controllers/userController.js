const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');

exports.registerUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty())
  {
    const { name, email, password } = req.body;

    userModel.getOne({ email: email }, (err, result) => {
      if (result) 
      {
        console.log(result);
        req.flash('error_msg', 'User already exists. Please login.');
        res.redirect('/login');
      } 
      else 
      {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hashed) => {
          const newUser = {
            name: name,
            email: email,
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
  else
  {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/register');
  }
};

exports.loginUser = (req, res) => {
  const errors = validationResult(req);

  if(errors.isEmpty()) 
  {
    const { email, password } = req.body;

    userModel.getOne({ email: email }, (err, user) => {
      if(err)
      {
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } 
      else 
      {
        if(user)
        {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result)
            {
              req.session.user = user._id;
              req.session.name = user.name;
              console.log(req.session);
              res.redirect('/usermanagebooking');
            } 
            else
            {
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
        }
        else
        {
          // No user found
          req.flash('error_msg', 'No registered user with that email. Please register.');
          res.redirect('/register');
        }
      }
    });
  }
  else
  {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  if (req.session) 
  {
    req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.redirect('/')
    });
  }
};

// admin login
exports.adminLogin = (req, res) => {
  const errors = validationResult(req);

  if(errors.isEmpty()) 
  {
    const { username, password } = req.body;

    userModel.getOne({ name: username }, (err, user) => {
      if(err)
      {
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } 
      else 
      {
        if(user)
        {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result)
            {
              req.session.user = user._id;
              req.session.name = user.name;
              console.log(req.session);
              res.redirect('/adminmanagebooking');
            } 
            else
            {
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
        }
        else
        {
          // No user found
          req.flash('error_msg', 'No registered user with that email. Please register.');
          res.redirect('/register');
        }
      }
    });
  }
  else
  {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.getAllUsers = (req, res) => {
  
    userModel.getAll({name: 1}, function(users) {
        res.send(users);
    })
};

exports.searchUser = (req, res) => {
    var pattern = '^' + req.body.name;
    var query = {name: {$regex: pattern}};
    userModel.search(query, function(users) {
        res.send(users);
    });
};

exports.deleteUser = (req, res) => {
  const query = req.body.name;

  userModel.delete(query, function(users) {
    if(err) throw err;
    res.send(users);
  });
};