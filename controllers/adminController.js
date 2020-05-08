const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');
const { validationResult } = require('express-validator');

// admin login
exports.adminLogin = (req, res) => {
    const errors = validationResult(req);
  
    if(errors.isEmpty()) 
    {
      const { username, password } = req.body;
  
      adminModel.getOne({ name: username }, (err, user) => {
        if(err)
        {
          req.flash('error_msg', 'Something happened! Please try again.');
          res.redirect('/admin');
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

                res.redirect('/admin/manage_bookings');
              } 
              else
              {
                req.flash('error_msg', 'Incorrect password. Please try again.');
                res.redirect('/admin');
              }
            });
          }
          else
          {
            // No user found
            req.flash('error_msg', 'An error has occurred! Please try again.');
            res.redirect('/admin');
          }
        }
      });
    }
    else
    {
      const messages = errors.array().map((item) => item.msg);
      req.flash('error_msg', messages.join(' '));
      res.redirect('/admin');
    }
};