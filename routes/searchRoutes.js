const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPublic } = require('../middlewares/checkAuth.js');

// GET routes
router.get('/searchresults', isPublic, (req, res) => {
    const hotel = req.body.name;

    bookingController.getBookingByName(hotel, (bookings) => {
        res.render('searchresults', {title: 'Search Results', bookings});
    });
});

// POST routes
//router.post('/searchresults', isPublic, bookingController.getAllBookings);

module.exports = router;