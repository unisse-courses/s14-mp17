const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
//const userController = require('../controllers/userController');
const { isPrivate } = require('../middlewares/checkAuth.js');

// GET user manage bookings route
router.get('/usermanagebooking', isPrivate, (req, res) => {
    const username = req.session.username;

    //bookingController.getUserBookings(username, (bookings) => {
        res.render('usermanagebooking', { title: 'Dashboard: Manage Your Bookings'/*, bookings*/ });
    //});
});

router.get('/usersearchbooking', isPrivate, (req, res) => {
    res.render('usersearchbooking', {title: 'Search an Available Booking'});
});

router.get('/usercreatebooking', isPrivate, (req, res) => {
    const hotelSearch = req.session.hotelSearch;

    //bookingController.getUserBookings(name, (bookings) => {
        res.render('usercreatebooking', {title: 'Search Results'});
        console.log(hotelSearch);
    //})
    
});

// POST user manage bookings
router.post('/usercreatebooking', isPrivate, bookingController.getAllBookings);

module.exports = router;