var express = require('express');
var jwt = require('jsonwebtoken');
var app = express.Router();
var db = require('../models');
var methods  = {};
var token;
require('dotenv').config();

methods.signin = function (req,res) {
  db.User.findOne({
    where : {username : req.body.username}
  })
  .then(function (userData) {
    if(userData){
      if(userData.password == req.body.password){
        token = jwt.sign({
          username : userData.username,
          role : userData.role
        }, process.env.SECRETE , { expiresIn : '1h'})
        res.json(token)
      }else{
        res.json("password invalid")
      }
    }else{
      res.json("user not found")
    }
  })
  .catch(function (err) {
    res.json(err)
  })
}

methods.signup = function (req,res) {
  console.log(req.body);
  db.User.create(req.body)
  .then(function (data) {
    res.json(data)
  })
  .catch(function (err) {
    res.json(err)
  })
}

methods.verify = function (req,res, next) {
  jwt.verify(req.headers.token, process.env.SECRETE, function (err, decoded) {
    if (err) {
      res.json({
        err : err,
        msg : 'must login'
      })
    }else{
      if(decoded.role == 'admin' || decoded.role == 'user'){
        next()
      }else{
        res.json('you dont have access')
      }
    }
  })
}

methods.verifyAdmin = function (req,res, next) {
  jwt.verify(req.headers.token, process.env.SECRETE, function (err, decoded) {
    if (err) {
      res.json(err)
    }else{
      if(decoded.role == 'admin'){
        next()
      }else{
        res.json('you dont have access')
      }
    }
  })
}

module.exports = methods
