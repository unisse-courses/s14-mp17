const bookingModel = require('../models/bookingModel');

exports.getAllBookings = (req, callback) => {
    bookingModel.getAll({ name: 1 }, (bookings) => {
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

    console.log('marker1');
    bookingModel.getAvailable({hotelname, capacity, status: 'Available'}, (err, bookings) => {
        if (err) throw err;
        console.log('marker2');
        res.render('searchresults', { bookings });
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