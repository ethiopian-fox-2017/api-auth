var express = require('express');
var router = express.Router();
var control = require('../controllers/userControllers')
var auth = require('../helpers/jwtHelpers')

/* GET home page. */
router.get('/',function(req, res) {
  res.send('Welcome, for further information please visit : https://github.com/anthonyjuan/api-auth')
})
router.get('/api/users', auth.adminOnly, control.getUsers);
router.post('/api/users', auth.adminOnly,  control.postUser);
router.get('/api/users/:id', auth.allUser, control.getUser);
router.delete('/api/users/:id', auth.adminOnly, control.deleteUser);
router.put('/api/users/:id', auth.allUser, control.updateUser);
router.post('/api/signup', control.postUser);
router.post('/api/signin', control.signin);



module.exports = router;
