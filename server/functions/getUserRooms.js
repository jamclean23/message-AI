// Gets the rooms a user is in


// ====== IMPORTS ======

const User = require('../models/user.js');
const Room = require('../models/room.js').model;

// ====== FUNCTIONS ======

/**
 * 
 * @param {*} id - The user's id
 * @returns Object containing room ids
 */
async function getUserRooms (id) {
    let user;

    try {
        user = await User.findById(id.toHexString());
    } catch (err) {
        console.log(err);
    }

    if (user) {
        const rooms = [];
        for (let i = 0; i < user.rooms.length; i++) {
            rooms.push(await Room.findById(user.rooms[i]._id.toHexString()));
        }
        return rooms;
    } else {
        return {};
    }
}

// ====== EXPORT ======

module.exports = getUserRooms;