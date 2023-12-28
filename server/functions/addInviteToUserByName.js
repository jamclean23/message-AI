// Gets the rooms a user is in


// ====== IMPORTS ======

const findUserByName = require('./findUserByName.js');
const getRoomById = require('./getRoomById.js');

// ====== FUNCTIONS ======

/**
 * 
 * @param {String} name - The user's name who will recieve the invite
 * @param {String} roomId - The roomId of the chat the recipient is to be invited to
 * @returns String 'Success' or null if failed
 */
async function addInviteToUserByName (sender, recipient, roomId) {

    // Ensure arguments were given
    if (!sender || !recipient || !roomId) {
        return null;
    }

    // Find the recipient
    let user;
    try {
        user = await findUserByName(recipient);
    } catch (err) {
        console.log(err);
    }

    // If user exists, then add the invite
    if (user) {

        // Get name of the room
        let chatName;
        try {
            const result = await getRoomById(roomId);
            chatName = result.name;
            console.log(chatName);
        } catch (err) {
            console.log(err);
            return null;
        }

        user.invites.push({
            sender,
            chatName,
            roomId
        });

        try {
            await user.save();
            return 'Success';
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

// ====== EXPORT ======

module.exports = addInviteToUserByName;