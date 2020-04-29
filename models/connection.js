// initialize mongodb connection through mongoose

const mongoose = require('mongoose');
const { dbURL } = require('../config');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(dbURL, options);
console.log(mongoose.connection.readyState);

module.exports = mongoose;