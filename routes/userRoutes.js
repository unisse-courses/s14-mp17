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

// GET user create bookings route
router.get('/usercreatebooking', isPrivate, (req, res) => {
    const query = req.body.hotelname + ', ' + req.body.capacity;

    bookingController.getAllAvailable(query, (bookings) => {
        res.render('usercreatebooking', { title: 'Search Results', bookings });
    });
});

router.post('/usercreatebooking', isPrivate, bookingController.getAllAvailable);

module.exports = router;