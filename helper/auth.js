var jwt = require('jsonwebtoken');
module.exports = {
  authuser:function(req,res,next){
    let token = req.headers.token;
    //console.log(token);
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
  },

  authadmin:function(req,res,next){
    let token=req.headers.token;
    console.log(token);
       jwt.verify(token,'rahasia',function(err,decode){
         if (err){
           res.send(err)
         }else{
           console.log(decode);
           if (decode.role=='admin') {
             next();
           }else{
             res.send('user not autherize')
           }
         }
       })
  }
}
