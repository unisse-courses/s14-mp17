const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/hotelmedb';

const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String },    
    password: { type: String },
});

const users = mongoose.model('users', userSchema);

//export the model as the main content of the module
module.exports = users;