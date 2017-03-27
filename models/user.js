'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
                isuniq: function(value, next) {
                    User.find({
                        where: {
                            email: value
                        }
                    }).then(function(user) {
                        if (user) {
                            next('already taken')
                        } else {
                            next()
                        }
                    })
                }
            }
        },
        role: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return User;
};
