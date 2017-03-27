var express = require('express');
var router = express.Router();
var db = require('../models');
var controller = require('../controller/users')
var jwt = require('jsonwebtoken');
require('dotenv').config()
var token;


let login = function(req, res) {
  db.User.findOne({
    where : {email : req.body.email}
  }).then(function(user) {
    // console.log(user);
    if (user.password == req.body.password) {
      token = jwt.sign({
        name  : user.name,
        email : user.email,
        role  : user.role
      }, process.env.SECRET_WORD)
      res.send(token)
    } else {
      res.json('Failed Login')
    }
  }).catch(function(err) {
    res.send(err.message)
  })
}

let verify_admin = function(req, res, next){
  jwt.verify(req.headers.token, process.env.SECRET_WORD, function(err, decode) {
    // console.log(decode);
    if (decode.role === 'admin') {
      next()
    } else {
      res.send('You dont have access !')
    }
  })
}

let verify = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.SECRET_WORD, function(err, decode) {
    console.log(decode);
    if (decode.role === 'admin' || decode.role === 'users') {
      next()
    } else {
      res.send('Cannot access data !')
    }
  })
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFuaWVsIEFndXMiLCJlbWFpbCI6ImFndXNwZXJtYWRpOTRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNDkwNjA1MzQ2fQ.oRekdq64CAc2GQciN7cnEIpx56Rh72yI_uU7_I--8EQ

module.exports = {
  login,
  verify_admin,
  verify
}