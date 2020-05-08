const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const userController = require('../controllers/userController');
const { isPrivate } = require('../middlewares/checkAuth.js');

router.get('/adminmanagebookings', isPrivate, bookingController.getAllBookings);

router.get('/adminmanageusers', isPrivate, userController.getAllUsers);


// router.get('/:id', isPrivate, userController.deleteUser);

// router.post('/search', isPrivate, userController.searchUser);

module.exports = router;