// initialize mongodb connection through mongoose

const mongoose = require('mongoose');
//const { dbURL } = require('../config');
 const dbURL = "mongodb+srv://admin:1234@ccapdev-test-vqhod.mongodb.net/hotelmedb?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(dbURL, options);
console.log(mongoose.connection.readyState);

module.exports = mongoose;