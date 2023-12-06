// Controller for requests to register route


// ====== IMPORTS ======

// Functions
const addUser = require('../functions/server/addUser.js');


// ====== FUNCTIONS ======

function registerPage (req, res) {
    res.render('register');
}

async function processRegister (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    await addUser(req.body.username, req.body.password);
    res.redirect('/login');
}


// ====== EXPORTS ======

module.exports = {
    registerPage,
    processRegister
}