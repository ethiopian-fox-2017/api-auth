var express = require('express');
var router = express.Router();
var db = require('../models');
var control = require('../controller/controller');
var aut = require('../autentikasi/auths');
var jwt = require('jsonwebtoken');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/signup', control.getSignUp);

router.post('/signin', control.getLogin);

router.get('/users', aut.justAdmin, control.getUser);

// router.get('/users', control.getUser);

router.get('/users/:id', aut.adminAuth, control.getUserById);

router.post('/users', aut.justAdmin, control.createUser);

router.delete('/users/:id', aut.justAdmin, control.deleteUser);

router.put('/users/:id', aut.adminAuth, control.updateUser);

module.exports = router;
