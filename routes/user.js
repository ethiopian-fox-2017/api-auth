var express = require('express');
var app = express.Router()
var User = require('../controllers/user')

app.get('/', User.getAllUser)
app.post('/', User.create)
app.get('/:id', User.getSingleUser)
app.delete('/:id', User.deleteUser)
app.put('/:id', User.updateUser)

module.exports = app
