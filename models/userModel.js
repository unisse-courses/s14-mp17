const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },    
    password: { type: String, min: 8, required: true },
});

const userModel = mongoose.model('users', userSchema);

// get all users from the collection
exports.getAll = function(sort, next) {
    userModel.find({}).sort(sort).exec(function(err, result) {
        var userObjects = [];
        result.forEach(function(doc) {
            userObjects.push(doc.toObject());
        });
        next(userObjects);
    });
};

// create a user
exports.create = function(obj, next) {
    const user = new userModel(obj);
    user.save(function(err, user) {
        next(err, user);
    });
};

// retrieving a user based on ID
exports.getById = function(id, next) {
    userModel.findById(id, function(err, user) {
        next(err, user);
    });
};
  
// retrieving just ONE user based on a query (first one)
exports.getOne = function(query, next) {
    userModel.findOne(query, function(err, user) {
        next(err, user);
    });
};

// search a user
exports.search = function(query, next) {
    userModel.find(query, function(err, result) {
        var userObjects = [];
        result.forEach(function(doc) {
            userObjects.push(doc.toObject());
        });

        next(userObjects);
    });
};

// update a user
exports.update = function(filter, update, options) {
    userModel.findOneAndUpdate(filter, update, options, function(err, result) {
        next(err, result);
    });
};

// delete a user
exports.delete = function(filter, next) {
    userModel.deleteOne(filter, function(err, result) {
        next(err, result);
    });
};