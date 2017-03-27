var jwt = require('jsonwebtoken');

module.exports = {
  adminAuthorized: function(req, res, next) {

    if (req.headers.token == undefined) {
      res.send('You are not authorized to access')
    } else {
      jwt.verify(req.headers.token, 'secret', function(err, decoded) {
        if (decoded.role === 'admin') {
          next()
        } else {
          res.send('You are not authorized to access')
        }
      })
    }

  },

  allAuthorized: function(req, res, next) {

    if (req.headers.token == undefined) {
      res.send('You are not authorized to access')
    } else {
      jwt.verify(req.headers.token, 'secret', function(err, decoded) {
        if (decoded.role === 'admin' || decoded.id == req.params.id) {
          next()
        } else {
          res.send('You are not authorized to access')
        }

      })
    }

  }

}