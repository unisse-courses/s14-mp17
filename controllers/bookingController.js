const bookingModel = require('../models/bookingModel');

exports.getAllBookings = (req, res) => {
    bookingModel.getAll({}, (bookings) => {
        res.render('bookings', {
            title: 'Bookings', bookings: bookings
        });
    });
};

exports.getUserBookings = (user, callback) => {
    bookingModel.getUserBookings(user, (err, bookings) => {
        if(err) throw err;
        const bookingObjects = [];
        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        callback(bookingObjects);
    });
};