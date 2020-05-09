const bookingModel = require('../models/bookingModel');

// get all bookings
exports.getAllBookings = function(req, res) {
    const username = req.session.name;
    bookingModel.getAll(username, function(err, bookings) {
        res.render('adminmanagebooking', { title: 'Manage Users Bookings', bookings: bookings });
    });
};

// get only available bookings given a hotel
exports.getAllAvailable = function(req, res) {
    const hotelname = req.body.hotelname;

    bookingModel.getAvailable(hotelname, function(err, bookings) {
        res.render('searchresults', { title: 'Search Results', bookings: bookings });
    });
};

exports.getUserBookings = function(req, res) {
    const username = req.session.name;
    bookingModel.getByUser(username, function(err, bookings) {
        res.render('usermanagebooking', { title: 'Dashboard: Manage Your Bookings', bookings: bookings });
    });
};

exports.searchBooking = function(req, res) {
    const booking_id = req.body.userSearchID;
    bookingModel.search(booking_id, function(err, booking) {
        res.send(booking);
    });
};

exports.getBookingByHotel = function(req, res) {
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
