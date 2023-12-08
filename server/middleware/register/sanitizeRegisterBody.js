// Validation array


// ====== IMPORTS ======

const { check } = require('express-validator');



// ====== FUNCTIONS ======

const reqKeyValidate = [
    check('username', 'username not valid').trim().escape(),
    check('email', 'email not valid').isEmail().trim().escape(),
]


// ====== EXPORTS ======

module.exports = reqKeyValidate;