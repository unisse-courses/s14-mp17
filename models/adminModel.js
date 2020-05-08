const mongoose = require('./connection');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});

const adminModel = mongoose.model('admin', adminSchema);

exports.getOne = function(query, next) {
    adminModel.findOne(query, function(err, user) {
        next(err, user);
    });
};
