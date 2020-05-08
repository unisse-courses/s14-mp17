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
exports.getAll = function(next) {
    hotelModel.find({}).exec(function(result) {
        if (err) throw err;

        const hotelObjects = [];

        result.forEach(function(doc) {
            hotelObjects.push(doc.toObject());
        });

        next(hotelObjects);
    });
};

// search a hotel
exports.search = function(query, next) {
    hotelModel.find(query, function(err, hotels) {
        var hotelObjects = [];
        result.forEach(function(doc) {
            hotelObjects.push(doc.toObject());
        });
        next(hotelObjects);
    });
};