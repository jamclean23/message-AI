// Main express app


// ====== IMPORTS ======

// System
const path = require('path');
const fs = require('fs');

// Express
const express = require('express');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../config/.env')
});

// Mongoose
const mongoose = require('mongoose');

// Custom Middleware
const testLog = require('./middleware/testLog.js');

// Routes
const indexRoute = require('./routes/indexRoute.js');


// ====== GLOBAL VARS / INIT ======

const app = express();


// ====== MIDDLEWARE ======

app.use(testLog);


// ====== ROUTES ======

app.use('/', indexRoute);


// ====== EXPORTS ======

module.exports = app;