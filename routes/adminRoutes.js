const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const userController = require('../controllers/userController');
const { isPrivate } = require('../middlewares/checkAuth.js');

// GET manage booking route
router.get('/adminmanagebooking', isPrivate, (req, res) => {
    res.render('adminmanagebooking', { title: 'Manage Users Bookings' });
});

// GET manage user route
router.get('/adminmanageuser', isPrivate, (req, res) => {
    res.render('adminmanageuser', { title: 'Manage Users' });
});

// POST routes
router.post('/adminmanagebooking', isPrivate, bookingController.getAllBookings);
router.post('/adminmanageuser', isPrivate, userController.getAllUsers);

module.exports = router;