const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user schema
const userSchema = mongoose.Schema({
    // fields of the user document
    name: { type: String, required: true},
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
});

// enable the user to be used in external functions
const User = module.exports = mongoose.model('User', userSchema);

// gets user by the id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

// gets user by the email
module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}; // query to equate email to db username
    User.findOne(query, callback);
}

// adds data to db
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;  // this is the hashed password
            // saves to db
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

