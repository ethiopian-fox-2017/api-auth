'use strict'

const express = require('express');
const router = express.Router();
let models = require('../models');
let controllers = require('../controllers/teacherController');
let helpers = require('../helpers/authentication');

/* GET users listing. */
router.get('/users', helpers.authenticateAdmin, controllers.getAll);

router.get('/users/:id', helpers.authenticate, controllers.getById);

router.post('/users',helpers.authenticateAdmin, controllers.createAdmin);

router.delete('/users/:id',helpers.authenticateAdmin, controllers.deleteOne);

router.put('/users/:id', helpers.authenticate, controllers.updateOne);

router.post('/signup', controllers.signUp);

router.post('/signin', controllers.signIn);

module.exports = router;
