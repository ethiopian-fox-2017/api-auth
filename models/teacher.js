'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value,next){
          Teacher.find({
            where: {username: value}
          }).done((exist) => {
            if(exist){
              console.log('user name already in use!');
            } else {
              next();
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
  return Teacher;
};
