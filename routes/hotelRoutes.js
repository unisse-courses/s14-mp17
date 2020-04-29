const router = require('express').Router();

// import the model
const hotelController = require('../controllers/hotelController');

// get all hotels
router.get('/', hotelController.getAllHotels);

// finds the hotels matching the name query from the collection
router.get('/search', hotelController.searchHotel);

module.exports = router;