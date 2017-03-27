'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : true,
        isunique  : function(value, next) {
          let self = this
          User.find({
            where : {
              email: value
            }
          }).then(function(user) {
            if (user) {
              return next('Email sudah udah Coy!')
            }
            return next()
          }).catch(function(err) {
            return next(err)
          })
        }
      }
    },
    role: DataTypes.STRING,
    password : DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};