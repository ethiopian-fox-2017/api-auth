'use strict';
var User = require('../models').User;
var passHash = require('password-hash');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var check = {};
check.verifyAdmin = function(req,res,next){
  jwt.verify(req.headers.token, process.env.SECRETKEYS, function(error,data) {
    if(!data){
      res.send(error);
    } else {
      if(data.role === "admin"){
        next();
      } else {
        res.send('unauthorized action')
      }
    }
  });
}

check.verify = function(req,res,next){
  console.log(req.headers)
  jwt.verify(req.headers.token, process.env.SECRETKEYS, (error,data) => {
    if(!data){
      res.send(error);
    } else {
      next()
    }
  });
}

module.exports = check
