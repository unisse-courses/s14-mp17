const router = require('express').Router();
const { isPrivate } = require('../middlewares/checkAuth');
const userController = require('../controllers/userController');

// display all users in the database
//router.get('/', userController.getAllUsers);

//router.post('/add', userController.createUser);

module.exports = router;