var express = require('express');
var router = express.Router();
var user = require("../controller/user.js");
var check = require("../helper/check.js");

/* GET users listing. */
router.post('/api/signup', user.signup);
router.post('/api/signin', user.signin);
router.get('/api/users', check.verifyAdmin, user.findAll);
router.get('/api/users/:id', check.verify, user.findOne);
router.post('/api/users', check.verifyAdmin, user.create);
router.delete('/api/users/:id', check.verifyAdmin, user.delete);
router.put('/api/users/:id', check.verify, user.update);


module.exports = router;
