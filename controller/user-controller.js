var express = require('express');
var db = require('../models');
var jwt = require('jsonwebtoken')
var passwordHash = require('password-hash')

var signUpUser = function(req, res) {
  db.User.create({
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    role: req.body.role
  })
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.send(err)
  })
}

var signInUser = function(req, res) {
  db.User.findOne({
    where: {username: req.body.username}
  })
  .then((user) => {
    var authorized = passwordHash.verify(req.body.password, user.password)
    if (authorized) {
      var token = jwt.sign({
        username: req.body.username,
        role: req.body.role
      }, process.env.SECRET_KEY)
      res.send(token)
    } else {
      res.send('Login failed')
    }
  })
  .catch((err) =>{
    res.send(err)
  })
}

var getAllUser = function(req, res) {
  if (req.decoded.role == 'admin') {
    db.User.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
  } else {
    res.send('Unauthorized')
  }
}

var getOneUser = function(req, res){
  if (req.decoded.role == 'admin' || req.decoded.role == 'user') {
    db.User.findOne({
      where: {id: req.params.id }
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
  } else {
    res.send('Unauthorized')
  }
}

var createUser = function(req, res){
  if (req.decoded.role == 'admin') {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    })
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
  } else {
    res.send('Unauthorized')
  }
}

var deleteUser = function(req, res) {
  if (req.decoded.role == 'admin') {
    db.User.destroy({
      where: {id: req.params.id}
    })
    .then((data)=>{
      res.send('User deleted')
    })
    .catch((err)=>{
      res.send(err)
    })
  } else {
    res.send('Unauthorized')
  }
}

var updateUser = function(req, res) {
  if (req.decoded.role == 'admin' || req.decoded.role == 'user') {
    db.User.update(
      {username: req.body.username,
        password: req.body.password},
        {where: {id: req.params.id}}
      )
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        res.send(err)
      })
  } else {
    res.send('Unauthorized')
  }
}





module.exports = {
  getAllUser, getOneUser, createUser, deleteUser, updateUser, signUpUser, signInUser
};
