'use strict';
var User = require('../models').User;
var passHash = require('password-hash');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var user = {};
user.findAll = function(req,res,next) {
  User.findAll({order: [['id', 'ASC']]})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send(err)
  })
}

user.findOne = function(req,res,next) {
  User.findById(req.params.id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send(err)
  })
}

user.create = function(req,res,next) {
  let password = passHash.generate(req.body.password);
  User.create({
    name: req.body.name,
    role : req.body.role,
    password: password
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send(err)
  })
}

user.update = function(req,res,next) {
  User.update(req.body,{where:{id:req.params.id}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send(err)
  })
}

user.delete = function(req,res,next) {
  User.destroy({where:{id:req.params.id}})
  .then(() => {
    res.send('deleted');
  })
  .catch(err => {
    res.send(err)
  })
}

user.signup = function(req,res,next) {
  let password = passHash.generate(req.body.password);
  User.create({
    name: req.body.name,
    role: "user",
    password: password
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send(err)
  })
}

user.signin = function(req,res,next) {
  User.findOne({where: {name:req.body.name}})
  .then(user => {
    if(!user){
      res.send('invalid username')
    } else {
      // res.send(user)
      let userPassword = user.password;
      let status = passHash.verify(req.body.password, userPassword)
      if (status === true) {
        var token = jwt.sign({username:user.name,role:user.role}, process.env.SECRETKEYS);
        res.send(token)
      } else {
        res.send('invalid password')
      }
    }
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = user
