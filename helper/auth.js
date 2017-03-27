const models = require('../models')
var jwt = require('jsonwebtoken')


module.exports = {
  isAutheticated : function(req, res, next){

    console.log(req.headers.tokens);
    jwt.verify(req.headers.tokens, 'rahasia', function(err, decoded) {
        if (decoded.role != 'admin')
            res.send('admin only')
        else
            next()
    });

  },

  isAutheticatedUser : function(req, res, next){
    jwt.verify(req.headers.tokens, 'rahasia', function(err, decoded) {
      console.log(decoded.role);
        if (decoded.role == 'admin')
            next()
        else if (decoded.id == req.params.id)
            next()
        else
            res.send('Admin Only')
    });
  }

}
