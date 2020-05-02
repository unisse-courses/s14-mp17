const mongoose = require('./connection');

const bookingSchema = new mongoose.Schema({
    id: { type: Int32Array },
    name: { type: String, required: true },
    username: { type: String, required: true },
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
        var bookingObjects = [];
        result.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        next(bookingObjects);
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
exports.updateBooking = function(filter, update, options) {
    bookingModel.findOneAndUpdate(filter, update, options, function(err, result) {
        next(err, result);
    });
};

// delete a booking
exports.deleteBooking = function(filter, next) {
    bookingModel.deleteOne(filter, function(err, result) {
        next(err, result);
    });
};