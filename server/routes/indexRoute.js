// Route for '/' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/indexController.js'); 


// ====== ROUTES ======

router.get('/', controller.testIndexRoute);

router.post('/accept_invite/:roomId', controller.acceptInvite);

router.delete('/ignore_invite/:roomId', controller.ignoreInvite);


// ====== EXPORTS ======

module.exports = router;