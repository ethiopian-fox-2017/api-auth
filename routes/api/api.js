var express = require('express');
var router = express.Router();
var usercontroler=require('../../controlers/users');
var auth=require('../../helper/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users',auth.authadmin,usercontroler.getusers)
router.get('/users/:id',auth.authuser,usercontroler.getuser)
router.post('/users',auth.authadmin,usercontroler.insertUser)
router.delete('/users/:id',auth.authadmin,usercontroler.deleteUser)
router.put('/users/:id',auth.authuser,usercontroler.updateUser)


module.exports = router;
