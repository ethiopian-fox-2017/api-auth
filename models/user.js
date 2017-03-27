'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type : DataTypes.STRING,
      min : 5
    },
    email: {
      type : DataTypes.STRING,
      isEmail : true
    },
    password: {
      type : DataTypes.STRING,
      len : [3, 10]
    },
    role : DataTypes.STRING,
    username : DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
