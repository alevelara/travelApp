'use strict';

const models = require('../../models');
const User = models.user;


exports.getAllUsers = function (callback) {
    User.findAll().then(users => callback(users))
};

exports.createUser = function(fullName, email, password, callback) {
    User.create({
        where: {
            email: email,
            fullName: fullName,
            password: password
        }
    }).then(user => user.save())
        .then(user => callback(user))
        .catch(error => callback(error))

};

exports.findUserByEmail = function (email, callback) {
    User.findOne({
        where:{
            email: email
        }
    }).then(user => callback(user))
};