// Retrieve room object from database


// ====== IMPORTS ======

const Room = require('../models/room.js').model;


// ====== FUNCTIONS ======

/**
 * 
 * @param {String} id - Id of room entry 
 * @returns Room object || null
 */
async function getRoomById (id) {
    if (id) {
        try {
            const room = await Room.findById(id)
            return room;
        } catch (err) {
            console.log(err);
            return {};
        }
    } else {
        return {};
    }
}


// ====== EXPORTS ======

module.exports = getRoomById;