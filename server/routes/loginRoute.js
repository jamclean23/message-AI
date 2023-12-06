// Route for '/login' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/loginController');


// ====== ROUTES ======


function init (passport) {
    router.get('/', controller.loginPage);
    router.post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    return router;
}
// ====== EXPORTS ======

module.exports = {
    init
};