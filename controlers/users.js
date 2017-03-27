var model = require('../models');
let crypto = require('crypto');
let shortid = require('short-id');
let jwt = require('jsonwebtoken');
module.exports = {
    getusers: function(req, res) {
        model.User.findAll().then(function(users) {
            res.json(users)
        })
    },
    getuser: function(req, res) {
        model.User.find({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            res.json(user)
        })
    },
    insertUser: function(req, res) {
        let salt = shortid.generate();
        model.User.create({
            username: req.body.username,
            email: req.body.email,
            salt: salt,
            role:req.body.role,
            password: crypto.createHmac('sha256', salt)
                .update(req.body.password).digest('hex')
        }).then(function() {
            res.send('data inserted');
        })
    },
    deleteUser: function(req, res) {
        model.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function() {
            res.send('data deleted')
        })
    },
    updateUser: function(req, res) {
        model.User.update({
            username: req.body.username,
            email: req.body.email
        }, {
            where: {
                id: req.params.id
            }
        }).then(function() {
            res.send('data updated')
        })
    },
    signIn:function(req,res){
      model.User.findAll({
        where:{
          email:req.body.email
        }
      }).then(function(users){
        if (users.length!=0) {
           if (users[0].password===crypto.createHmac('sha256',users[0].salt)
               .update(req.body.password).digest('hex')) {
              let token=jwt.sign({
                        userid:users[0].id,
                        username:users[0].username,
                        role:users[0].role
                        },'rahasia',{ expiresIn: 10 * 60 })
              res.send(token)
           }
           else{
             res.send('wrong password')
           }
        } else {
          res.send('user unavailible')
        }
      })
    }
}
