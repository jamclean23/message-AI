// Add message to a room db entry 


// ====== IMPORTS ======

const getRoomById = require('./getRoomById.js');


// ====== FUNCTIONS ======

/**
 * 
 * @param {string} roomId - Id of room db entry
 * @param {string} userId - Id of user db entry
 * @param {string} msg - Message to be added
 */
async function addMessage (roomId, userId, msg ) {
    if (!roomId || (typeof roomId != 'string')) {
        throw new Error('roomId not valid. roomId: ' + roomId);
    } else if (!userId || (typeof userId != 'string')) {
        throw new Error('userId not valid. userId: ' + userId);
    } else if (!msg || (typeof msg != 'string')) {
        throw new Error('msg not valid. msg: ' + msg);
    }

    let room;
    try {
        room = await getRoomById(roomId);
    } catch (err) {
        throw new Error(err);
    }

    if (room) {
        room.messages.push({
            user: userId,
            content: msg
        });
        try {
            room.save();
        } catch(err) {
            throw new Error(err);
        }
    } else {
        throw new Error('Room not found');
    }
}


// ====== EXPORTS ======

module.exports = addMessage;