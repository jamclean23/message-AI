// Controller for requests to the index route


// ====== IMPORTS ======

const getUserRooms = require('../functions/getUserRooms');


// ====== FUNCTIONS ======

async function testIndexRoute (req, res) {
    const userRooms = await getUserRooms(req.user._id);
    res.render('index', { rooms: userRooms });
}


// ====== EXPORTS ======

module.exports = {
    testIndexRoute,
}