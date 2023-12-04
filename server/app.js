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

// Custom Middleware
const testLog = require('./middleware/testLog.js');

// Routes
const indexRoute = require('./routes/indexRoute.js');


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


// ====== EXPORTS ======

module.exports = app;