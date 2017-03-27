let jwt = require('jsonwebtoken');
let db = require("../models");
require('dotenv').config()

let verifyToken = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, function(err, decoded) {
    if (decoded) {
      req.decoded = decoded;
      next();
    }else{
      res.send("Unauthorized")
    }
  });
}

module.exports = verifyToken
