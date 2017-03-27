'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: (val, cb)=> {
          User.find({
            where : {username: val},
            attributes: ['id']
          }).done((err)=> {
            if(err) {
              return cb('Username already in use')
            } else {
              cb()
            }
          })
        }
      }
    },
    password: DataTypes.STRING,
    roleAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};