// Controller for requests to register route


// ====== IMPORTS ======

// Functions
const addUser = require('../functions/addUser.js');
const findUser = require('../functions/findUser.js');
const findUserByName = require('../functions/findUserByName.js');

// ====== FUNCTIONS ======

function registerPage (req, res) {
    res.render('register');
}

async function processRegister (req, res) {

    const existingUser = await findUser(req.body.email);
    const existingUsername = await findUserByName(req.body.username);


    if (existingUser) {
        res.render('register', {errorMessages: { "email": "Email taken" }});
    } else if (existingUsername) {
        res.render('register', {errorMessages: { "username": "Username taken" }});
    } else {
        await addUser(req.body.email, req.body.password, req.body.username);
        res.redirect('/login');
    }
}


// ====== EXPORTS ======

module.exports = {
    registerPage,
    processRegister
}