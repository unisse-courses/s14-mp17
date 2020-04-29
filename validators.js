const { body } = require('express-validator');

const registerValidation = [
    // firstname should not be empty
    body('firstname').not().isEmpty().withMessage("Firstname is required."),

    // lastname should not be empty
    body('lastname').not().isEmpty().withMessage("Lastname is required."),

    // email should not be empty and must be a valid email
    body('email').not().isEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email."),

    // password needs to be minimum 8 characters
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),

    // confirm password needs to be minimum 8 characters AND must match req.body.password
    body('confirmPass').isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
    .custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error("Passwords do not match.");
        }
        return true;
    })
];

const loginValidation = [
    // email should not be empty and must be a valid email
    body('email').not().isEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email."),

    // password needs to be minimum 8 characters
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
];

// update exports
module.exports = { registerValidation, loginValidation };