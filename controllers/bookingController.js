const bookingModel = require('../models/bookingModel');

exports.getAllBookings = (req, res) => {
    bookingModel.getAll({}, (bookings) => {
        res.render('bookings', {
            title: 'Bookings', bookings: bookings
        });
    });
};