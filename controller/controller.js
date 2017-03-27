const User = require('../models').User
const pwHash = require('password-hash')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  getAll: (req, res)=> {
    User.findAll()
      .then((data)=> {
        res.send(data);
      })
      .catch((err)=> {
        res.send(err)
      })
  },
  newUser: (req, res)=> {
    User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: pwHash.generate(req.body.password),
      roleAdmin: req.body.roleAdmin
    })
      .then((data)=> {
        res.send(data)
      })
      .catch((err)=> {
        res.send(err)
      })
  },
  getOneUser: (req, res)=> {
    User.findById(req.params.id)
      .then((data)=> {
        res.send(data)
      })
      .catch((err)=> {
        res.send(err)
      })
  },
  deleteUser: (req, res)=> {
    User.destroy({
      where: {id: req.params.id}
    })
      .then(()=> {
        res.send('Delete Success')
      })
      .catch((err)=> {
        res.send(err)
      })
  },
  updateUser: (req, res)=> {
    User.update(req.body, {
      where: {id: req.params.id}
    })
      .then((data)=> {
        res.send(data)
      })
      .catch((err)=> {
        res.send(data)
      })
  },
  signUpUser: (req, res)=> {
    User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: pwHash.generate(req.body.password),
      roleAdmin: req.body.roleAdmin
    })
      .then((data)=> {
        res.send(data)
      })
      .catch((err)=> {
        res.send(err)
      })
  },
  signInUser: (req, res)=> {
    User.findOne({
      where: {username: req.body.username}
    })
      .then((data)=> {
        if(pwHash.verify(req.body.password, data.password)){
          let token = jwt.sign({id: data.id , username: data.username, roleAdmin: data.roleAdmin}, process.env.SECRET_KEY)
          res.send(token)
        } else {
          res.send('Wrong Password')
        }
      })
      .catch((err)=> {
        res.send('Not a valid username')
      })
  }


}