var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.post('/signup', userController.registerUser)
  .post('/signin', userController.loginUser)

module.exports = router;
