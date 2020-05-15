const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPrivate } = require('../middlewares/checkAuth.js');

router.get('/usermanagebooking', isPrivate, bookingController.getUserBookings);

router.get('/usersearchbooking', isPrivate, (req, res) => {
    res.render('usersearchbooking', {title: 'Search an Available Booking'});
});

// router.post('/usermanagebooking', isPrivate, bookingController.searchBookingById);

// router.get('/usercreatebooking', isPrivate, bookingController.searchBooking);

// router.post('/usermanagebooking', isPrivate, bookingController.searchBooking);

module.exports = router;