// Route for '/login' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/loginController');


// ====== ROUTES ======

router.get('/', controller.loginPage);


// ====== EXPORTS ======

module.exports = router;