var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var helper = require('../helpers/auth');

router.get('/', helper.adminAuthorized, userController.getAll)
  .get('/:id', helper.allAuthorized, userController.getOne)
  .post('/', helper.adminAuthorized, userController.postCreate)
  .delete('/:id', helper.adminAuthorized, userController.deleteOne)
  .put('/:id', helper.allAuthorized, userController.putUpdate)
  .patch('/:id', helper.allAuthorized, userController.patchUpdate)

module.exports = router;
