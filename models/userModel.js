const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },    
    password: { type: String, min: 8, required: true },
});

const userModel = mongoose.model('users', userSchema);

exports.getAll = function(query, next) {
    userModel.find({}).sort({ name: 1 }).exec( function(err, users) {

        const userObjects = [];

        users.forEach(function(doc) {
            userObjects.push(doc.toObject());
        });

        next(err, userObjects);
    });
};

exports.getOne = function(query, next) {
    userModel.findOne(query, function(err, user) {
        next(err, user);
    });
};

exports.getById = function(id, next) {
    userModel.findById(id, function(err, user) {
        next(err, user);
    });
};

exports.create = function(obj, next) {
    const user = new userModel(obj);
    user.save(function(err, user) {
        next(err, user);
    });
};

exports.search = function(query, next) {
    userModel.find(query, function(err, result) {
        
        var userObjects = [];
        result.forEach(function(doc) {
            userObjects.push(doc.toObject());
        });
        next(userObjects);
    });
};

// exports.delete = function(name, next) {
//     userModel.deleteOne(name, function(err, result) {
//         next(err, result);
//     });
// };