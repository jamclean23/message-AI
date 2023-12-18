// Entry express server file for messenger-AI


// ====== IMPORTS ======

// System
const path = require('path');

// Sockets
const socketIO = require('socket.io');
const socketInit = require('./functions/socketInit.js');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../config/.env')
});

// App
const app = require('./app.js');

// Functions
const appListenerCb = require('./functions/appListenerCb.js');


// ====== GLOBAL VARS ======

const PORT = 5555;


// ====== MAIN ======

// REST Server
const server = app.listen(PORT, (err) => {
    appListenerCb(err, server.address().port);
});

// Socket.io Server
socketInit(socketIO(server));
