const mongoose = require('./connection');

const bookingSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    checkIn: { type: Date, required: true },    
    checkOut: { type: Date, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, required: true },
    price: { type: String, required: true }
});

const bookingModel = mongoose.model('bookings', bookingSchema);

exports.getAll = function(query, next) {
    bookingModel.find({ }).exec(function(err, bookings) {
        if (err) throw err;
        const bookingObjects = [];
        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        next(err, bookingObjects);
    });
};

exports.getAvailable = function(query, next) {

    bookingModel.find({ hotelname: query, status: 'Available' }).exec(function(err, bookings) {
        if(err) throw err;
        const bookingObjects = [];
        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        next(err, bookingObjects);
    });
};

exports.getByUser = function(username, next) {
    bookingModel.find({ username: username }, function(err, bookings) {
        if (err) throw err;
        const bookingObjects = [];
        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        next(err, bookingObjects);
    });
};

exports.getByHotel = function(hotelname, next) {
    bookingModel.find({ status: 'Available' }).sort({name: 1}).exec(function(err, bookings) {
        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        
        next(err, bookingObjects);
    });
};

exports.searchName = function(hotelname, next) {
    bookingModel.find({ hotelname: hotelname }, function(err, bookings) {
        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });

        next(err, bookingObjects);
    });
}

exports.searchId = function(booking_id, next) {
    bookingModel.findOne({_id: booking_id}, function(err, bookings) {
        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });

        next(err, bookingObjects);
    });
};

exports.updateBooking = function(booking_id, update_query) {
    bookingModel.findOneAndUpdate({_id: booking_id}, update_query, function(err, result) {
        next(err, result);
    });
};

exports.deleteBooking = function(booking_id, next) {
    bookingModel.deleteOne({_id: booking_id}, function(err, result) {
        next(err, result);
    });
};