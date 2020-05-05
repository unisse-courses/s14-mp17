const mongoose = require('./connection');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    checkIn: { type: Date, required: true },    
    checkOut: { type: Date, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, required: true },
    price: { type: String, required: true }
});

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;

// get all bookings from the collection
exports.getAll = function(sort, next) {
    bookingModel.find({}).sort(sort).exec(function(err, result) {
        next(result);
    });
};

// get all available bookings
exports.getAvailable = function(query, next) {

    bookingModel.find({ query, status: 'Available'}).exec(function(err, result) {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        
        next(err, result);
    });
};

// get booking by username
exports.getByUser = (username, next) => {
    bookingModel.find({ username: username }, (err, bookings) => {
        next(err, bookings);
    });
};

// get booking by hotel name
exports.getByHotel = (hotelname, next) => {
    bookingModel.find({ hotelname: hotelname }).sort({name: 1}).exec(function(err, bookings) {
        next(err, bookings);
    });
};

// search a booking
exports.searchBooking = function(query, next) {
    bookingModel.find(query, function(err, bookings) {
        var bookingObjects = [];
        result.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });

        next(bookingObjects);
    });
};

// update a booking
exports.updateBooking = function(booking_id, update_query) {
    bookingModel.findOneAndUpdate(booking_id, update_query, function(err, result) {
        next(err, result);
    });
};

// delete a booking
exports.deleteBooking = function(booking_id, next) {
    bookingModel.findByIdAndDelete(booking_id, function(err, result) {
        next(err, result);
    });
};