var express = require('express');
var router = express.Router();
var db = require('../models');
var controller = require('../controller/users')
var helpers = require('../helpers/index')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/signup',helpers.verify, controller.addnew)

router.post('/api/login', helpers.login)

router.get('/api/users', helpers.verify_admin, controller.getAll)

router.get('/api/users/:id', helpers.verify, controller.getOne)

router.post('/api/users', helpers.verify_admin, controller.addnew)

router.delete('/api/users/:id', helpers.verify_admin, controller.deleteUser)

router.put('/api/users/:id', helpers.verify, controller.updateUser)

module.exports = router;
