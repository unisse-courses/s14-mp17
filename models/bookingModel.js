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

// get booking by username
exports.getByUser = (username, next) => {
    bookingModel.find({ username: username }, (err, bookings) => {
        if (err) throw err;
        next(err, bookings);
    });
};

// get booking by hotel name
exports.getByHotel = (name, next) => {
    bookingModel.find({ name: name }, (err, bookings) => {
        next(err, bookings);
    });
};