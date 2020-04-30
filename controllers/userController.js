const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');

// register a new user
exports.registerUser = (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty())
    {
        const { name, email, password } = req.body;
        userModel.getOne( { email: email }, (err, result) => {
            if(result)
            {
                console.log(result);
                // found a match, return to login page with error message/s
                req.flash('error_msg', "User already exists. Please login.");
                res.redirect('/login');
            }
            else 
            {
                const saltRounds = 10;
                // hash password
                bcrypt.hash(password, saltRounds, (err, hashed) => {
                    const newUser = { name, email, password: hashed };
                    
                    userModel.create(newUser, (err, user) => {
                        if(err)
                        {
                            req.flash('error_msg', "Could not create user. Please try again.");
                            res.redirect('/register');
                        }
                        else
                        {
                            console.log(user);
                            req.flash('success_msg', "You are now registered! Login below.");
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

// login an existing user
exports.loginUser = (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        const { email, password } = req.body;

        userModel.getOne({ email: email }, (err, user) => {
            if(err)
            {
                // database error has occurred
                req.flash('error_msg', 'Something happened! Please try again.');
                res.redirect('/login');
            }
            else
            {
                // successful query
                if(user)
                {
                    // user found
                    // check password with hashed value in the database
                    bcrypt.compare(password, user.password, (err, result) => {
                        if(result) {
                            // passwords match (result == true)
                            // update session object once matched
                            req.session.user = user._id;
                            req.session.name = user.name;
                            console.log(req.session);
                            res.redirect('/');
                        }
                        else
                        {
                            // passwords don't match
                            req.flash('error_msg', "Incorrect password. Please try again.");
                            res.redirect('/login');
                        }
                    });
                }
                else
                {
                    // no user found
                    req.flash('error_msg', "No registered user with that email. Please register.");
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

// logout a user
exports.logoutUser = (req, res) => {
    if(req.session)
    {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
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