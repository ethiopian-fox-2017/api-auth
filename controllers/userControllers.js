'use strict'
var db = require('../models').Userauth;
var jwt = require('jsonwebtoken');
var pwh = require('password-hash');
require('dotenv').config()

//get all users
let getUsers = function(req, res) {
  db.findAll()
         .then((datas) => {
           res.send(datas);
         })
         .catch((err) => {
           res.send(err.message);
         })
}

//get user by id
let getUser = function(req, res) {
  db.findById(req.params.id)
         .then((datas) => {
           res.send(datas);
         })
         .catch((err) => {
           res.send(err.message);
         })
}

let postUser = function(req, res) {
  if(req.body.username != null && req.body.password != null && req.body.username != "" && req.body.password != "") {
    let obj = {
      username: req.body.username,
      password: pwh.generate(req.body.password),
      role: req.body.role
    }
    db.create(obj)
           .then((data) => {
             res.send(data);
           })
           .catch((err) => {
             res.send(err.message);
           })
  } else {
    res.send('Data cannot be empty')
  }

}


let signin = function(req, res) {
  db.findOne({where:{username:req.body.username}})
    .then((data) => {
      if(pwh.verify(req.body.password,data.password)) {
        let token = jwt.sign({username: data.username, role: data.role}, process.env.SECRET_KEY)
        res.send(token)
      } else {
        res.send('Wrong Password')
      }

    })
    .catch(err => {
      res.send(err.message)
    })
}

let deleteUser = function(req ,res) {
  db.destroy({where:{id: req.params.id}})
         .then(() => {
           res.send('Data berhasil di delete');
         })
         .catch((err) => {
           res.send(err.message)
         })
}

let updateUser = function(req ,res) {
  db.update(req.body ,{where:{id: req.params.id}})
         .then(() => {
           res.send('Data berhasil di update');
         })
         .catch((err) => {
           res.send(err.message)
         })
}

module.exports = {getUsers,getUser, postUser, signin, deleteUser, updateUser};