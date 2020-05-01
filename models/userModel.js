const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },    
    password: { type: String, min: 8, required: true },
});

const userModel = mongoose.model('users', userSchema);

exports.getAll = function(sort, next) {
    userModel.find({}).sort(sort).exec(function(err, result) {
        var userObjects = [];
        result.forEach(function(doc) {
            userObjects.push(doc.toObject());
        });
        next(userObjects);
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

exports.update = function(filter, update, options) {
    userModel.findOneAndUpdate(filter, update, options, function(err, result) {
        next(err, result);
    });
};

exports.delete = function(filter, next) {
    userModel.deleteOne(filter, function(err, result) {
        next(err, result);
    });
};