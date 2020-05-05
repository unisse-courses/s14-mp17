const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPrivate } = require('../middlewares/checkAuth.js');

// GET user manage bookings route
router.get('/usermanagebooking', isPrivate, (req, res) => {
    const name = req.session.name;

    //bookingController.getUserBookings(name, (bookings) => {
        res.render('usermanagebooking', { title: 'Dashboard: Manage Your Bookings' });
    //});
});

// GET user search bookings route
router.get('/usersearchbooking', isPrivate, (req, res) => {
    res.render('usersearchbooking', {title: 'Search an Available Booking'});
});

// GET user create bookings route
router.get('/usercreatebooking', isPrivate, (req, res) => {
    const hotelSearch = req.session.hotelSearch;

    bookingController.getBookingByName(hotelSearch, (bookings) => {
        res.render('usercreatebooking', { title: 'Search Results', bookings});
    });
});

// POST user create bookings route
router.post('/usercreatebooking', isPrivate, bookingController.getAllAvailable);

module.exports = router;