// Add message to a room db entry 


// ====== IMPORTS ======

const getRoomById = require('./getRoomById.js');


// ====== FUNCTIONS ======

/**
 * 
 * @param {string} roomId - Id of room db entry
 * @param {string} userId - Id of user db entry
 * @param {string} username - Username in db entry
 * @param {string} msg - Message to be added
 * @param {boolean} isGpt - If message is from chat gpt
 * @param {string} prompt - Prompt for gpt question
 */
async function addMessage (roomId, userId, msg, username, isGpt = false, prompt='') {
    console.log('USERNAME: ' + username);
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
            content: msg,
            username,
            isGpt,
            prompt
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