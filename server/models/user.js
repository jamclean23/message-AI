// Schema for user authentication pairs

// ====== IMPORTS ======

const mongoose = require('mongoose');

const inviteSchema = require('./schema/invite.js');

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
    }],
    invites: [
        inviteSchema
    ]

});

const User = new mongoose.model('users', userSchema);


// ====== EXPORTS ======

module.exports = User;