const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPrivate } = require('../middlewares/checkAuth.js');

// GET user manage bookings route
router.get('/usermanagebooking', isPrivate, (req, res) => {
    const user = req.session.name;

    bookingController.getUserBookings(user, (bookings) => {
        res.render('usermanagebooking', { title: 'Dashboard: Manage Your Bookings', bookings: bookings });
    });
});

router.get('/usersearchbooking', isPrivate, (req, res) => {
    res.render('usersearchbooking', {title: 'Search an Available Booking'});
});

router.get('/usercreatebooking', isPrivate, (req, res) => {
    res.render('usercreatebooking', {title: 'Search Results'});
});

// POST user manage bookings
router.post('/usermanagebooking', isPrivate, bookingController.getBookingByName);

module.exports = router;