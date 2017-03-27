'use strict';
module.exports = function(sequelize, DataTypes) {
  var Userauth = sequelize.define('Userauth', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value,next) {
          Userauth.find({where:{username:value}})
                  .then((user) => {
                    if(user) {
                      return next('Username already in use');
                    }
                    return next();
                  })
                  .catch((err) => {
                    return next(err.message)
                  })
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Userauth;
};