// Add a users document to the database

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const User = require('../models/user.js');
const Room = require('../models/room.js').model;


// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======
/**
 * 
 * @param {String} creatorId - Id of user who is making the room
 */
async function addRoom  (creatorId) {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        const db = mongoose.connection;
        db.on('error', () => {
            throw new Error("Mongoose Connection Error");
        });
        
        const newRoom = new Room({
            users: [creatorId],
            messages: []
        });

        await newRoom.save();

        const user = await User.findById(creatorId.toHexString());

        user.rooms.push(newRoom._id);

        await user.save();

        return newRoom.id;
    } catch (err) {
        console.log(err);
    }
}


// ====== EXPORTS ======

module.exports = addRoom;