// Find a users document in the database

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const User = require('../models/user.js');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======
/**
 * 
 * @param {String} id - Id of user to be found
 */
async function findUserById  (userId) {
    let user = {};

    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        const db = mongoose.connection;
        db.on('error', () => {
            throw new Error("Mongoose Connection Error");
        });
        
        user = await User.findOne({ _id: userId });
    } catch (err) {
        console.log(err);
    }

    if (user) {
        return user;
    } else {
        return null;
    }
}


// ====== EXPORTS ======

module.exports = findUserById;