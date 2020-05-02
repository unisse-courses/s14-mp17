const mongoose = require('./connection');

const bookingSchema = new mongoose.Schema({
    id: { type: Int32Array },
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'hotelModel', required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
    checkIn: { type: Date, required: true },    
    checkOut: { type: Date, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Available', 'Taken'], default: 'Available' },
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

// create a booking
exports.createBooking = function(obj, next) {
    const booking = new bookingModel(obj);

    booking.save(function(err, booking) {
        next(err, booking);
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