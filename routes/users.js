var express = require('express');
var router = express.Router();
var db = require('../models/index');
var usersController = require('../controllers/usersController');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken')
var middleware = require('../helpers/authentication')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET ALL USER ( ACCESS LEVEL : ADMIN ONLY )
router.get('/users', middleware.authenticateAdmin, usersController.getAll)

//GET A SINGLE USER BASED ON ID
router.get('/users/:id', middleware.authenticateBoth, usersController.getOne)

//CREATE A USER ( ACCESS LEVEL : ADMIN ONLY )
router.post('/users', middleware.authenticateAdmin, usersController.addOneUser)

//DELETE A USER ( ACCESS LEVEL : ADMIN ONLY )
router.delete('/users/:id', middleware.authenticateAdmin, usersController.deleteOneUser)

//UPDATE A USER WITH NEW INFO
router.put('/users/:id', middleware.authenticateBoth, usersController.editOneUser)

//SIGN UP
router.post('/signup', usersController.signup)

//SIGN IN
router.post('/signin', usersController.signin)


module.exports = router;
