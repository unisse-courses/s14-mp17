const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/hotelmedb';

const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(databaseURL, options);

const bookingSchema = new mongoose.Schema({
    hotelName: { type: String },
    userName: { type: String },
    checkIn: { type: String },    
    checkOut: { type: String },
    capacity: { type: Number },
    status: { type: String },
    price: { type: String }
});

const bookings = mongoose.model('bookings', bookingSchema);

//export the model as the main content of the module
module.exports = bookings;