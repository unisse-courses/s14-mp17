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

    bookingModel.getAvailable({hotelname, capacity, status: 'Available'}, (err, bookings) => {
        if (err) throw err;
        res.render('searchresults', { bookings });
        res.render('usercreatebooking', { bookings });
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

exports.createNewBooking = (update_query, callback) => {
    const booking_id = req.body.userSearchID;

    bookingModel.updateBooking(booking_id, update_query, (err, bookings) => {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });

        callback(bookingObjects);
    });
};