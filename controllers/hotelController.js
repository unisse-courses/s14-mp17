const hotelModel = require('../models/hotelModel');

exports.getAllHotels = function(req, res) {
    hotelModel.getAll({name: 1}, function(hotels) {
        res.render('home');
    });
};

exports.searchHotel = function(req, res) {
    var pattern = '^' + req.body.name;
    var query = { name: {$regex: pattern } };
    hotelModel.search(query, function(hotels) {
        res.send(hotels);
    });
};