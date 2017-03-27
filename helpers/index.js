var express = require('express');
var jwt = require('jsonwebtoken');
var app = express.Router();
var db = require('../models');
var methods  = {};
var token;
require('dotenv').config();

methods.login = function (req,res) {
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

module.exports = methods
