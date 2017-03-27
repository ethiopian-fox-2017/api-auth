const jwt = require('jsonwebtoken')

module.exports = {
  verify: (req, res, next)=> {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, verified)=> {
      if(verified) {
        if(verified.roleAdmin === true || verified.id == req.params.id) {
          next()
        } else {
          res.send('Restricted Access')
        }
      } else {
        res.send('Login Failed')
      }
    })
  },
  verifyAdmin: (req, res, next)=> {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, verified)=> {
      if(verified) {
        if(verified.roleAdmin === true) {
          next()
        } else {
          res.send('Restricted Access')
        }
      } else {
        res.send('Login Failed')
      }
    })
  }
}