const mongoose = require('./connection');

const hotelSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    description: { type: String },    
    number: { type: String },
    capacity: { type: Number },
    price: { type: Number },
    amenities: { type: Array },
    img: { type: String }
});

const hotelModel = mongoose.model('hotels', hotelSchema);

// get all hotels from the collection
exports.getAll = function(query, next) {
    hotelModel.find({ }).exec(function(err, hotels) {

        const hotelObjects = [];

        hotels.forEach(function(doc) {
            hotelObjects.push(doc.toObject());
        });

        next(err, hotelObjects);
    });
};