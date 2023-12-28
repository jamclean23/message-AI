// Schema for user invite


// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const inviteSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    chatName: {
        type: String,
        required: true
    },
    roomId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});


// ====== EXPORTS ======

