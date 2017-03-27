var express = require('express');
var app = express.Router()
var db = require('../models')
var methods  = {}

methods.getAllUser = function (req,res) {
  db.User.findAll()
  .then(function (data) {
    res.json(data)
  })
  .catch(function (err) {
    res.json(err)
  })
}

methods.create = function (req,res) {
  console.log(req.body);
  db.User.create(req.body)
  .then(function (data) {
    res.json(data)
  })
  .catch(function (err) {
    res.json(err)
  })
}

methods.getSingleUser = function (req,res) {
  db.User.findById(req.params.id)
  .then(function (data) {
    res.json(data)
  })
  .catch(function (err) {
    res.json(err)
  })
}

methods.deleteUser = function (req,res) {
  db.User.findById(req.params.id)
  .then(function (user) {
    user.destroy()
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      res.json(err)
    })
  })
  .catch(function (err) {
    res.json(err)
  })
}

methods.updateUser = function (req,res) {
  db.User.update(
    req.body,
    {where : {id : req.params.id}}
  ).then(function (data) {
    res.json(data)
  }).catch(function (err) {
    res.json(err)
  })
}

module.exports = methods
