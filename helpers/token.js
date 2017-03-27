let jwt = require('jsonwebtoken');
// let secretKey = SECRET_KEY;
let db = require("../models");

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
