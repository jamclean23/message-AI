// Controller for chat routes


// ====== IMPORTS ======

const addRoom = require('../functions/addRoom.js');


// ====== FUNCTIONS ======

function chatPage (req, res) {
    res.render('chat');
}

async function startChat (req, res) {
    await addRoom(req.user._id);    
    res.redirect('/chat');
}


// ====== EXPORTS ======

module.exports = {
    chatPage,
    startChat
}