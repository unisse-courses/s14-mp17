const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPublic } = require('../middlewares/checkAuth.js');

// GET routes
router.get('/searchresults', isPublic, (req, res) => {
    // console.log(req.body.hotelname);
    res.render('searchresults', {title: 'Search Results'});
});

module.exports = router;