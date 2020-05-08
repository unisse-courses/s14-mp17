const bookingModel = require('../models/bookingModel');

exports.getAllBookings = (req, res) => {

    bookingModel.getAll({ name: 1 }, function(bookings) {
        res.render('adminmanagebooking', { title: 'Manage Users Bookings', bookings: bookings });
    });
};

exports.getAllAvailable = function(req, res) {
    const hotelname = req.body.hotelname;
    const capacity = req.body.capacity;
    const status = 'status: Available';

    const query = hotelname + ", " + capacity + ", " + status;

    bookingModel.getAvailable(query, function(err, bookings) {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });
        
        res.render('searchresults', { title: 'Search Results', bookings: bookings });
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
