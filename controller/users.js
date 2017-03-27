let db = require('../models');
let hash = require('password-hash')

let getAll = function(req, res) {
  db.User.findAll().then(function(users) {
    res.send(users)
  }).catch(function(err) {
    res.send(err)
  })
}

let getOne = function(req, res) {
  db.User.findById(req.params.id).then(function(data) {
    res.send(data)
  }).catch(function(err) {
    res.send(err)
  })
}

let addnew = function(req, res) {
  db.User.create({
    name      : req.body.name,
    email     : req.body.email,
    role      : req.body.role,
    password  : hash.generate(req.body.password)
  }).then(function(user) {
    res.send(user)
  }).catch(function(err) {
    res.send(err.message)
  })
}

let deleteUser = function(req, res) {
  db.User.destroy({
    where : {id : req.params.id}
  }).then(function() {
    res.send('Suscces')
  }).catch(function(err) {
    res.send(err)
  })
}

let updateUser = function(req, res) {
  db.User.update(req.body, {
    where : {id : req.params.id}
  }).then(function(data) {
    res.send(data)
  }).catch(function(err) {
    res.send(err)
  })
}

module.exports = {
  getAll : getAll,
  getOne : getOne,
  addnew : addnew,
  deleteUser : deleteUser,
  updateUser : updateUser
}