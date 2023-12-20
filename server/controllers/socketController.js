// Functions that work with socket connections


// ====== IMPORTS ======

const addMessage = require('../functions/addMessage.js');


// ====== FUNCTIONS ======

function init (socket) {
    console.log('CLIENT CONNECTED:');
    console.log(socket.id);
    socket.on('message-from-client', handleNewMessage);
    socket.on('join', putUserInRoom);

    const io = this;

    async function handleNewMessage (messageObj) {
        console.log('ADDING MESSAGE TO ROOM: ' + messageObj.roomId);
    
        try {
            await addMessage(messageObj.roomId, messageObj.userId, messageObj.content, messageObj.username);
            messageObj.date = new Date(Date.now());
            io.in(messageObj.roomId).emit('to-client-message', messageObj);
        } catch (err) {
            console.log(err);
            socket.emit('error', err.message);
        }
    }
    
    async function putUserInRoom (roomId) {
        socket.join(roomId);
    }
}



// ====== EXPORTS ======

module.exports = {
    init
}