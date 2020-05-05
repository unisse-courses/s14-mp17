const bookingModel = require('../models/bookingModel');

exports.getAllBookings = (req, callback) => {
    bookingModel.getAll({}, (bookings) => {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });

        callback(bookingObjects);
    });
};

exports.getAllAvailable = (hotelname, callback) => {
    const capacity = req.body.capacity;

    bookingModel.getAvailable({hotelname, capacity}, (err, bookings) => {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        
        callback(bookingObjects);
    })
}

exports.getUserBookings = (username, callback) => {
    bookingModel.getByUser(username, (err, bookings) => {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        
        callback(bookingObjects);
    });
};

exports.getBookingByName = (hotelname, callback) => {
    bookingModel.getByHotel(hotelname, (err, bookings) => {
        if(err) throw err;
        const bookingObjects = [];
        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        callback(bookingObjects);
    });
};