var express = require('express');
var app = express.Router()
var User = require('../controllers/user')
var helper = require('../helpers')

app.get('/', helper.verifyAdmin ,User.getAllUser)
app.post('/', helper.verifyAdmin, User.create)
app.get('/:id', helper.verify, User.getSingleUser)
app.delete('/:id', helper.verifyAdmin , User.deleteUser)
app.put('/:id', helper. verify, User.updateUser)

module.exports = app
