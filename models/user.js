'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: (val, callback) => {
          User.find({
            where: {username: val},
            attributes: ['id']
          })
          .done((err)=> {
            if(err) {
              return callback('username already used!')
            } else {
              callback()
            }
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
  return User;
};
