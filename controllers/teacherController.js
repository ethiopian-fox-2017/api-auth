'use strict'

const password = require('password-hash');
const jwt = require('jsonwebtoken');
let models = require('../models');
require('dotenv').config()

let getAll = function (req, res, next) {
    models.Teacher.findAll()
      .then(function (instances) {
        res.send(instances);
      })
      .catch((err)=>{
        res.send(err);
      })
}

let getById = function (req, res, next) {
  models.Teacher.findOne({
    where: {id: req.params.id}
  })
    .then((instance)=>{
      res.send(instance);
    })
    .catch((err)=>{
      res.send(err);
    })
}

let signUp = function (req, res, next) {
 // Creating hash
 let hashPassword = password.generate(req.body.password);
 models.Teacher.create({
   name: req.body.name,
   username: req.body.username,
   password: hashPassword,
   role: 'teacher'
 })
   .then((instance)=>{
     res.send(instance);
   })
   .catch((err)=>{
     res.send(err);
   });
}

let signIn = function (req, res, next) {
  models.Teacher.findOne({
    where: {username: req.body.username}
  })
  .then((instance)=>{
    let isVerify = password.verify(req.body.password, instance.password);
    if(isVerify){
      let token = jwt.sign({
        username: instance.username,
        name: instance.name,
        role: instance.role
      },
    process.env.SECRET,
    {expiresIn: '1h'});
      res.send(token);
    } else {
      res.send("User name or password invalid!");
    }
  })
}

let createAdmin = function (req, res, next) {
  let hashPassword = password.generate(req.body.password);
  models.Teacher.create({
    name: req.body.name,
    username: req.body.username,
    password: hashPassword,
    role: 'admin'
  })
    .then((instance)=>{
      res.send(instance);
    })
    .catch((err)=>{
      res.send(err);
    })
}

let deleteOne = function (req, res, next) {
  models.Teacher.destroy({
    where: {id: req.params.id}
  })
    .then(()=>{
      res.send("deleted");
    })
    .catch((err)=>{
      res.send(err);
    })
}

let updateOne = function (req, res, next) {
  models.Teacher.update(req.body, {
    where: {id: req.params.id}
  })
    .then((instance)=>{
      res.send(instance);
    })
    .catch((err)=>{
      res.send(err);
    })
}

module.exports = {
  getAll,
  getById,
  createAdmin,
  deleteOne,
  updateOne,
  signUp,
  signIn
}
