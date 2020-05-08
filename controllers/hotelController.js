const hotelModel = require('../models/hotelModel');

exports.getAllHotels = function(req, res) {
    const hotelname = req.body.hotelSearch;
    hotelModel.getAll(hotelname, function(err, hotels) {
        res.render('home', { title: 'Find your ideal hotel at an affordable price!', hotels: hotels });
    });
};

// exports.searchHotel = function(req, res) {
//     var pattern = '^' + req.body.name;
//     var query = { name: {$regex: pattern } };
//     hotelModel.search(query, function(hotels) {
//         res.send(hotels);
//     });
// };