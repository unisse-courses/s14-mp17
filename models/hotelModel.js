const mongoose = require('./connection');

const hotelSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    description: { type: String },    
    contactNumber: { type: String },
    maxCapacity: { type: Number },
    price: { type: Number },
    amenities: { type: Array },
    img: { type: String }
});

const hotelModel = mongoose.model('hotels', hotelSchema);

module.exports = hotelModel;

// get all hotels from the collection
exports.getAll = function(sort, next) {
    hotelModel.find({}).sort(sort).exec(function(err, result) {
        if(err) throw err;

        var hotelObjects = [];
        result.forEach(function(doc) {
            hotelObjects.push(doc.toObject());
        });

        next(hotelObjects);
    });
};

// search a hotel
exports.searchHotel = function(query, next) {
    hotelModel.find(query, function(err, hotels) {
        if(err) throw err;

        var hotelObjects = [];
        result.forEach(function(doc) {
            hotelObjects.push(doc.toObject());
        });

        next(hotelObjects);
    });
};