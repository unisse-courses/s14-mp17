const bookingModel = require('../models/bookingModel');
const { validationResult } = require('express-validator');

exports.getAllBookings = function(req, res) {
    const hotelname = req.body.hotelname;
    bookingModel.getAll(hotelname, function(err, bookings) {
        res.render('adminmanagebooking', { title: 'Manage Users Bookings', bookings: bookings });
    });
};

exports.getUserBookings = function(req, res) {
    const username = req.session.name;
    bookingModel.getByUser(username, function(err, bookings) {
        res.render('usermanagebooking', { title: 'Dashboard: Manage Your Bookings', bookings: bookings });
    });
};

exports.searchBookingByName = function(req, res) {
    const hotelname = req.body.hotelname;
    console.log(hotelname);
    bookingModel.searchName(hotelname, function(err, bookings) {
        res.redirect('/searchresults');
    });
};

exports.searchBookingById = function(req, res) {
    const booking_id = req.body.bookingid;
    console.log(booking_id);
    bookingModel.searchId(booking_id, function(err, bookings) {
        res.send(bookings);
    });
};

// // get only available bookings given a hotel
// exports.getAllAvailable = function(req, res) {
//     const hotelname = req.body.hotelname;
//     bookingModel.getAvailable(hotelname, function(err, bookings) {
//         res.render('searchresults', { title: 'Search Results', bookings: bookings });
//     });
// };


// exports.searchBooking = function(req, res) {
//     const booking_id = req.body.userSearchID;
//     console.log(booking_id);
//     bookingModel.getByHotel(booking_id, function(err, bookings) {
//         res.render('usercreatebooking', { title: 'Search Results', bookings: bookings});
//     });
// };

// exports.getBookingByHotel = function(req, res) {
//     const hotelname = req.body.hotelsearch;
//     console.log(req.body);
//     bookingModel.getByHotel(hotelname, function(err, bookings) {
//         res.render('searchresults', { title: 'Search Results', bookings: bookings });
//     });
// };

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
