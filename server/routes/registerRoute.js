// Route for '/register' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/registerController');


// ====== ROUTES ======

router.get('/', controller.registerPage);


// ====== EXPORTS ======

module.exports = router;