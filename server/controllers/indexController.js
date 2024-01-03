// Controller for requests to the index route


// ====== IMPORTS ======

// Functions
const getUserRooms = require('../functions/getUserRooms');
const getUserInvitesById = require('../functions/getUserInvitesById');
const findUserById = require('../functions/findUserById.js');


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

async function ignoreInvite (req, res) {
    const roomId = req.params.roomId;
    const userId = req.user._id;

    const user = await findUserById(userId);
    console.log(user);
    const newInvitesArray = [];
    user.invites.forEach((invite) => {
        if (!(invite.roomId === roomId)) {
            newInvitesArray.push(invite);
        }
    });
    user.invites = newInvitesArray;

    try {
        await user.save();

        res.status(200).json({
            msg: 'Invite Ignored',
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: err,
            success: false
        });
    }

}


// ====== EXPORTS ======

module.exports = {
    testIndexRoute,
    ignoreInvite
}