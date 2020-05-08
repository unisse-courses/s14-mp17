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

exports.getAllAvailable = function(req, res) {
    bookingModel.getAvailable({ hotelname: req.body.hotelname, capacity: req.body.capacity, status: 'Available' }, function(err, bookings) {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        
        res.render('searchresults', { bookings });
    });
};

exports.getUserBookings = function(req, res) {
    const username = req.session.name;

    bookingModel.getByUser(username, function(err, bookings) {
        res.render('usermanagebooking', { title: 'Dashboard: Manage Your Bookings', bookings: bookings });
    });
};

exports.getBookingByName = function(req, res) {
    const hotelname = req.body.hotelSearch;

    bookingModel.getByHotel(hotelname, function(bookings) {
        res.send(bookings);
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

exports.searchBooking = function(req, res) {
    bookingModel.search(req.body.userSearchID, function(result) {
        res.send(result);
    })
}
