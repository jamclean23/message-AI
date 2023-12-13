// Route for chat requests


// ====== IMPORTS ======

// Express
const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/chatController.js');

// ====== ROUTES ======

router.get('/start_chat', controller.startChat);
router.get('/', controller.chatPage);


// ====== EXPORTS ======

module.exports = router;