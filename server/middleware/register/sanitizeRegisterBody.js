// Validation array


// ====== IMPORTS ======

const { check } = require('express-validator');



// ====== FUNCTIONS ======

const reqKeyValidate = [
    check('email', 'Email not valid').isEmail().trim().escape(),
    check('username', 'Username not valid').trim().escape(),
    check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
]


// ====== EXPORTS ======

module.exports = reqKeyValidate;