const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const jwt = require('../helpers/jwt')
require('dotenv').config()

/* GET All users. */
router.get('/users', jwt.verifyAdmin, controller.getAll);

/* GET single user */
router.get('/users/:id', jwt.verify, controller.getOneUser)

/* POST create a user */
router.post('/users', jwt.verifyAdmin, controller.newUser)

/* DELETE a user */
router.delete('/users/:id', jwt.verifyAdmin, controller.deleteUser)

/* PUT update a user with new info */
router.put('/users/:id', jwt.verify , controller.updateUser)

/* POST Signup User */
router.post('/signup', controller.signUpUser)

/* POST get user sign in data */
router.post('/signin', controller.signInUser)

module.exports = router;
