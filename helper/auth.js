var jwt = require('jsonwebtoken');
module.exports = {
  authuser:function(req,res,next){
    let token = req.headers.token;
    console.log(token);
    if (token) {
      jwt.verify(token,'rahasia',function(err,decode){
        if (err) {
          res.send(err)
        } else {
          if (decode.role=='admin') {
            next()
          } else {
            if (decode.userid==req.params.id) {
              next()
            } else {
              res.send('you only can acess your account')
            }
          }
        }
      })
    } else {
      res.send('there is no token')
    }
  }
}
