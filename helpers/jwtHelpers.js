var jwt = require('jsonwebtoken');

let adminOnly = function(req ,res, next) {
jwt.verify(req.headers.token, 'rahasia', function (err, decoded) {
    if(decoded) {
      if(decoded.role == 'admin') {
        next();
      } else {
        res.send('you have no permission');
      }
    } else {
      res.send(err);
    }
  })

}

let allUser = function(req ,res, next) {
jwt.verify(req.headers.token, 'rahasia', function (err, decoded) {
    if(decoded) {
      if(decoded.role == 'admin' || decoded.role == 'user') {
        next();
      } else {
        res.send('you have no permission');
      }
    } else {
      res.send(err);
    }
  })

}
module.exports = {adminOnly,allUser};