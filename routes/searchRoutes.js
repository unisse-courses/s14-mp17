const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPublic } = require('../middlewares/checkAuth.js');

// GET home route
router.get('/searchresults', isPublic, (req, res) => {
    res.render('searchresults', {title: 'Search Results'});
});

// POST home route
router.post('/', isPublic, bookingController.getAllBookings);

module.exports = router;