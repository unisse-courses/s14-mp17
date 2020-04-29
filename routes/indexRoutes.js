const router = require('express').Router();
const hotelController = require('../controllers/hotelController');
const { isPublic } = require('../middlewares/checkAuth.js');

// GET home route
router.get('/', isPublic, (req, res) => {
    res.render('home', {title: 'Find your ideal hotel at an affordable price!'});
});

// POST home route
router.post('/', isPublic, hotelController.getAllHotels);

module.exports = router;