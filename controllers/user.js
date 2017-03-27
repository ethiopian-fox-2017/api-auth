const models = require('../models')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')


module.exports = {

  getAllData : function(req, res, next){
      models.User.findAll()
                  .then(data => {
                    res.send(data)
                  })
                  .catch(err => {
                    res.send(err)
                  })
  },

  insertData : function(req, res, next){
    models.User.create(req.body)
               .then(data => {
                 res.send(data)
               })
               .catch(err => {
                 res.send(err)
               })

  },

  updateData : function(req, res, next){
    req.body.password = passwordHash.generate(req.body.password);
    models.User.update(req.body,{ where : { id : req.params.id } })
                .then(user => {
                  res.send(user)
                })
                .catch(err => {
                  res.send(err)
                })
  },

  deleteData : function(req, res, next){
    models.User.destroy({ where : { id : req.params.id} })
                .then(user => {
                  res.json(user)
                })
                .catch(err => {
                  res.json(err)
                })

  },

  singleUser : function(req, res, next){
    models.User.findById(req.params.id)
               .then(user => {
                 res.send(user)
               })
               .catch(err => {
                 res.send(err.message)
               })
  },

  signup : function(req, res, next){
    var hashedPassword = passwordHash.generate(req.body.password);

    models.User.create({
      username : req.body.username,
      name : req.body.name,
      password : hashedPassword,
      email: req.body.email,
      role : 'user'
    })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.send(err.message)
    })

  },

  signin : function(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    models.User.findOne({
      where : {
        username : req.body.username
      }
    }).then(user => {
      //if exists

      if (passwordHash.verify(req.body.password, user.password)){
        let token = jwt.sign({
          id : user.id,
          name : user.name,
          username : req.body.username,
          role : user.role
        },'rahasia')

        res.send(token)
      } else {
        res.send('failed login')
      }
    }).catch(err => {
      res.send(err.message)
    })

  }

}
