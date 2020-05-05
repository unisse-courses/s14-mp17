const mongoose = require('./connection');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    checkIn: { type: Date, required: true },    
    checkOut: { type: Date, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, required: true },
    price: { type: String, required: true }
});

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;

exports.getAvailable = function(query, next) {
    bookingModel.find({query}).exec((err, booking) => {
        if(err) throw err;

        const bookingObjects = [];

        bookings.forEach(function(doc) {
            bookingObjects.push(doc.toObject());
        });

        next(err, booking);
    });
};