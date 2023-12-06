// Main express app


// ====== IMPORTS ======

// System
const path = require('path');
const fs = require('fs');

// Express
const express = require('express');

// Cross origin
const cors = require('cors');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../config/.env')
});

// Mongoose
const mongoose = require('mongoose');

// Passport
const passport = require('passport');
require('./functions/server/initPassport.js').initialize(passport);


// Custom Middleware
const testLog = require('./middleware/testLog.js');

// Routes
const indexRoute = require('./routes/indexRoute.js');
const loginRoute = require('./routes/loginRoute.js').init(passport);
const registerRoute = require('./routes/registerRoute.js');
const fourOhFourRoute = require('./routes/fourOhFourRoute.js');

// ====== GLOBAL VARS / INIT ======

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ====== MIDDLEWARE ======

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(testLog);


// ====== ROUTES ======

app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use(fourOhFourRoute);

// ====== EXPORTS ======

module.exports = app;