const router = require('express').Router();
const hotelController = require('../controllers/hotelController');
const { isPublic, isPrivate } = require('../middlewares/checkAuth.js');

// GET home route
router.get('/', isPublic, (req, res) => {
    res.render('home', { title: 'Find the perfect hotel at an affordable price!'});
});

// GET about route
router.get('/about', isPublic, (req, res) => {
    res.render('about', {title: 'About'});
});

module.exports = router;