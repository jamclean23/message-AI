// Retrieve room object from database


// ====== IMPORTS ======

const Room = require('../models/room.js').model;


// ====== FUNCTIONS ======

async function getRoomById (id) {
    if (id) {
        try {
            const room = await Room.findById(id)
            console.log('ROOM: ');
            console.log(room);
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