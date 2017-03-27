var express = require('express');
var router = express.Router();
var help = require('../helper/auth.js');


/* user controllers require */
var userControllers = require('../controllers/user.js')


/* GET users listing. */
router.get('/users', help.isAutheticated, userControllers.getAllData)

      .post('/signup', userControllers.signup)

      .post('/signin', userControllers.signin)

      .post('/users', help.isAutheticated,userControllers.insertData) //create user

      .get('/users/:id', help.isAutheticatedUser, userControllers.singleUser)

      .delete('/users/:id',help.isAutheticated, userControllers.deleteData) //delete user

      .put('/users/:id', help.isAutheticated, userControllers.updateData)



module.exports = router;
