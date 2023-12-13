// Gets the rooms a user is in


// ====== IMPORTS ======

const User = require('../models/user.js');

// ====== FUNCTIONS ======

/**
 * 
 * @param {*} id - The user's id
 * @returns Object containing room ids
 */
async function getUserRooms (id) {
    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (user) {
        return user.rooms;
    } else {
        return {};
    }
}

// ====== EXPORT ======

module.exports = getUserRooms;