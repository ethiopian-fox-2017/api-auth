var express = require('express');
var router = express.Router();
var usercontroler=require('../../controlers/users');
var auth=require('../../helper/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users',usercontroler.getusers)
router.get('/users/:id',auth.authuser,usercontroler.getuser)
router.post('/users',usercontroler.insertUser)
router.delete('/users/:id',usercontroler.deleteUser)
router.put('/users/:id',usercontroler.updateUser)


module.exports = router;
