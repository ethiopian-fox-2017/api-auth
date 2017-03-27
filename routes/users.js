var express = require('express');
var router = express.Router();
var db = require('../models');
var userController = require('../controller/user-controller')
var verifier = require('../helpers/jwt')


/* GET users listing. */
router.post('/signin' ,userController.signInUser)

router.post('/signup', userController.signUpUser)

router.get('/users', verifier, userController.getAllUser);

router.get('/users/:id', verifier, userController.getOneUser)

router.post('/users', verifier,userController.createUser)

router.delete('/users/:id', verifier,userController.deleteUser)

router.put('/users/:id', verifier,userController.updateUser)


module.exports = router;
