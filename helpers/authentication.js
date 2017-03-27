'use strict'

const jwt = require('jsonwebtoken');

let authenticateAdmin = function (req, res, next) {
  jwt.verify(req.headers.token, 'secret', function(err, decoded) {
    if(err) {
      res.send(err);
    }
    else if(decoded.role == 'admin'){
      next();
    } else {
      res.send("Aunthentication and authorization failed!");
    }
  });
}

let authenticate = function (req, res, next) {
  jwt.verify(req.headers.token, 'secret', function(err, decoded) {
    if(err) {
      res.send(err);
    }
    else {
      next();
    }
  });
}

module.exports = {
  authenticateAdmin,
  authenticate
}
