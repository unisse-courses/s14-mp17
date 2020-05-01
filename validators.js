const { body } = require('express-validator');

const registerValidation = [
    // name should not be empty
    body('name').not().isEmpty().withMessage("Name is required."),

    // email should not be empty and must be a valid email
    body('email').not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email."),

    // password needs to be minimum 8 characters
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),

    // confirm password needs to be minimum 8 characters AND must match req.body.password
    body('confirmPass').isLength({ min: 8 }).withMessage("Password must be at least 8 characters.").custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error("Passwords do not match.");
        }
        return true;
    })
];

const loginValidation = [
    // email should not be empty and must be a valid email
    body('email').not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email."),

    // password needs to be minimum 8 characters
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
];

const adminValidation = [
    // username should not be empty
    body('username').not().isEmpty().withMessage("Username is required."),

    // password should not be empty
    body('password').not().isEmpty().withMessage("Password is required.")
];

// update exports
module.exports = { registerValidation, loginValidation, adminValidation };