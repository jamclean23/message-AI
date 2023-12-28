// Controller for requests to the index route


// ====== IMPORTS ======

const getUserRooms = require('../functions/getUserRooms');
const getUserInvitesById = require('../functions/getUserInvitesById');


// ====== FUNCTIONS ======

async function testIndexRoute (req, res) {
    let userRooms = [];
    try {
        userRooms = await getUserRooms(req.user._id);
    } catch (err) {
        console.log(err);
    }

    let userInvites = [];
    try {
        userInvites = await getUserInvitesById(req.user._id);
    } catch (err) {
        console.log(err);
    }


    res.render('index', {
        rooms: userRooms,
        invites: userInvites
    });
}


// ====== EXPORTS ======

module.exports = {
    testIndexRoute,
}