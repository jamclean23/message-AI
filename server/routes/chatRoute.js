// Route for chat requests


// ====== IMPORTS ======

// Express
const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/chatController.js');

// ====== ROUTES ======

router.get('/start_chat', controller.startChat);
router.get('/room_obj/:roomId', controller.getRoomObj);
router.get('/:roomId', controller.chatPage);

router.post('/send_invite/:recipient', controller.sendInvite);

// router.post('/new_message/:roomId', controller.addMessage);

// ====== EXPORTS ======

module.exports = router;