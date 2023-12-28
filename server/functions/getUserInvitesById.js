// Gets the rooms a user is in


// ====== IMPORTS ======

const User = require('../models/user.js');
const Room = require('../models/room.js').model;

// ====== FUNCTIONS ======

/**
 * 
 * @param {*} id - The user's id
 * @returns Array containing invites objects
 */
async function getUserInvitesById (id) {
    let user;

    try {
        user = await User.findById(id.toHexString());
    } catch (err) {
        console.log(err);
    }
    
    if (user && user.invites) {
        return user.invites;
    } else {
        return [];
    }
}

// ====== EXPORT ======

module.exports = getUserInvitesById;