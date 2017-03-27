var express = require('express');
var app = express.Router()
var helper = require('../helpers')

app.post('/login', helper.login)

module.exports = app
