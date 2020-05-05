const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPrivate } = require('../middlewares/checkAuth.js');

// GET user manage bookings route
router.get('/usermanagebooking', isPrivate, (req, res) => {
    res.render('usermanagebooking', { title: 'Dashboard: Manage Your Bookings' });
});

// GET user search bookings route
router.get('/usersearchbooking', isPrivate, (req, res) => {
    res.render('usersearchbooking', {title: 'Search an Available Booking'});
});

// POST user create bookings route
router.post('/usercreatebooking', isPrivate, bookingController.getAllAvailable);

module.exports = router;