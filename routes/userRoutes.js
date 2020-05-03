const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPrivate } = require('../middlewares/checkAuth.js');

// GET user manage bookings route
router.get('/usermanagebooking', isPrivate, (req, res) => {
    const username = req.session.username;

    //bookingController.getUserBookings(username, (bookings) => {
        res.render('usermanagebooking', { title: 'Manage Your Bookings'/*, bookings*/ });
    //});
});

// POST user manage bookings
router.post('/usermanagebooking', isPrivate, bookingController.getAllBookings);

module.exports = router;