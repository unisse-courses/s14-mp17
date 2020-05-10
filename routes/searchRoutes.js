const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPublic } = require('../middlewares/checkAuth.js');

// GET routes
router.get('/searchresults', isPublic, bookingController.getBookingByHotel);

module.exports = router;