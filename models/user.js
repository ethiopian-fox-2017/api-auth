'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nama: DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
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