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

exports.getAllAvailable = (req, res) => {
    const hotelname = req.body.hotelname;
    const capacity = req.body.capacity;
    const status = 'status:' + 'Available';

    bookingModel.getAvailable({hotelname, capacity, status}, (err, bookings) => {
        if (err) throw err;
        res.render('searchresults', {title: 'Search Results', bookings});
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