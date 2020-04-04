const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/hotelmedb';

const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(databaseURL, options);

const hotelSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    description: { type: String },    
    contactNumber: { type: String },
    maxCapacity: { type: Number },
    price: { type: Number },
    amenities: { type: Array }
});

const hotels = mongoose.model('hotels', hotelSchema);

//export the model as the main content of the module
module.exports = hotels;