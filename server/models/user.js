// Schema for user authentication pairs

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rooms: [{
        type: mongoose.Schema.ObjectId, ref: "rooms"
    }]
});

const User = new mongoose.model('users', userSchema);


// ====== EXPORTS ======

module.exports = User;