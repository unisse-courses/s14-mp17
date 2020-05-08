const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPrivate } = require('../middlewares/checkAuth.js');

router.get('/usermanagebooking', isPrivate, bookingController.getUserBookings);

router.get('/usersearchbooking', isPrivate, (req, res) => {
    res.render('usersearchbooking', {title: 'Search an Available Booking'});
});

router.get('/usercreatebooking', isPrivate, (req, res) => {
    res.render('usercreatebooking', { title: 'Search Results'});
});

router.get('/search', isPrivate, bookingController.searchBooking);

router.post('/usercreatebooking', isPrivate, bookingController.getAllAvailable);

//router.post('/usermanagebooking', isPrivate, bookingController.getUserBookings);

module.exports = router;