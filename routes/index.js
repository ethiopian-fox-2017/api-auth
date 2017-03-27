var express = require('express');
var router = express.Router();
let crypto = require('crypto');
let shortid = require('short-id');
var usercontroler=require('../controlers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup',usercontroler.insertUser);
router.post('/signin',usercontroler.signIn)

module.exports = router;
