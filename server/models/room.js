// Schema for user authentication pairs

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const messageSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.ObjectId, ref: "users"
    },
    username: { 
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isGpt: {
        type: Boolean,
        default: false
    },
    prompt: {
        type: String,
        default: ''
    }
});

const roomSchema = new mongoose.Schema({
    users: [
                {
                    type: mongoose.Schema.ObjectId, ref: "users"
                }
    ],
    messages: [messageSchema],
    name: {
        type: String,
        default: 'New Chat ' + new Date(Date.now()),
    }
});

const Room = {
    model: new mongoose.model('rooms', roomSchema),
    schema: messageSchema
};


// ====== EXPORTS ======

module.exports = Room;