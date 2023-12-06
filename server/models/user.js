// Schema for user authentication pairs

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
});

const User = new mongoose.model('users', userSchema);


// ====== EXPORTS ======

module.exports = User;