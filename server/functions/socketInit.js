// Takes a socket is a parameter, initializes routes


// ====== IMPORTS ======

const controller = require('../controllers/socketController.js');

// ====== FUNCTIONS ======

/**
 * 
 * @param {Object} socket - The socket instance to be initialized 
 */
function init (io) {
    io.on('connection', controller.init);
}


// ====== EXPORTS ======

module.exports = init;