const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { isPublic } = require('../middlewares/checkAuth.js');

// GET routes
router.get('/searchresults', isPublic, (req, res) => {
    res.render('searchresults');
});

// POST routes
router.post('/searchresults', isPublic, bookingController.getAllAvailable);

module.exports = router;