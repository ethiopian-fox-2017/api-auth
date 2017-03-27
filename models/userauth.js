'use strict';
module.exports = function(sequelize, DataTypes) {
  var Userauth = sequelize.define('Userauth', {
    username: DataTypes.STRING,
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