let jwt = require('jsonwebtoken');
let secretKey = 'secret';
let db = require("../models");

let verifyToken = (req, res, next) => {
  jwt.verify(req.headers.token, secretKey, function(err, decoded) {
    if (decoded) {
      req.decoded = decoded;
      next();
    }else{
      res.send("Unauthorized")
    }
  });
}

module.exports = verifyToken
