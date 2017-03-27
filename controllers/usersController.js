var db = require('../models/index');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken')

var getAll = function (req, res, next) {
  db.User.findAll()
  .then((datas)=> {
    res.send(datas)
  })
  .catch((err)=> {
    res.send(err)
  })
}

var getOne = function(req, res, next) {
  db.User.findById(req.params.id)
  .then((data) => {
    res.send(data)
  })
  .catch((err)=> {
    res.send(err)
  })
}

var addOneUser = function(req, res, next) {
  db.User.create(req.body)
  .then((data) => {
    res.send(data)
  })
  .catch((err)=> {
    res.send(err)
  })
}

var deleteOneUser = function(req, res, next) {
  db.User.destroy({
    where: {id: req.params.id}
  })
    .then(()=> {
      res.send()
    })
    .catch((err)=> {
      res.send(err)
    })
}

var editOneUser = function(req, res, next) {
  db.User.update(req.body, {
    where: {id: req.params.id}
  })
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.send(err)
  })
}

var signup = function(req, res, next) {
  db.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    role: req.body.role
  })
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.send(err.message)
  })
}

var signin = function(req, res, next) {
  db.User.findOne({
      where: {username: req.body.username}
    })
  .then(function(user) {
    if(passwordHash.verify(req.body.password, user.password)){
      var token = jwt.sign(
      {
        username: user.username,
        role: user.role
      },
      'secret',
      {expiresIn: '1h'}
    )
      res.send(token)
    } else {
      res.send("INVALID PASSWORD")
    }
  })
  .catch((err) => {
    res.send("USERNAME DOESN'T EXIST")
  })
}



module.exports = {
  getAll,
  getOne,
  addOneUser,
  deleteOneUser,
  editOneUser,
  signup,
  signin
}
