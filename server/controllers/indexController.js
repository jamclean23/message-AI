// Controller for requests to the index route


// ====== IMPORTS ======

// Functions
const getUserRooms = require('../functions/getUserRooms');
const getUserInvitesById = require('../functions/getUserInvitesById');
const findUserById = require('../functions/findUserById.js');
const getRoomById = require('../functions/getRoomById.js');

// Mongoose
const mongoose = require('mongoose');


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


async function acceptInvite (req, res) {
    const roomId = req.params.roomId;
    const userId = req.user._id;

    const user = await findUserById(userId);
    const room = await getRoomById(roomId);

    let userHasRoom = false;
    user.rooms.forEach((room) => {
        if (room._id.toString() === roomId) {
            userHasRoom = true;
        }
    });

    let roomHasUser = false;
    room.users.forEach((user) => {
        if (user.toString() === userId) {
            roomHasUser = true;
        }
    });

    try {
        
        if (!(userHasRoom)) {
            user.rooms.push(new mongoose.Types.ObjectId(roomId));
            await user.save();
        }
        
        if (!(roomHasUser)) {            
            room.users.push(new mongoose.Types.ObjectId(userId));
            await room.save();
        }

        res.status(200).json({
            msg: 'Invite Accepted',
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
    ignoreInvite,
    acceptInvite
}