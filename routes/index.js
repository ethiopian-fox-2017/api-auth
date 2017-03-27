var express = require('express');
var app = express.Router()
var helper = require('../helpers')

app.post('/signin', helper.signin)
app.post('/signup', helper.signup)
// app.post('/verify', helper.verify)

module.exports = app
