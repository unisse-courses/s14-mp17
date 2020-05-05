const bookingModel = require('../models/bookingModel');

exports.getAllAvailable = (query, callback) => {
    bookingModel.getAvailable(query, (err, bookings) => {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });

        callback(bookingObjects);
    });
};