const bookingModel = require('../models/bookingModel');

exports.getAllAvailable = (req, res) => {
    const {
        hotelname,
        capacity
    } = req.body;

    bookingModel.getAvailable({hotelname, capacity, status: 'Available'}, (err, bookings) => {
        if(err) throw err;
        res.render('usercreatebooking', { title: 'Search Results', bookings: bookings.toObject() });
    });
};