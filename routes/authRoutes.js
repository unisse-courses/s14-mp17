const router = require('express').Router();
const userController = require('../controllers/userController');
const { registerValidation, loginValidation, adminValidation } = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth.js');

// GET login to display login page
router.get('/login', isPublic, (req, res) => {
    res.render('login', {
        title: 'Login',
    });
});

// GET register to display registration page
router.get('/register', isPublic, (req, res) => {
    res.render('register', {
        title: 'Register',
    });
});

// GET admin to display login page for admin
router.get('/admin', isPublic, (req, res) => {
    if(req.body.username == 'admin' && req.body.password == '1234')
    {
        res.render('admin', { title: 'Admin Login', });
    }
});

// POST methods for form submissions
router.post('/register', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);

// logout
//router.get('/logout', isPrivate, userController.logout);

module.exports = router;
