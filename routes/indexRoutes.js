const router = require('express').Router();
const hotelController = require('../controllers/hotelController');
const bookingController = require('../controllers/bookingController');
const { isPublic, isPrivate } = require('../middlewares/checkAuth.js');

// GET home route
router.get('/', isPublic, hotelController.getAllHotels);

// GET about route
router.get('/about', isPublic, (req, res) => {
    res.render('about', {title: 'About'});
});

// POST 
// router.post('/', isPublic, bookingController.searchBookingByName);

module.exports = router;