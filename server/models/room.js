// Schema for user authentication pairs

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "users" },
    content: {
        type: String,
        required: true
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
        default: 'New Chat ' + Date.now(),
    }
});

const Room = {
    model: new mongoose.model('rooms', roomSchema),
    schema: messageSchema
};


// ====== EXPORTS ======

module.exports = Room;